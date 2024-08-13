const SibApiV3Sdk = require("sib-api-v3-typescript");

import { NextApiRequest } from "next";

export default async (req: NextApiRequest) => {
	const apiInstance = new SibApiV3Sdk.ContactsApi();

	const apiKey = apiInstance.authentications["apiKey"];

	apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

	const createContact = new SibApiV3Sdk.CreateContact();

	createContact.email = req.body.email;
	createContact.attributes = { ISMACUSER: true };
	createContact.listIds = [2];

	apiInstance.createContact(createContact).then(
		function (data: any) {
			// console.log('API called successfully. Returned data: ' + JSON.stringify(data));
		},
		function (error: any) {
			console.error(error);
		}
	);
};
