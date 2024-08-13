import DIMENSIONS from "../../../components/styles/GlobalDimensions";

export default async function oembdedHandler(req, res) {
	const {
		query: { url },
		method,
	} = req;

	const uuidRegex = new RegExp(
		/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
	);
	const match = url.match(uuidRegex);
	const pid = match[0];

	console.log("PID = ", pid);
	console.log("match = ", match);
	console.log("url = ", url);

	const result = await fetch(
		`${process.env.NEXT_PUBLIC_MEDIA_API_URL}/stream/${pid}/html`
	);
	const html = await result.json().catch((err) => {
		console.error(err);
		return null;
	});

	const result2 = await fetch(
		`${process.env.NEXT_PUBLIC_MEDIA_API_URL}/stream/info/${pid}`
	);
	const streamData = await result2.json().catch((err) => {
		console.error(err);
		return null;
	});

	console.log(streamData);

	const BaseDomainURL = process.env.NEXT_PUBLIC_BASE_URL;
	const oembedJson = {
		title: streamData.title,
		author_name: "Writeinstone",
		author_url: "https://www.writeinstone.com",
		type: "video",
		height: 113,
		width: 200,
		//
		version: "1.0",
		provider_name: "Writeinstone",
		provider_url: "https://www.writeinstone.com",

		thumbnail_width: 480,
		thumbnail_height: 360,
		thumbnail_url: `http://www.panamaan.com/s/cc_images/teaserbox_4299217.jpg`,

		html: `<iframe width=\"200\" height=\"113\" src=\"${BaseDomainURL}/widget/${pid}\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>`,
	};

	switch (method) {
		case "GET":
			// Get data from your database
			res.status(200).json(oembedJson);
			break;
		default:
			res.setHeader("Allow", ["GET", "PUT"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
