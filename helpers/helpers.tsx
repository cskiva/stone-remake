import { fetchGetJSON } from "./api-helpers";

//prettier-ignore
export const durationMsToShortString = (milliseconds: number, showLetters = false, showMs = false): string => {
	if (
		milliseconds == null ||
		milliseconds == undefined ||
		isNaN(milliseconds)
	) {
		console.log(
			"Error: ",
			milliseconds,
			" was passed to millisecondsToShortString, not a valid number"
		);
		return "";
	}

	// Get values for each time increment
	const ms = milliseconds % 1000;
	const s = Math.floor((milliseconds / 1000) % 60);
	const m = Math.floor((milliseconds / 60000) % 60);
	const h = Math.floor((milliseconds / 3600000) % 60);

	//format milliseconds
	let msString = showMs ? ms.toString() : "";
	msString = msString + (showLetters && showMs ? "ms " : "");

	//format seconds
	const sString = (m > 0 && s < 10 ? "0" : "") + s.toString() + (showLetters ? "s " : showMs ? ":" : "");

	//format minutes
	let mString =
		m > 10
			? m.toString()
			: m > 0
				? h > 0
					? "0" + m.toString()
					: m.toString()
				: "0";

	mString = mString + (showLetters ? "m " : ":");

	//format hours
	let hString = "";
	if (h > 0) {
		hString = h.toString() + (showLetters ? "h " : ":");
	}

	// add it all together
	return hString + mString + sString + msString;
};

export const getIcon = async (s: string): Promise<string> => {
	if (!s) {
		return "";
	}
	let result;
	await fetchGetJSON(process.env.NEXT_PUBLIC_BASE_URL + "/api/favicons?url=" + s).then((data) => {
		result = data.icon as string;
		console.log("iconJSON", data);
	}).catch(e => {
		console.log(e);
	});
	console.log("Returning ", result);
	return result ?? "";
};