import { Product } from "./Product";
import Stripe from "stripe";

export declare interface ProductGroup {
	id: string;
	stripeId: string;
	printerId: string;
	name: string;
	description: string;
	images: [string];
	availableSizes: string[];
	availableColours: string[];
	price: number;
	skus: string[];
}

export declare interface GroupState {
	id: string;
	currentSize: string;
	currentColour: string;
}

export function GetProduct(group: ProductGroup, products: Product[]) {
	return products.find((p) => p.groupId == group.id);
}

export async function GetProductGroupList(
	products: Stripe.Product[],
	prices: Stripe.Price[],
): Promise<ProductGroup[]> {

	if (!(products && prices)) {
		return [];
	}

	const spodSecret = process.env.SPOD_SECRET_KEY ?? "";

	const spodUrl = process.env.NEXT_PUBLIC_IS_STAGING == "true" || process.env.NEXT_PUBLIC_DEV == "true"
		? "https://rest.spod-staging.com/"
		: "https://rest.spod.com/";

	//console.log("Creating product list; ", products);
	const groupList: (ProductGroup|undefined) [] = await Promise.all(products.map( async (product: Stripe.Product) => {
		const currentPrice =
			prices.filter((price: Stripe.Price) => {
				return price.product === product.id;
			})[0] || null;

		const productUrl = `${spodUrl}articles/${product.metadata["SpodId"]}`;
		const printerResult = await fetch(productUrl, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-SPOD-ACCESS-TOKEN": spodSecret,
			},
		});

		const currentPrinterProduct = (await printerResult.json()) as {
			id: string,
			description: string,
			variants: {
				appearanceName: string,
				sizeName: string,
				sku: string
			}[]
		};
		//console.log("Url: ",`${spodUrl}article/${product.metadata["SpodId"]}`);
		//console.log("Product: ", currentPrinterProduct);
		//console.log("Variants: ", currentPrinterProduct.variants);

		let availableSizes : string[] = [];
		let availableColours : string[] = [];
		let skus : string[] = [];
		
		if(currentPrinterProduct?.variants == undefined) {
			console.log("No printer product found for product: ", product.name, "groupId: ", product.metadata["Group"]);
			return undefined;
		}
		availableSizes = [...new Set(currentPrinterProduct?.variants.map(v => v.sizeName))];
		availableColours = [...new Set(currentPrinterProduct?.variants.map(v => v.appearanceName))];
		skus = [...new Set(currentPrinterProduct?.variants.map(v => v.sku))];

		//console.log("printerProduct", currentPrinterProduct);
		if(currentPrinterProduct == undefined) {
			console.log("No printer product found for product: ", product.name, "groupId: ", product.metadata["Group"]);
			return undefined;
		}

		if(currentPrice == undefined) {
			console.log("No price found for product: ", product.name, "groupId: ", product.metadata["Group"]);
			return undefined;
		}

		const newGroup: ProductGroup = {
			id: product.metadata["Group"],
			printerId: currentPrinterProduct?.id ?? "",
			stripeId: product.id,
			name: product.name,
			description: product.description ?? "",
			images: [product.images[0]],
			price: currentPrice?.unit_amount ?? 0,
			availableSizes: availableSizes,
			availableColours: availableColours,
			skus: skus
		};
		//console.log("Returning group", newGroup);
		return newGroup;
	}));
	return groupList.filter(p => p != undefined) as ProductGroup[];
}