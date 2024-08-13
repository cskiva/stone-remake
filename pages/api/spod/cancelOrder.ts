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
		let cancelResult: Response | undefined;
		if (req.method === "POST") {
			const {
				orderId
			}: { orderId: string } = req.body;
			if (!orderId) {
				res.status(400).end({ error: "OrderId required" });
				return;
			}

			const orderCheckResult = await fetch(
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
			const checkResult = await orderCheckResult.json().catch((err) => {
				console.error("check", orderCheckResult, err);
				res.status(500).json({ error: "Order cancellation failed: " + JSON.stringify(err) });
				return;
			});
			// if (checkResult.state != "NEW") {
			// 	res.status(400).json({ error: "Unable to cancel confirmed orders" });
			// }

			cancelResult = await fetch(
				`${spodUrl}orders/${orderId}/cancel`,
				{
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"X-SPOD-ACCESS-TOKEN": spodKey
					}
				}
			);
			res.status(cancelResult.status).json({ orderCancelResult: cancelResult.statusText });
		}
		else {
			res.setHeader("Allow", ["POST"]);
			res.status(405).end({ error: "Method Not Allowed" });
			return;
		}
	}
	catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "Internal server error";
		console.log("Cancel order error: ", errorMessage);
		res.status(500).json({ statusCode: 500, message: errorMessage });
	}
}