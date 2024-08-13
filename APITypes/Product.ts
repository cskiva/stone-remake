import { ProductGroup } from "./ProductGroup";
import { fetchPostJSON } from "../helpers/api-helpers";

export declare interface Product {
	name: string;
	image: string;
	unit_amount: number;
	quantity: number;
	added: number;
	size: string;
	colour: string;
	groupId: string;
	stripeId: string;
	printerId: string;
	groupName: string;
	sku: string | null;
}

export async function CreateProduct(productGroup: ProductGroup, colour: string, size: string): Promise<Product> {
	const product: Product = {
		name: productGroup.name,
		colour: colour,
		size: size,
		image: "",
		unit_amount: productGroup.price,
		quantity: 1,
		added: new Date().getTime(),
		groupId: productGroup.id,
		stripeId: productGroup.stripeId,
		printerId: productGroup.printerId,
		groupName: productGroup.name,
		sku: null,
	};

	const response = await fetchPostJSON("/api/spod/item", {
		productId: product.printerId
	});
	const variants: { appearanceName: string, sizeName: string, sku: string, imageIds: string[] }[] = response.variants;

	const variant = variants.find((v) => v.appearanceName === product.colour && v.sizeName === product.size);
	product.sku = variant?.sku ?? "";
	const imageId = variant?.imageIds[0] ?? "";
	product.image = response?.images.find((i: { id: string, imageUrl: string }) => i.id == imageId)?.imageUrl;

	return product;
}

export function CloneProduct(product: Product): Product {
	const newProduct: Product = {
		name: product.name,
		colour: product.colour,
		size: product.size,
		image: product.image,
		unit_amount: product.unit_amount,
		quantity: 1,
		added: new Date().getTime(),
		groupId: product.groupId,
		stripeId: product.stripeId,
		printerId: product.printerId,
		groupName: product.groupName,
		sku: product.sku,
	};

	return newProduct;
}

export function equals(product1: Product, product2: Product) {
	return product1.groupId == product2.groupId
		&& product1.colour == product2.colour
		&& product1.size == product2.size;
}