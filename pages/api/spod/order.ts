import { NextApiRequest, NextApiResponse } from "next";

const spodKey = process.env.SPOD_SECRET_KEY ?? "";

const spodUrl = process.env.NEXT_PUBLIC_IS_STAGING == "true" || process.env.NEXT_PUBLIC_DEV == "true"
	? "https://rest.spod-staging.com/"
	: "https://rest.spod.com/";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("order args: ", req.body);
	try {
		let orderResult: Response | undefined;
		if (req.method === "POST") {
			const { requestObject: requestObject }: { requestObject: unknown } = req.body;
			orderResult = await fetch(
				`${spodUrl}orders`,
				{
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"X-SPOD-ACCESS-TOKEN": spodKey
					},
					body: JSON.stringify(requestObject)
				}
			);

			const result = await orderResult.json().catch((err) => {
				console.error(err);
				res.status(500).json({ error: "Order creation failed: " + JSON.stringify(err) });
				return;
			});

			if (result.id) {
				res.status(orderResult.status).json({ id: result.id });
			}
			else {
				console.log("returned orderId not valid", result, `${spodUrl}orders`);
				res.status(500).json({ error: "returned orderId not valid", id: result.id });
			}
		}
		else if (req.method === "PUT") {
			const {
				orderId,
				requestObject
			}: { orderId: string, requestObject: string } = req.body;

			//console.log("updating order details ", requestObject);
			orderResult = await fetch(
				`${spodUrl}orders/${orderId}`,
				{
					method: "PUT",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"X-SPOD-ACCESS-TOKEN": spodKey
					},
					body: JSON.stringify(requestObject)
				}
			);

			const result = await orderResult.json().catch((err) => {
				console.error(err);
				res.status(400).json({ error: "Order update failed: " + JSON.stringify(err) });
				return;
			});
			if (orderResult.ok) {
				res.status(orderResult.status).json({ id: orderId });
				console.log("successfully updated order");
			}
			else {
				res.status(orderResult.status).json(result);
				console.log("failed to update order", orderResult.status, result);
			}
		}
		else if (req.method === "DELETE") {
			const {
				orderId
			}: { orderId: string, reason: string } = req.body;
			orderResult = await fetch(
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
			const json = await orderResult.json();
			res.status(orderResult.status).json(json);
			console.log("cancel order result: ", json);
			return;
		}
		else {
			console.log("Wrong method used: ", req.method);
			res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
			res.status(405).end("Method Not Allowed");
			return;
		}
	}
	catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "Internal server error";
		console.log("processing order failed: ", errorMessage);
		res.status(500).json({ statusCode: 500, message: errorMessage });
	}
}