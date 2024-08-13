import { NextApiRequest, NextApiResponse } from "next";

const spodKey = process.env.SPOD_SECRET_KEY ?? "";

const spodUrl = process.env.NEXT_PUBLIC_IS_STAGING == "true" || process.env.NEXT_PUBLIC_DEV == "true"
	? "https://rest.spod-staging.com/"
	: "https://rest.spod.com/";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		let shippingResult;
		if (req.method === "POST") {
			const { orderId, shippingTypeId }: { orderId: string, shippingTypeId: string | null } = req.body;
			console.log("shipping args: ", orderId, shippingTypeId);
			if (shippingTypeId != null) {
				shippingResult = await fetch(
					`${spodUrl}orders/${orderId}/shippingType`,
					{
						method: "POST",
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json",
							"X-SPOD-ACCESS-TOKEN": spodKey
						},
						body: JSON.stringify({
							id: shippingTypeId
						})
					}
				);
				console.log("Set shipping result: ", shippingResult.status);
				if (shippingResult.ok) {
					res.status(shippingResult.status).json({});
				}
				else {
					const json = await shippingResult.json();
					res.status(shippingResult.status).json(json);
				}
			}
			else {
				shippingResult = await fetch(
					`${spodUrl}orders/${orderId}/shippingTypes`,
					{
						method: "GET",
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json",
							"X-SPOD-ACCESS-TOKEN": spodKey
						}
					}
				);
				const json = await shippingResult.json();
				res.status(shippingResult.status).json(json);
				console.log("shippingResult result: ", json);
			}
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
		console.log("shipping error: ", errorMessage);
		res.status(500).json({ statusCode: 500, message: errorMessage });
	}
}