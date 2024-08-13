import { SpodItem } from "./SpodItem";

export declare interface SpodOrder {
	id: number,
	orderReference: number,
	externalOrderReference: number,
	state: string,
	orderItems: SpodItem[],
	shipping: {
		address: unknown,
		fromAddress: unknown,
		preferredType: string,
		price:
		{

			amount: number,
			taxRate: number,
			taxAmount: number,
			currency: string

		},
	}
	billingAddress: unknown,
	phone: string,
	email: string,
	price:
	{
		amount: number,
		taxRate: number,
		taxAmount: number,
		currency: string
	},
	taxType: string,
	customerTaxType: string
}