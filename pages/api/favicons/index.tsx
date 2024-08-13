import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method !== "GET") {
			res.setHeader("Allow", "GET");
			res.status(405).end("Method Not Allowed");
			return;
		}
		let s = req.query.url as string;

		if (!s) {
			return "";
		}

		if (!s.includes("://")) {
			s = "http://" + s;
		}
		const url = (new URL(s));
		const domain = url.hostname;
		const requestUrl = (`https://besticon.herokuapp.com/allicons.json?url=${domain}`);

		const orderResult = await fetch(requestUrl);

		const result = await orderResult.json().catch((err) => {
			console.error(err);
			res.status(500).json({ error: "Icon retrieval failed: " + JSON.stringify(err) });
			return;
		});

		if (result) {
			const largest = Math.max(...result.icons.map(function (o: { width: number }) {
				return o.width;
			}));

			const icon = result.icons.find(function (o: { width: number, url: string }) {
				return o.width == largest;
			});
			res.status(200).json({ icon: icon.url });
			return;
		}
	}
	catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "Internal server error";
		res.status(500).json({ statusCode: 500, message: errorMessage });
	}
}
