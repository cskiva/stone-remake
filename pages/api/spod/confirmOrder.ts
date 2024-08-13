import { NextApiRequest, NextApiResponse } from "next";

import { SpodOrder } from "../../../APITypes/SpodOrder";
import Stripe from "stripe";

const spodKey = process.env.SPOD_SECRET_KEY ?? "";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: "2020-08-27",
});

const spodUrl = process.env.NEXT_PUBLIC_IS_STAGING == "true" || process.env.NEXT_PUBLIC_DEV == "true"
	? "https://rest.spod-staging.com/"
	: "https://rest.spod.com/";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		let confirmResult: Response | undefined;
		if (req.method === "POST") {
			const {
				orderId,
				paymentIntentId
			}: { orderId: string, paymentIntentId: string } = req.body;
			if (!orderId) {
				res.status(400).end({ error: "OrderId required" });
				return;
			}
			if (!paymentIntentId) {
				res.status(400).end({ error: "PaymentIntent id required" });
				return;
			}

			const paymentIntent = await stripe.paymentIntents.retrieve(
				paymentIntentId
			);

			if (!paymentIntent || paymentIntent.status != "succeeded" || paymentIntent.metadata["fulfilled"] == "true") {
				console.log("invalid payment: ", paymentIntent);
				res.status(400).end({ error: "PaymentIntent invalid" });
				return;
			}
			else {
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
					res.status(500).json({ error: "Order cancellation failed: " + JSON.stringify(err) });
					return;
				});

				if (!compareOrderAndPayment(spodOrder, paymentIntent)) {
					res.status(400).end({ error: "PaymentIntent invalid" });
					return;
				}

				const result = await stripe.paymentIntents.update(
					paymentIntentId,
					{
						metadata: Object.assign(
							paymentIntent.metadata,
							{ fulfilled: true }
						)
					},
				);
				if (!result) {
					res.status(500).end({ error: "Confirmation failed" });
					return;
				}
				console.log("Verified payment: ", result);
			}

			confirmResult = await fetch(
				`${spodUrl}orders/${orderId}/confirm`,
				{
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"X-SPOD-ACCESS-TOKEN": spodKey
					}
				}
			);

			res.status(confirmResult.status).json({ result: confirmResult.statusText });
		}
		else {
			res.setHeader("Allow", ["POST"]);
			res.status(405).end("Method Not Allowed");
			return;
		}
	}
	catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "Internal server error";
		console.log("Confirm order error: ", errorMessage);
		res.status(500).json({ statusCode: 500, message: errorMessage });
	}
}

function compareOrderAndPayment(spodOrder: SpodOrder, paymentIntent: Stripe.Response<Stripe.PaymentIntent>) {
	return spodOrder && paymentIntent?.metadata && spodOrder?.id.toString() == paymentIntent?.metadata["spodOrderId"];
}
