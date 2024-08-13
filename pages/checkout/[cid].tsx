import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
	CheckoutCol,
	CheckoutItemsDiv,
	CheckoutPreview,
	HeartLoader,
	MobileCheckoutCollapser,
	SubTotalAndShippingDisplay,
	Titles,
} from "../../components/store/styles/StoreStyles";
import React, { FC, useEffect, useState } from "react";
import {
	getCurrentStoreOwnerId,
	getProducts,
	getTotalValue,
} from "../../components/state/cartState";
import { useAppDispatch, useAppSelector } from "../../components/state/hooks";

import { COLORS } from "../../components/styles/colors";
import CheckoutForm from "../../components/store/CheckoutForm";
import CheckoutStepper from "../../components/store/CheckoutStepper";
import DIMENSIONS from "../../components/styles/GlobalDimensions";
import { Elements } from "@stripe/react-stripe-js";
import { GetServerSideProps } from "next";
import Head from "next/head";
import MerchLogo from "../../public/images/SVG/merch.svg";
import NavbarStone from "../../components/global/layout/Navbar";
import NumberFormat from "react-number-format";
import { PaymentIntent } from "@stripe/stripe-js";
import { Product } from "../../APITypes/Product";
import { TrackEvent } from "../_app";
import { fetchPostJSON } from "../../helpers/api-helpers";
import getStripe from "../../helpers/get-stripejs";
import { isMobile } from "react-device-detect";
import { setIsLightMode } from "../../components/state/settingsState";
import useWindowDimensions from "../../helpers/GetWindowDimensions";

