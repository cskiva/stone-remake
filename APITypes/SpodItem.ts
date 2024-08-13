export declare interface SpodItem {
	orderItemReference: number,
	externalOrderItemReference: number,
	state: string,
	sku: string,
	quantity: number,
	price:
	{
		amount: number,
		taxRate: number,
		taxAmount: number,
		currency: string
	},
	customerPrice:
	{
		amount: number,
		taxRate: number,
		taxAmount: number,
		currency: string
	}
}
