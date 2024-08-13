/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextApiRequest, NextApiResponse } from "next";

/* eslint-disable @typescript-eslint/no-var-requires */
const SibApiV3Sdk = require("sib-api-v3-typescript");

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method === "POST") {
			const {
				//Link to spod order
				orderUrl,
				// Store Owner Data:
				storeOwner,
				// Items:
				orderNumber,
				productsForSendInBlue,
				// Address Data:
				billingDetails,
				// Shipping Type:
				shippingType,
				// Totals:
				currentCartValue,
				selectedShippingPrice,
				grandTotal,

			}: {
				orderUrl: string,
				// Store Owner Data:
				storeOwner: string,
				// Items:
				orderNumber: string,
				productsForSendInBlue: [],
				// Address Data:
				billingDetails: any,
				// Shipping Type:
				shippingType: string,
				// Totals:
				currentCartValue: string,
				selectedShippingPrice: string,
				grandTotal: string,

			} = req.body;
			const date = new Date;

			const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

			const apiKey = apiInstance.authentications["apiKey"];

			apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

			apiInstance.sendTransacEmail(
				{
					"subject": `New Merch Order for ${storeOwner} : ${orderNumber}`,
					"sender": { "email": "store@writeinstone.com", "name": "Stone Store" },
					"replyTo": { "email": "store@writeinstone.com", "name": "Stone Store" },
					// Remember to Change:
					"to": [{ "name": "Merchandise Store", "email": "orders@writeinstone.com" }],
					//
					"templateId": 8,
					"params": {
						"DATE": date,
						"ORDERNUMBER": orderNumber,
						"orderUrl": orderUrl,
						// Purchaser Data:
						"CUSTOMER_EMAIL": billingDetails.email,
						"CUSTOMER_NAME": billingDetails.name,
						// Store Owner Data:
						"STORE_NAME": storeOwner,
						// Items:
						"items": productsForSendInBlue,
						// Address Data
						"CUSTOMER_COUNTRY": billingDetails.address.country,
						"CUSTOMER_LINE": billingDetails.address.line1,
						"CUSTOMER_LINE2": billingDetails.address.line2 !== "" ? billingDetails.address.line2 : billingDetails.address.city ? billingDetails.address.city : "",
						"CUSTOMER_CITY": billingDetails.address.city !== "" ? billingDetails.address.city : billingDetails.address.line2 ? billingDetails.address.line2 : "",
						"CUSTOMER_STATE": billingDetails.address.state !== "" ? billingDetails.address.state : "",
						"CUSTOMER_POSTAL_CODE": billingDetails.address.postal_code,
						// Shipping Type
						"CUSTOMER_SHIPPING_TYPE": shippingType,
						// Totals:	
						"CUSTOMER_CARTVALUE": currentCartValue,
						"CUSTOMER_SHIPPINGVALUE": selectedShippingPrice,
						"CUSTOMER_TOTALVALUE": grandTotal
					}
				}
			).then(
				function (data: any) {
					console.log("API called successfully. Returned data:" + JSON.stringify(data));
					res.status(200).send(JSON.stringify(data));
				},
				function (error: any) {
					console.error(error);
				}
			);
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
		console.log("sendinblue error: ", errorMessage);
		res.status(500).json({ statusCode: 500, message: errorMessage });
	}
}
