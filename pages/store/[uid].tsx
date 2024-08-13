import { Col, Row } from "react-bootstrap";
import { GetProductGroupList, ProductGroup } from "../../APITypes/ProductGroup";
import {
	ItemCol,
	MobileViewItemSelect,
	StoreContainer
} from "../../components/store/styles/StoreStyles";
import React, { useEffect, useState } from "react";
import {
	getGroupStates,
	initGroupStates,
	setCurrentStoreOwnerId,
	setGroupState,
} from "../../components/state/cartState";
import { useAppDispatch, useAppSelector } from "../../components/state/hooks";

import { COLORS } from "../../components/styles/colors";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { IoArrowBackSharp } from "react-icons/io5";
import NavbarStone from "../../components/global/layout/Navbar";
import { Product } from "../../APITypes/Product";
import ShoppingCart from "../../components/store/ShoppingCart";
import StoreItemCard from "../../components/store/StoreItemCard";
import StoreItemPage from "../../components/store/StoreItemPage";
import Stripe from "stripe";
import { TrackEvent } from "../_app";
import { fetchGetJSON } from "../../helpers/api-helpers";
import { setIsLightMode } from "../../components/state/settingsState";

//import { GetProductGroupList } from "../APITypes/StripeProductGroup";

export default function Store(props: {
	products: Product[];
	productGroupList: ProductGroup[];
	user: string;
	userData: {
		DescriptionText: string;
		LogoUrl: string;
		businessCardLink1: string;
		businessCardLink2: string;
		SocialAccount1: string;
		SocialAccount2: string;
		SocialAccount3: string;
		UserId: string;
		UserName: string;
	};
}) {
	// const [lightBoxOpen, setLightBoxOpen] = useState(false);
	// const [lightBoxSource, setLightBoxSource] = useState("");
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useAppDispatch();
	const groupStates = useAppSelector(getGroupStates);
	const [hasRendered, setHasRendered] = useState(false);
	const [visibleItem, setVisibleItem] = useState(0);
	/// STATE //////////////////////////////////////////////////////////////////////////
	const [mobileViewItemIsSelected, setMobileViewItemIsSelected] = useState(false);

	//console.log("productlist ", props.productGroupList);

	useEffect(() => {
		// dispatch(setShoppingCartOpen(false));
		console.log("userData ", props.userData);
		TrackEvent("Store View", new Map([["Owner ID", props.userData.UserId]]));
		dispatch(setCurrentStoreOwnerId(props.userData.UserName));

		if (typeof window !== "undefined") {
			if (localStorage.getItem("lightmode") === "true") {
				dispatch(setIsLightMode(true));
				console.log("Setting Light Mode FROM LOCAL TRUE");
			}
		}

		if (groupStates.length < 1 && props.productGroupList.length > 0) {
			dispatch(
				initGroupStates(
					props.productGroupList.map((p) => {
						return {
							id: p.stripeId,
							currentColour: p.availableColours.some((c) => c == "white")
								? "white"
								: p.availableColours[0],
							currentSize: p.availableSizes.some((c) => c == "L")
								? "L"
								: p.availableSizes[0],
						};
					})
				)
			);
		}
		setHasRendered(true);
		dispatch(setCurrentStoreOwnerId(props.user));
	}, []);

	const setColour = (colour: string, group: ProductGroup) => {
		const previousValues = groupStates.find((g) => {
			{
				return g.id == group.stripeId;
			}
		});
		if (colour === previousValues?.currentColour) {
			return;
		}
		//console.log("colour");
		dispatch(
			setGroupState({
				id: group.stripeId,
				currentColour: colour,
				currentSize: previousValues?.currentSize ?? group.availableSizes[0],
			})
		);
	};

	const setSize = (size: string, group: ProductGroup) => {
		const previousValues = groupStates.find((g) => {
			{
				return g.id == group.stripeId;
			}
		});
		if (size === previousValues?.currentSize) {
			return;
		}
		//console.log("size");
		dispatch(
			setGroupState({
				id: group.stripeId,
				currentColour:
					previousValues?.currentColour ?? group.availableColours[0],
				currentSize: size,
			})
		);
	};

	return !hasRendered ? (
		<></>
	) : (
		<div>
			<Head>
				<title>Stone Merch - {props.userData.UserName} - Store</title>
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
				landingPage={true}
				showCart={true}
				storeTitle={
					props.userData.UserName !== null
						? props.userData.UserName + " - " + "Store"
						: "Store"
				}
			/>
			<ShoppingCart />
			{/* Desktop View */}
			<StoreContainer
				productGroupList={props.productGroupList.length > 0}
				fluid
				className="d-none d-md-flex"
			>
				{/* Content */}
				{props.productGroupList.length > 0 ? (
					<Row style={{ justifyContent: "center" }}>
						<ItemCol xs={3}>
							<div className="blocker" />
							<div className="wrapper">
								{props.productGroupList?.map(
									(group: ProductGroup | null, index: number) => {
										if (group === null) {
											return;
										}
										else {
											const groupState = groupStates.find((g) => {
												{
													return g.id == group.stripeId;
												}
											}) ?? {
												id: group.stripeId,
												currentColour: group.availableColours[0],
												currentSize: group.availableSizes[0],
											};
											//console.log(groupStates, group.id);
											return (
												<Col xs={12} key={index}>
													<StoreItemCard
														index={index}
														setVisibleItem={(index: number) =>
															setVisibleItem(index)
														}
														groupState={groupState}
														group={group}
														setColour={setColour}
													/>
												</Col>
											);
										}
									}
								)}
							</div>
						</ItemCol>
						<Col xs={9}>
							{/* Larger Col to Right */}
							<Row>
								{props.productGroupList?.map(
									(group: ProductGroup | null, index: number) => {
										if (group === null) {
											return;
										}
										else {
											const groupState = groupStates.find((g) => {
												{
													return g.id == group.stripeId;
												}
											}) ?? {
												id: group.stripeId,
												currentColour: group.availableColours[0],
												currentSize: group.availableSizes[0],
											};
											//console.log(groupStates, group.id);
											return (
												<Col
													xs={12}
													key={index}
													style={{
														display: index === visibleItem ? "flex" : "none",
													}}
												>
													<StoreItemPage
														groupState={groupState}
														group={group}
														setSize={setSize}
														setColour={setColour}
													/>
												</Col>
											);
										}
									}
								)}
							</Row>
						</Col>
					</Row>
				) : (
					<Row
						style={{
							flex: 1,
						}}
					>
						<Col
							className="d-flex"
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<section className="text-center">
								<h1
									style={{
										fontWeight: "bold",
										letterSpacing: "-0.06em",
										color: COLORS.purple.default,
									}}
									className="my-5"
								>
									No Items.
								</h1>
								<img
									style={{ filter: "saturate(0.5)" }}
									src="./../images/PNG/EmptyProject.png"
									width="300px"
								/>
								<h5 className="my-5">
									Products are being created, please come back soon.
								</h5>
								<section
									style={{
										color: "yellow",
										background: "#666400",
										borderRadius: "10px",
										padding: "10px",
									}}
								>
									{" "}
									<p style={{ margin: 0, padding: 0 }}>Debug Data:</p>
									<p style={{ margin: 0, padding: 0 }}>
										<span style={{ opacity: 0.6 }}>User Id: </span>
										{props.user}
									</p>
								</section>
							</section>
						</Col>
					</Row>
				)}
			</StoreContainer>
			{/* Mobile View */}
			<StoreContainer className="d-flex d-md-none">
				{/* Content */}
				{props.productGroupList.length > 0 ? (
					<Row style={{ justifyContent: "center" }}>
						{/* Currently Selected Item, in Lightbox */}
						<MobileViewItemSelect showing={mobileViewItemIsSelected}>
							<div className="closeButtonWrapper">
								<button className="closeButton"
									onClick={() => {
										console.log("click");
										setMobileViewItemIsSelected(false);
									}
									}
								>
									<IoArrowBackSharp

									/>
								</button>
							</div>
							<Row>
								{props.productGroupList?.map(
									(group: ProductGroup | null, index: number) => {
										if (group === null) {
											return;
										}
										else {
											const groupState = groupStates.find((g) => {
												{
													return g.id == group.stripeId;
												}
											}) ?? {
												id: group.stripeId,
												currentColour: group.availableColours[0],
												currentSize: group.availableSizes[0],
											};
											//console.log(groupStates, group.id);
											return (
												<Col
													xs={12}
													key={index}
													style={{
														display: index === visibleItem ? "flex" : "none",
													}}
												>
													<StoreItemPage
														groupState={groupState}
														group={group}
														setSize={setSize}
														setColour={setColour}
														mobileView
													/>
												</Col>
											);
										}
									}
								)}
							</Row>
						</MobileViewItemSelect>
						{/* List of Items */}
						<ItemCol xs={12}>
							<div className="wrapper">
								{props.productGroupList?.map(
									(group: ProductGroup | null, index: number) => {
										if (group === null) {
											return;
										}
										else {
											const groupState = groupStates.find((g) => {
												{
													return g.id == group.stripeId;
												}
											}) ?? {
												id: group.stripeId,
												currentColour: group.availableColours[0],
												currentSize: group.availableSizes[0],
											};
											//console.log(groupStates, group.id);
											return (
												<Col xs={12} key={index}>
													<StoreItemCard
														setMobileViewItemIsSelected={() => setMobileViewItemIsSelected(true)}
														index={index}
														setVisibleItem={(index: number) =>
															setVisibleItem(index)
														}
														groupState={groupState}
														group={group}
														setColour={setColour}
													/>
												</Col>
											);
										}
									}
								)}
							</div>
						</ItemCol>
					</Row>
				) : (
					<Row
						style={{
							flex: 1,
						}}
					>
						<Col
							className="d-flex"
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<section className="text-center">
								<h1
									style={{
										fontWeight: "bold",
										letterSpacing: "-0.06em",
										color: COLORS.purple.default,
									}}
									className="my-5"
								>
									No Items.
								</h1>
								<img
									style={{ filter: "saturate(0.5)" }}
									src="./../images/PNG/EmptyProject.png"
									width="300px"
								/>
								<h5 className="my-5">
									Products are being created, please come back soon.
								</h5>
								<section
									style={{
										color: "yellow",
										background: "#666400",
										borderRadius: "10px",
										padding: "10px",
									}}
								>
									{" "}
									<p style={{ margin: 0, padding: 0 }}>Debug Data:</p>
									<p style={{ margin: 0, padding: 0 }}>
										<span style={{ opacity: 0.6 }}>User Id: </span>
										{props.user}
									</p>
								</section>
							</section>
						</Col>
					</Row>
				)}
			</StoreContainer>

		</div>
	);
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
	const stripeSecret = process.env.STRIPE_SECRET_KEY;
	const mediaApiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL;

	const stripe = new Stripe(stripeSecret ?? "", {
		apiVersion: "2020-08-27",
	});

	function isString(value: string[] | string): value is string {
		return typeof value === "string";
	}

	let user: string;

	if (!context?.params?.uid) {
		user = "a7028f93-6165-4583-bdcf-0adc90827ab1";
	}
	else if (isString(context.params.uid)) {
		user = context.params.uid;
	}
	else {
		user = context.params.uid[0];
	}

	const userData = await fetchGetJSON(`${mediaApiUrl}/user/${user}`);
	//console.log("Userdata", userData);

	const queryString = `active:'true' AND metadata['UserId']:'${user}'`;
	// Fetch data from external API
	const productsRes = await stripe.products.search({
		query: queryString,
		limit: 100,
	});

	const pricesRes = await stripe.prices.search({
		query: queryString,
		limit: 100,
	});

	// console.log("query", queryString);
	// console.log("stripeproducts", productsRes);
	// console.log("pricesRes", pricesRes);
	// console.log("staging", process.env.NEXT_PUBLIC_IS_STAGING);
	// console.log("dev", process.env.NEXT_PUBLIC_DEV);

	const productGroupList: ProductGroup[] = await GetProductGroupList(
		productsRes.data,
		pricesRes.data,
	);

	//console.log("Group: ", productGroupList);

	// Pass data to the page via props
	return {
		props: {
			//products: productList,
			productGroupList: productGroupList,
			user: user,
			userData: userData,
		},
	};
};