export const Checkout: FC<{
	cid: string;
}> = ({ cid }) => {
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useAppDispatch();
	const currentCartValue = useAppSelector(getTotalValue);
	const currentCartItems = useAppSelector(getProducts);
	const currentStoreOwnerId = useAppSelector(getCurrentStoreOwnerId);
	// STATE //////////////////////////////
	const { height, width: windowWidth } = useWindowDimensions();
	const [activeStep, setActiveStep] = useState(0);
	const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
		null
	);
	const [mobileItemsInCartOpen, setMobileItemsInCartOpen] = useState(true);

	const [selectedShipping, setSelectedShipping] = useState<{
		id: string;
		name: string;
		description: string;
		price: any;
	} | null>(null);

	useEffect(() => {
		TrackEvent(
			"Checkout View",
			new Map([
				["Owner ID", currentStoreOwnerId],
				["Value", currentCartValue.toString()],
				["Item Count", currentCartItems.length.toString()],
			])
		);
		if (typeof window !== "undefined") {
			if (localStorage.getItem("lightmode") === "true") {
				dispatch(setIsLightMode(true));
				console.log("Setting Light Mode FROM LOCAL TRUE");
			}
		}
	}, []);

	const updateTransaction: (
		spodOrderId: string | null,
		paymentIntentId: string | null
	) => void = (spodOrderId: string | null) => {
		fetchPostJSON("../api/payment_intents", {
			spodOrderId: spodOrderId,
			payment_intent_id: paymentIntent && paymentIntent?.id,
			storeId: currentStoreOwnerId,
		}).then((data) => {
			setPaymentIntent(data.paymentIntent);
			console.log("paymentIntent: ", data);
		});
	};

	const checkoutSteps = ["Information", "Shipping", "Payment"];
	return (
		<div
			style={{
				height: "100%",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Head>
				<title>Stone Merch - Checkout</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="icon" href="favicon.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<NavbarStone
				landingPage={false}
				showCart={false}
				checkout={true}
				storeTitle={
					currentStoreOwnerId === null
						? "Checkout"
						: currentStoreOwnerId + " - " + "Checkout"
				}
			/>
			<Container
				fluid
				style={{
					height: `calc(100% - ${DIMENSIONS.heights.navbar.standard}px)`,
					overflowX: "hidden",
					overflowY: "scroll",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Row>
					<Titles>
						<span
							style={{
								color: COLORS.purple.default,
								left: "calc(56px)",
								position: "absolute",
								top: "-21px",
							}}
						>
							<MerchLogo width={80} />
						</span>
					</Titles>
				</Row>
				{/* // STRIPE CHECKOUT TEST ////////////////////////////////// */}
				{currentCartItems.length ? (
					<Elements
						stripe={getStripe()}
						options={{
							appearance: {
								variables: {
									colorIcon: "#6772e5",
									fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
								},
							},
							clientSecret: paymentIntent?.client_secret ?? undefined,
						}}
					>
						<Row
							style={{
								height: `calc(100vh - ${DIMENSIONS.heights.navbar.standard}px)`,
							}}
						>
							<Col
								xs={{ span: 12, order: 2 }}
								md={8}
								className="d-flex flex-column"
							>
								<CheckoutStepper
									activeStep={activeStep}
									steps={checkoutSteps}
								/>
								<CheckoutForm
									activeStep={activeStep}
									paymentIntent={paymentIntent}
									propsSetSelectedShipping={(e) => setSelectedShipping(e)}
									checkoutId={cid}
									setActiveStep={(step: number) => setActiveStep(step)}
									updateTransaction={updateTransaction}
								/>
							</Col>
							<CheckoutCol sm={{ order: 1 }} md={{ order: 2 }}>
								<MobileCheckoutCollapser onClick={()=> setMobileItemsInCartOpen(!mobileItemsInCartOpen)}>
									My Cart:{" "}
									{mobileItemsInCartOpen ? (
										<BsFillCaretDownFill />
									) : (
										<BsFillCaretUpFill />
									)}
								</MobileCheckoutCollapser>
								<CheckoutItemsDiv
									open={isMobile ? mobileItemsInCartOpen : true}
								>
									<div className="items">
										{currentCartItems.map(
											(productInCart: Product, index: number) => {
												return (
													<CheckoutPreview
														key={index}
														inCart={false}
														style={{
															display: "flex",
															justifyContent: "space-between",
															margin: "2em 0",
														}}
													>
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
																			width:
																				productInCart.size === "XL" ||
																					productInCart.size === "2XL" ||
																					productInCart.size === "3XL" ||
																					productInCart.size === "4XL" ||
																					productInCart.size === "5XL"
																					? "28px"
																					: "20px",
																			height: "20px",
																			borderRadius:
																				productInCart.size === "XL" ||
																					productInCart.size === "2XL" ||
																					productInCart.size === "3XL" ||
																					productInCart.size === "4XL" ||
																					productInCart.size === "5XL"
																					? 0
																					: "10px",
																		}}
																	>
																		{productInCart.size}
																	</p>
																)}
																<p style={{ textTransform: "capitalize" }}>
																	{productInCart.colour}
																</p>
															</span>
														</div>

														<p>
															<NumberFormat
																prefix="$"
																displayType="text"
																decimalScale={2}
																fixedDecimalScale
																value={productInCart.unit_amount / 100}
															/>
														</p>
													</CheckoutPreview>
												);
											}
										)}
									</div>
									<SubTotalAndShippingDisplay>
										<Row noGutters>
											<Col xs={6}>
												<h5>Subtotal</h5>
											</Col>
											<Col className="text-right" xs={6}>
												<NumberFormat
													prefix="$"
													displayType="text"
													value={currentCartValue / 100}
													decimalScale={2}
													fixedDecimalScale
												/>
											</Col>
											<Col xs={6}>
												<h5>Shipping</h5>
											</Col>
											<Col
												className="text-right"
												xs={6}
												style={{
													color:
														selectedShipping !== null && activeStep == 0
															? "#00000080"
															: "inherit",
												}}
											>
												{activeStep == 0 ? (
													"Calculated at next step"
												) : selectedShipping !== null ? (
													<NumberFormat
														prefix="$"
														displayType="text"
														value={selectedShipping.price.amount}
														decimalScale={2}
														fixedDecimalScale
													/>
												) : (
													"No Shipping Selected"
												)}
											</Col>
										</Row>
										<Row className="totalRow">
											<Col xs={6}>
												<h5>Total</h5>
											</Col>
											<Col className="text-right" xs={6}>
												<h2>
													{selectedShipping !== null ? (
														<>
															<NumberFormat
																prefix="$"
																displayType="text"
																value={
																	currentCartValue / 100 +
																	selectedShipping?.price?.amount
																}
																decimalScale={2}
																fixedDecimalScale
															/>
															<span
																style={{ fontSize: "13px", marginLeft: "5px" }}
															>
																USD
															</span>
														</>
													) : (
														<>
															<NumberFormat
																prefix="$"
																displayType="text"
																value={currentCartValue / 100}
																decimalScale={2}
																fixedDecimalScale
															/>
															<span
																style={{ fontSize: "13px", marginLeft: "5px" }}
															>
																USD
															</span>
														</>
													)}
												</h2>
											</Col>
											<Col xs={6}>
												<p>
													<span>Including</span>{" "}
													<NumberFormat
														prefix="$"
														displayType="text"
														value={
															(currentCartValue / 100 +
																selectedShipping?.price?.amount) /
															10
														}
														decimalScale={2}
														fixedDecimalScale
													/>{" "}
													<span>in taxes</span>
												</p>
											</Col>
											<Col xs={6}></Col>
										</Row>
									</SubTotalAndShippingDisplay>
								</CheckoutItemsDiv>
							</CheckoutCol>
						</Row>
					</Elements>
				) : (
					<HeartLoader fixed>
						<div className="lds-heart">
							<div></div>
						</div>
					</HeartLoader>
				)}
			</Container>
		</div>
	);
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async (context) => {
	function isString(test: string[] | string): test is string {
		return typeof test === "string";
	}

	let cid: string;

	if (!context?.params?.cid) {
		cid = "";
	}
	else if (isString(context.params.cid)) {
		cid = context.params.cid;
	}
	else {
		cid = context.params.cid[0];
	}

	return {
		props: {
			cid: cid,
		},
	};
};
