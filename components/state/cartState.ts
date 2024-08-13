import { CloneProduct, Product, equals } from "../../APITypes/Product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GroupState } from "../../APITypes/ProductGroup";
import { RootState } from "./_store";
import { WritableDraft } from "immer/dist/internal";

const cartStateSlice = createSlice({
	name: "cartState",
	initialState: {
		value: {
			shoppingCartOpen: false,
			products: [] as Product[],
			totalProducts: 0,
			totalValue: 0,
			groupStates: [] as GroupState[],
			shippingPrice: 0,
			currentStoreOwnerId: ""
		}
	}
	,
	reducers: {
		setShoppingCartOpen: (state: { value: { shoppingCartOpen: boolean; }; }, action: PayloadAction<boolean>) => {
			state.value.shoppingCartOpen = action.payload;
		},
		setCurrentStoreOwnerId: (state: { value: { currentStoreOwnerId: string; }; }, action: PayloadAction<string>) => {
			state.value.currentStoreOwnerId = action.payload;
		},
		addProduct: (state: WritableDraft<{ value: { products: Product[]; totalValue: number; totalProducts: number; }; }>, action: PayloadAction<Product>) => {
			const existing = state.value.products.filter((p: Product) => equals(p, action.payload));
			console.log("existing: ", existing);
			if (existing.length > 0) {
				const newProduct = changeAmount(existing[0], 1);
				state.value.products = [
					...state.value.products
						.filter((p: Product) => !equals(p, action.payload)),
					newProduct];
			}
			else {
				state.value.products = [action.payload, ...state.value.products];
			}
			state.value.totalValue = calculateTotalValue(state);
			state.value.totalProducts = calculateTotalProducts(state);
			console.log("Added");
		},
		editProduct: (state: WritableDraft<{ value: { products: Product[]; totalValue: number; totalProducts: number; }; }>, action: PayloadAction<Product>) => {
			state.value.products = [
				...state.value.products
					.filter((p: Product) => !equals(p, action.payload)),
				action.payload];
			state.value.totalValue = calculateTotalValue(state);
			state.value.totalProducts = calculateTotalProducts(state);
			console.log("Edited");
		},
		removeProduct: (state: WritableDraft<{ value: { products: Product[]; totalValue: number; totalProducts: number; }; }>, action: PayloadAction<Product>) => {
			state.value.products = [
				...state.value.products
					.filter((p: Product) => equals(p, action.payload))];
			state.value.totalValue = calculateTotalValue(state);
			state.value.totalProducts = calculateTotalProducts(state);
			console.log("Removed");
		},
		initGroupStates: (state: { value: { groupStates: GroupState[]; }; }, action: PayloadAction<GroupState[]>) => {
			state.value.groupStates = action.payload;
		},
		setGroupState: (state: { value: { groupStates: any[]; }; }, action: PayloadAction<GroupState>) => {
			const existing = state.value.groupStates.filter((p: { id: string; }) => p.id === action.payload.id);
			if (existing.length > 0) {
				state.value.groupStates = [
					...state.value.groupStates
						.filter((p: { id: string; }) => {
							return p.id != action.payload.id;
						}),
					action.payload];
			}
			else {
				state.value.groupStates = [action.payload, ...state.value.groupStates];
			}
		},
		setShippingPrice: (state: { value: { shippingPrice: number; }; }, action: PayloadAction<number>) => {
			state.value.shippingPrice = action.payload;
		},
	}
});

// Action creators are generated for each case reducer function
export const {
	setShoppingCartOpen: setShoppingCartOpen,
	addProduct: addProduct,
	editProduct: editProduct,
	removeProduct: removeProduct,
	initGroupStates: initGroupStates,
	setGroupState: setGroupState,
	setShippingPrice: setShippingPrice,
	setCurrentStoreOwnerId: setCurrentStoreOwnerId,
} = cartStateSlice.actions;

// Selectors
export const productCount = (state: RootState) => state.combinedReducer.cartState.value.totalProducts;
export const shoppingCartOpen = (state: RootState) => state.combinedReducer.cartState.value.shoppingCartOpen;
export const getProducts = (state: RootState) => [...state.combinedReducer.cartState.value.products];
export const getTotalValue = (state: RootState) => state.combinedReducer.cartState.value.totalValue;
export const getGroupStates = (state: RootState) => state.combinedReducer.cartState.value.groupStates;
export const getShippingPrice = (state: RootState) => state.combinedReducer.cartState.value.shippingPrice;
export const getCurrentStoreOwnerId = (state: RootState) => state.combinedReducer.cartState.value.currentStoreOwnerId;

export default cartStateSlice.reducer;

function calculateTotalValue(state: WritableDraft<{ value: { products: Product[]; totalValue: number; }; }>): number {
	return state.value.products.reduce<number>(
		function (total, nextItem) {
			return total + (nextItem.unit_amount * nextItem.quantity);
		}, 0);
}

function calculateTotalProducts(state: WritableDraft<{ value: { products: Product[]; totalProducts: number; }; }>): number {
	return state.value.products.reduce<number>(
		function (total, nextItem) {
			return total + (nextItem.quantity);
		}, 0);
}

const changeAmount = (product: Product, changeBy: number) => {
	const newProduct: Product = CloneProduct(product);
	newProduct.quantity = Math.max(product.quantity + changeBy, 0);
	return (newProduct);
};
