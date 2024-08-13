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
		let productResult;
		if (req.method === "POST") {
			const { productId }: { productId: string } = req.body;
			//console.log("product request args: ", productId);
			if (productId == null) {
				res.status(400).json({ statusCode: 500, message: "need product Id" });
				return;
			}
			else {
				productResult = await fetch(
					`${spodUrl}articles/${productId}`,
					{
						method: "GET",
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json",
							"X-SPOD-ACCESS-TOKEN": spodKey
						}
					}
				);
				const json = await productResult.json();
				res.status(productResult.status).json(json);
				//console.log("productResult result: ", json);
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
		console.log("product error: ", errorMessage);
		res.status(500).json({ statusCode: 500, message: errorMessage });
	}
}