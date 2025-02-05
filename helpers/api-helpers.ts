/* eslint-disable @typescript-eslint/ban-types */
export async function fetchGetJSON(url: string) {
	try {
		const data = await fetch(url).then((res) => res.json());
		return data;
	}
	catch (err) {
		console.log("Error processing fetch: ", url, err);
		if (err instanceof Error) {
			throw new Error(err.message);
		}
		throw err;
	}
}

export async function fetchPostJSON(url: string, data?: {}) {
	try {
		// Default options are marked with *
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *client
			body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
		});
		return await response.json(); // parses JSON response into native JavaScript objects
	}
	catch (err) {
		console.log("Error processing fetch: ", url, err);
		if (err instanceof Error) {
			throw new Error(err.message);
		}
		throw err;
	}
}

export async function fetchPutJSON(url: string, data?: {}) {
	let response: Response = new Response();
	try {
		console.log("Data: ", data);
		// Default options are marked with *
		response = await fetch(url, {
			method: "PUT", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *client
			body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
		});
		return await response.json(); // parses JSON response into native JavaScript objects
	}
	catch (err) {
		console.log("Error processing fetch: ", url, err, response);
		if (err instanceof Error) {
			throw new Error(err.message);
		}
		throw err;
	}
}
