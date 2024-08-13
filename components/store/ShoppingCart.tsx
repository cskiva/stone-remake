import {
	CheckoutPreview,
	DeleteButton,
	QuantityDiv,
	ShirtButton,
	ShoppingCartHolder,
	ShoppingCartPreview,
} from "./styles/StoreStyles";
import { CloneProduct, Product } from "../../APITypes/Product";
import { FaMinusCircle, FaPlusCircle, FaShoppingCart } from "react-icons/fa";
import React, { useState } from "react";
import {
	editProduct,
	getProducts,
	getTotalValue,
	removeProduct,
	setShoppingCartOpen,
	shoppingCartOpen,
} from "../state/cartState";
import { useAppDispatch, useAppSelector } from "../state/hooks";

import { AiFillDelete } from "react-icons/ai";
import { COLORS } from "../styles/colors";
import { Card } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import NumberFormat from "react-number-format";
import { ProjectTitle } from "../../components/global/styles/NavStyles";
import { useRouter } from "next/router";
import { useSpring } from "react-spring";

function ShoppingCart() {
	const [cartEditPopup, setCartEditPopup] = useState(false);
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useAppDispatch();
	const currentCartValue = useAppSelector(getTotalValue);
	const getCurrentProducts = useAppSelector(getProducts);
	const shoppingCartNowOpen = useAppSelector(shoppingCartOpen);

	const changeAmount = (product: Product, changeBy: number) => {
		const newProduct: Product = CloneProduct(product);
		newProduct.quantity = Math.max(product.quantity + changeBy, 0);
		dispatch(editProduct(newProduct));
	};

	const shoppingCartSpring = useSpring({
		config: { tension: 170, friction: 21, velocity: 0 },
		from: {
			right: "-770px",
		},
		to: {
			right: shoppingCartNowOpen ? "0px" : "-770px",
		},
	});

	const cartOptionAppear = useSpring({
		config: { tension: 46, friction: 9, velocity: 0 },
		from: { opacity: 0, transform: "translateY(50px)" },
		to: {
			opacity: cartEditPopup ? 1 : 0,
			transform: cartEditPopup ? "translateY(0)" : "translateY(50px)",
		},
	});

	const randomGenerator = (length = 8) => {
		// Declare all characters
		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		// Pick characers randomly
		let str = "";
		for (let i = 0; i < length; i++) {
			str += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		return str;
	};

	const router = useRouter();

	return (
		<ShoppingCartHolder
			style={shoppingCartSpring}
			multipleItems={getCurrentProducts.length > 2}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ProjectTitle
					style={{ marginLeft: 0, flex: 1 }}
					landingPageElement={true}
					lightmode={false}
					rightNavWidth={0}
				>
					<h3>Shopping Cart</h3>
				</ProjectTitle>
				<div
					className="closeButton"
					onClick={() => dispatch(setShoppingCartOpen(false))}
				>
					<CgClose size="38" color={COLORS.StoneClassyDarkColor} />
				</div>
			</div>
			<div
				className="holder"
				onClick={() => cartEditPopup && setCartEditPopup(false)}
			>
				{[...getCurrentProducts]
					.sort((p1, p2) => {
						return (p1?.added ?? 0) - (p2?.added ?? 0);
					})
					// ITEMS IN CART :
					.map((productInCart, index: number) => {
						if (getCurrentProducts) {
							return (
								<ShoppingCartPreview key={index}>
									<CheckoutPreview inCart>
										<div
											className="productInCartImage"
											style={{
												display: "flex",
												justifyContent: "center",
												position: "relative",
											}}
										>
											<div className="quantitybadge">
												{productInCart.quantity}
											</div>
											<Card.Img
												style={{
													boxShadow: "inset 0 0 5px 5px white",
													filter: "saturate(1.5)",
												}}
												src={productInCart.image}
											/>
										</div>
										<div className="productInCartInfo">
											<p>{productInCart.name}</p>
											<span style={{ width: "100%", display: "flex" }}>
												{productInCart.size !== "One Size" && (
													<p
														style={{
															alignItems: "center",
															justifyContent: "center",
															display: "flex",
															padding: 0,
															margin: 0,
															marginLeft: "10px",
															border: "solid 1px black",
															width: productInCart.size === "XL" ||
																productInCart.size === "Youth XS" ||
																productInCart.size === "2XL" ||
																productInCart.size === "3XL" ||
																productInCart.size === "4XL" ||
																productInCart.size === "5XL"
																?
																"28px" : "20px",
															height: "20px",
															borderRadius:
																productInCart.size === "XL" ||
																	productInCart.size === "Youth XS" ||
																	productInCart.size === "2XL" ||
																	productInCart.size === "3XL" ||
																	productInCart.size === "4XL" ||
																	productInCart.size === "5XL"
																	?
																	0 : "10px"
														}}
													>
														{productInCart.size.replace("Youth", "")}
													</p>
												)}
												<p style={{ textTransform: "capitalize" }}>
													{productInCart.colour}
												</p>
											</span>
										</div>

										<p className="price">
											<NumberFormat
												prefix="$"
												displayType="text"
												decimalScale={2}
												fixedDecimalScale
												value={productInCart.unit_amount / 100}
											/>
										</p>
									</CheckoutPreview>
									<div className="shoppingCartPreviewFooter">
										<QuantityDiv>
											<button onClick={() => changeAmount(productInCart, -1)}>
												<FaMinusCircle />
											</button>
											<span> {productInCart.quantity} </span>
											<button onClick={() => changeAmount(productInCart, 1)}>
												<FaPlusCircle />
											</button>
											<DeleteButton
												onClick={() => {
													dispatch(removeProduct(productInCart));
													getCurrentProducts.length <= 1 &&
														dispatch(setShoppingCartOpen(false));
												}}
											>
												<AiFillDelete />
											</DeleteButton>
										</QuantityDiv>
									</div>
								</ShoppingCartPreview>
							);
						}
						else {
							return <p>Empty</p>;
						}
					})}
			</div>
			<span className="proceedToCheckout">Proceed to Checkout</span>
			<div className="footer">
				
				<ShirtButton
					onClick={() => router.push(`/checkout/${randomGenerator(8)}`)}
					disabled={currentCartValue === 0}
					invert={true}
				>
					<FaShoppingCart
						style={{
							margin: "0 0.6em",
							fontSize: "24px",
							position: "relative",
							top: "-2px",
						}}
					/>
					<div className="shirtButtonTextBox">
						<span>
							{currentCartValue === 0 ? (
								""
							) : (
								<NumberFormat
									prefix="$"
									displayType="text"
									decimalScale={2}
									fixedDecimalScale
									value={currentCartValue / 100}
								/>
							)}{" "}
						</span>
						<div className="tipple">
							<div className="tippleCircle" />
						</div>
					</div>
				</ShirtButton>
			</div>
		</ShoppingCartHolder>
	);
}

export default React.memo(ShoppingCart);
