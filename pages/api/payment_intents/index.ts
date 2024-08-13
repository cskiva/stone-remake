import { GetProductGroupList, ProductGroup } from "../../../APITypes/ProductGroup";
import { NextApiRequest, NextApiResponse } from "next";

import { CURRENCY } from "../../../helpers/stripe-config";
import { SpodItem } from "../../../APITypes/SpodItem";
import { SpodOrder } from "../../../APITypes/SpodOrder";
import Stripe from "stripe";
import { StripeError } from "@stripe/stripe-js";
import { fetchGetJSON } from "../../../helpers/api-helpers";
import { formatAmountForStripe } from "../../../helpers/stripe-helpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: "2020-08-27",
});
const spodKey = process.env.SPOD_SECRET_KEY ?? "";
const mediaApiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL;
const spodUrl = process.env.NEXT_PUBLIC_IS_STAGING == "true" || process.env.NEXT_PUBLIC_DEV == "true"
	? "https://rest.spod-staging.com/"
	: "https://rest.spod.com/";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
		return;
	}
	const {
		spodOrderId,
		payment_intent_id,
		storeId,
	}: {
		spodOrderId: string; payment_intent_id?: string | null, storeId: string
	} = req.body;

	// console.log("payment intent requested: ", req.body);

	if (spodOrderId == null) {
		return res.status(403).json({ message: "spodOrderIdRequired" });
	}

	if (storeId == null) {
		return res.status(403).json({ message: "storeId required" });
	}

	const price = await calculateTotalValue(spodOrderId, storeId);
	console.log("calculated price: ", price);
	const metadata = Object.assign(
		{ spodOrderId: spodOrderId },
		{ fulfilled: "false" }
	);

	if (payment_intent_id) {
		try {
			const current_intent = await stripe.paymentIntents.retrieve(
				payment_intent_id
			);

			if (current_intent.metadata["fulfilled"] != "false") {
				return res.status(403).json({ message: "order already fulfilled" });
			}

			if (current_intent && current_intent.amount != price) {
				const updated_intent = await stripe.paymentIntents.update(
					payment_intent_id,
					{
						amount: formatAmountForStripe(price, CURRENCY),
						metadata: metadata
					}
				);
				console.log(`Setting amount for payment intent to ${formatAmountForStripe(price, CURRENCY)}`);
				res.status(200).json({ paymentIntent: updated_intent });
				return;
			}
		}
		catch (e) {
			if ((e as StripeError).code !== "resource_missing") {
				const errorMessage =
					e instanceof Error ? e.message : "Internal server error";
				res.status(500).json({ statusCode: 500, message: errorMessage });
				return;
			}
		}
	}
	try {
		// Create PaymentIntent from body params.
		const params: Stripe.PaymentIntentCreateParams = {
			amount: formatAmountForStripe(price, CURRENCY),
			metadata: metadata,
			currency: CURRENCY,
			description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? "",
			automatic_payment_methods: {
				enabled: true,
			},
		};
		const payment_intent: Stripe.PaymentIntent =
			await stripe.paymentIntents.create(params);

		console.log(`Creating new payment intent for ${formatAmountForStripe(price, CURRENCY)}`);
		res.status(200).json({ paymentIntent: payment_intent });
	}
	catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "Internal server error";
		res.status(500).json({ statusCode: 500, message: errorMessage });
	}
}

// This function is doing a lot of api calls and calculations,
// if optimisation is needed it is suggested to add a caching system.
async function calculateTotalValue(orderId: string, userId: string) {
	const spodOrderResult = await fetch(
		`${spodUrl}orders/${orderId}`,
		{
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"X-SPOD-ACCESS-TOKEN": spodKey
			}
		}
	);

	const spodOrder = await spodOrderResult.json().catch((err) => {
		console.error("check", spodOrderResult, err);
	}) as SpodOrder;

	if (spodOrder.shipping?.price && spodOrder.shipping?.price?.currency != "USD") {
		throw new Error(`Wrong currency in spod order, expected USD, got ${spodOrder.shipping?.price?.currency}`);
	}

	console.log("orderItems: ", JSON.stringify(spodOrder.orderItems));

	const queryString = `active:'true' AND metadata['UserId']:'${userId}'`;
	// Fetch data from external API
	const productsRes = await stripe.products.search({
		query: queryString,
		limit: 100,
	});

	const pricesRes = await stripe.prices.search({
		query: queryString,
		limit: 100,
	});

	//console.log("query", queryString);
	//console.log("stripeproducts", productsRes);
	//console.log("staging", process.env.NEXT_PUBLIC_IS_STAGING);
	//console.log("dev", process.env.NEXT_PUBLIC_DEV);

	const productGroupList: ProductGroup[] = await GetProductGroupList(
		productsRes.data,
		pricesRes.data,
	);

	let total = 0;

	const groupIds: { id: string, quantity: number }[] = await Promise.all(spodOrder.orderItems.map( async o => {
		const itemResults = productGroupList.filter(p => p.skus.indexOf(o.sku) > -1);
		if(itemResults.length != 1) {
			throw new Error(`Ordered product not found, sku: ${o.sku} `);
		}
		const itemResult = itemResults[0];

		console.log("Fetching item from printer: ", o.orderItemReference);

		return { id: itemResult.id, quantity: o.quantity };
	}));
	
	for (const item of groupIds) {
		const price = pricesRes.data.find(p => p.metadata["Group"] == item.id)?.unit_amount;
		if (price == undefined) {
			throw new Error(`Ordered product not found, group id: ${item.id} `);
		}
		total += (price * item.quantity) / 100;
		console.log(`${item.quantity} of item ${item.id} for a total of ${price * item.quantity}`);
	}

	console.log(`shipping: ${spodOrder.shipping?.price?.amount}`);

	if (spodOrder.shipping?.price?.amount) {
		console.log(`total order value including shipping: ${total} + ${spodOrder.shipping?.price?.amount}`);
		return total + spodOrder.shipping?.price?.amount;
	}
	else if (spodOrder.shipping) {
		console.log("shipping price not found");
		const spodOrderResult = await fetch(
			`${spodUrl}orders/${orderId}`,
			{
				method: "GET",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"X-SPOD-ACCESS-TOKEN": spodKey
				}
			}
		);

		const spodOrder = await spodOrderResult.json().catch((err) => {
			console.error("check", spodOrderResult, err);
		}) as SpodOrder;

		if (spodOrder.shipping?.price?.amount) {
			console.log(`total order value including shipping: ${total} + ${spodOrder.shipping?.price?.amount}`);
			return total + spodOrder.shipping?.price?.amount;
		}
	}

	console.log(`total order value NOT including shipping: ${total}`);
	return total;
}
