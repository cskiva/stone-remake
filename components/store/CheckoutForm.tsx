/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
	ButtonFooter,
	CheckoutFormStyle,
	FooterFormWrapper,
	FormGroupCheckout,
	FormRow,
	FormWrapper,
	HeartLoader,
	PaymentStatusDiv,
	ReceiptPaper,
	ShippingFormControl,
	ShippingOptionsDiv,
	ShippingRadioButton,
	Titles,
	YourDetails
} from "./styles/StoreStyles";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaShoppingCart, FaStripe } from "react-icons/fa";
import {
	PaymentIntent,
	StripeCardElement,
	StripeCardElementOptions,
	StripeError
} from "@stripe/stripe-js";
import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
	fetchPostJSON,
	fetchPutJSON
} from "../../helpers/api-helpers";
import {
	getCurrentStoreOwnerId,
	getProducts,
	getTotalValue
} from "../state/cartState";
import { useAppDispatch, useAppSelector } from "../state/hooks";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { BsChevronLeft } from "react-icons/bs";
import Button from "@material-ui/core/Button";
import { COLORS } from "./../styles/colors";
import { CardFieldElement } from "./styles/StoreStyles";
import Checkbox from "@mui/material/Checkbox";
import CurrencyFormatted from "../../helpers/CurrencyFormatted";
import { FcGlobe } from "react-icons/fc";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import { MdOutlineReceiptLong } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import { SpodOrder } from "../../APITypes/SpodOrder";
import TextField from "@mui/material/TextField";
import { TrackEvent } from "../../pages/_app";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { formatAmountFromStripe } from "../../helpers/stripe-helpers";
import { useSpring } from "react-spring";

// STRIPE //////////////////////////////////

const CARD_OPTIONS: StripeCardElementOptions = {
	iconStyle: "solid" as "solid" | "default" | undefined,
	hidePostalCode: true,
	style: {
		base: {
			iconColor: COLORS.mellowYellow,
			color: "#fff",
			fontWeight: 500,
			fontFamily: "inherit",
			fontSize: "19px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": {
				color: "#fce883",
			},
			"::placeholder": {
				color: COLORS.purple.cadenceLavender,
			},
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee",
		},
	},
};

const CardField = ({ onChange }: { onChange: (e: any) => void }) => (
	<CardFieldElement>
		<div style={{ background: "white", padding: "0.3em", width: "100%" }}>
			<FaStripe color={COLORS.purple.rollover} size={57} />
		</div>
		<div
			id="payment-element"
			style={{
				background: COLORS.purple.rollover,
				width: "100%",
				borderRadius: "10px",
				padding: "1em",
			}}
		>
			<CardElement options={CARD_OPTIONS} onChange={onChange} />
		</div>

	</CardFieldElement>
);

interface FieldInterface {
	label: string;
	id: string | undefined;
	type: string;
	placeholder: string;
	required?: boolean;
	autoComplete: string;
	value: string | undefined;
	onChange: (e: any) => void;
}

const Field: FC<FieldInterface> = ({
	label,
	id,
	type,
	placeholder,
	required,
	autoComplete,
	value,
	onChange,
}) => (
	<TextField
		label={label}
		variant="filled"
		className="FormRowInput"
		id={id}
		style={{ flex: 1 }}
		type={type}
		placeholder={placeholder}
		required={required}
		autoComplete={autoComplete}
		value={value}
		onChange={onChange}
	/>
);

const CheckoutForm: FC<{
	paymentIntent?: PaymentIntent | null;
	activeStep: number;
	checkoutId: string;
	setActiveStep: (step: number) => void;
	propsSetSelectedShipping: (s: {
		id: string;
		name: string;
		description: string;
		price: any;
	}) => void | null;
	updateTransaction: (spodOrderId: string, paymentIntentId: string | null, storeId: string) => void;
}> = ({
	paymentIntent,
	activeStep,
	setActiveStep,
	checkoutId,
	propsSetSelectedShipping,
	updateTransaction,
}) => {
		const stripe = useStripe();
		const elements = useElements();
		const [errorString, setErrorString] = useState<string>("");
		const [error, setError] = useState<StripeError>();
		const [cardComplete, setCardComplete] = useState(false);
		const [processing, setProcessing] = useState(false);
		const [fadeForm, setFadeForm] = useState(false);
		const [payment, setPayment] = useState({ status: "initial" });
		const [orderId, setOrderId] = useState<string | null>(null);
		const [shippingOptions, setShippingOptions] = useState<
			{ id: string; name: string; description: string; price: any }[] | null
		>(null);
		const [selectedShipping, setSelectedShipping] = useState<{
			id: string;
			name: string;
			description: string;
			price: any;
		} | null>(null);
		const dev = process.env.NEXT_PUBLIC_DEV == "true";
		// REDUX //////////////////////////////////////////////////////////////////////////
		const dispatch = useAppDispatch();
		const currentCartValue = useAppSelector(getTotalValue);
		const currentCartItems = useAppSelector(getProducts);
		const currentStoreOwnerId = useAppSelector(getCurrentStoreOwnerId);

		// useEffect(() => {
		// 	console.log("checkoutFirstEffect");
		// 	doPrinterOrder();
		// }, []);

		useEffect(() => {
			window.addEventListener("beforeunload", beforePageUnload);
			return () => window.removeEventListener("beforeunload", beforePageUnload);
		}, [orderId]);

		useEffect(() => {
			console.log("payment changed", payment);
		}, [payment]);

		const beforePageUnload = useCallback((e: BeforeUnloadEvent) => {
			// e.preventDefault(); //uncomment this to pause and pop up a window
			console.log("user is leaving page: ");
			if (orderId && (!paymentIntent || paymentIntent.status != "succeeded")) {
				const setShippingResult = fetchPostJSON("/api/spod/cancelOrder", {
					orderId: orderId
				}).then((r) => {
					console.log("order was cancelled: ", r);
				});
			}
			else {
				console.log("Page unload fired, order not cancelled", orderId, paymentIntent, paymentIntent?.status);
			}
		}, [orderId]);

		const [billingDetails, setBillingDetails] = useState(
			!dev
				? {
					email: "",
					firstName: "",
					lastName: "",
					address: {
						country: "",
						city: "",
						state: "",
						postal_code: "",
						line1: "",
						line2: "",
					},
				}
				: {
					email: "duncan@writeinstone.com",
					firstName: "Tester",
					lastName: "McTestyface",
					address: {
						country: "DE",
						city: "Berlin",
						state: "Berlin",
						postal_code: "10317",
						line1: "Tester st 24",
						line2: "Testingberg",
					},
				}
		);

		const [receiptBillingDetails, setReceiptBillingDetails] = useState({
			email: "",
			firstName: "",
			lastName: "",
			address: {
				country: "",
				city: "",
				state: "",
				postal_code: "",
				line1: "",
				line2: "",
			},
		});

		/////////////////////
		const PaymentStatus = ({ status }: { status: string }) => {
			switch (status) {
				case "processing":
				case "requires_payment_method":
				case "requires_confirmation":
					return <h2>Processing...</h2>;

				case "requires_action":
					return <h2>Authenticating...</h2>;

				case "succeeded":
					return <h2>Payment Succeeded</h2>;

				case "error":
					return null;

				default:
					return null;
			}
		};

		useEffect(() => {
			if (activeStep !== 0 && activeStep !== 2) {
				doPrinterOrder();
			}
		}, [activeStep]);

		// useEffect(() => {
		// 	console.log(shippingOptions);
		// }, [shippingOptions]);

		useEffect(() => {
			console.log("shipping ", selectedShipping);
			if (selectedShipping !== null) {
				propsSetSelectedShipping(selectedShipping);
				console.log("attempting to set shipping: ", {
					orderId: orderId,
					shippingTypeId: selectedShipping.id
				});
				const setShippingResult = fetchPostJSON("/api/spod/shipping", {
					orderId: orderId,
					shippingTypeId: selectedShipping.id
				}).then((r) => {
					console.log("shipping was set: ", r);
				});
				if (orderId != null) {
					console.log("getting payment intent: ", currentStoreOwnerId);
					updateTransaction(
						orderId,
						paymentIntent?.id ?? null,
						currentStoreOwnerId
					);
				}
			}
		}, [selectedShipping]);

		const productsForSendInBlue = currentCartItems.map((p) => ({
			name: p.name,
			orderNumber: orderId,
			sku: p.sku,
			price: CurrencyFormatted((p.unit_amount / 100).toString()),
			colour: p.colour,
			size: p.size,
			quantity: p.quantity,
			image: p.image,
		}));

		countries.registerLocale(enLocale);

		const countryobj = countries.getNames("en", { select: "official" });

		const countryArr = Object.entries(countryobj).map(([key, value]) => {
			return {
				label: value,
				value: key,
			};
		});

		const countryListElements = countryArr.map(({ label, value }) => {
			return (
				<MenuItem key={value} value={value}>
					{label}
				</MenuItem>
			);
		});

		const usStateListElements = [
			{ label: "Alabama ", value: "AL" },
			{ label: "Alaska ", value: "AK" },
			{ label: "Arizona ", value: "AZ" },
			{ label: "Arkansas ", value: "AR" },
			{ label: "California ", value: "CA" },
			{ label: "Colorado ", value: "CO" },
			{ label: "Connecticut ", value: "CT" },
			{ label: "Delaware ", value: "DE" },
			{ label: "Florida ", value: "FL" },
			{ label: "Georgia ", value: "GA" },
			{ label: "Hawaii ", value: "HI" },
			{ label: "Idaho ", value: "ID" },
			{ label: "Illinois ", value: "IL" },
			{ label: "Indiana ", value: "IN" },
			{ label: "Iowa ", value: "IA" },
			{ label: "Kansas ", value: "KS" },
			{ label: "Kentucky ", value: "KY" },
			{ label: "Louisiana ", value: "LA" },
			{ label: "Maine ", value: "ME" },
			{ label: "Maryland ", value: "MD" },
			{ label: "Massachusetts ", value: "MA" },
			{ label: "Michigan ", value: "MI" },
			{ label: "Minnesota ", value: "MN" },
			{ label: "Mississippi ", value: "MS" },
			{ label: "Missouri ", value: "MO" },
			{ label: "Montana ", value: "MT" },
			{ label: "Nebraska ", value: "NE" },
			{ label: "Nevada ", value: "NV" },
			{ label: "New Hampshire ", value: "NH" },
			{ label: "New Jersey ", value: "NJ" },
			{ label: "New Mexico ", value: "NM" },
			{ label: "New York ", value: "NY" },
			{ label: "North Carolina ", value: "NC" },
			{ label: "North Dakota ", value: "ND" },
			{ label: "Ohio ", value: "OH" },
			{ label: "Oklahoma ", value: "OK" },
			{ label: "Oregon ", value: "OR" },
			{ label: "Pennsylvania ", value: "PA" },
			{ label: "Rhode Island ", value: "RI" },
			{ label: "South Carolina ", value: "SC" },
			{ label: "South Dakota ", value: "SD" },
			{ label: "Tennessee ", value: "TN" },
			{ label: "Texas ", value: "TX" },
			{ label: "Utah ", value: "UT" },
			{ label: "Vermont ", value: "VT" },
			{ label: "Virginia ", value: "VA" },
			{ label: "Washington ", value: "WA" },
			{ label: "West Virginia ", value: "WV" },
			{ label: "Wisconsin ", value: "WI" },
			{ label: "Wyoming ", value: "WY" },
		].map(({ label, value }) => {
			return (
				<MenuItem key={value} value={value}>
					{label}
				</MenuItem>
			);
		});

		type SubmitButtonProps = PropsWithChildren<{
			processing: boolean;
			error: string;
			disabled: boolean;
		}>;

		type FakeStringProps = PropsWithChildren<{
			text: string;
		}>;

		const SubmitButton: FC<SubmitButtonProps> = ({
			processing,
			children,
		}: SubmitButtonProps) => (
			<Button
				type="submit"
				form="checkoutForm"
				variant="contained"
				color="primary"
				startIcon={<FaShoppingCart />}
			>
				{processing ? "Processing..." : children}
			</Button>
		);

		const ErrorMessage: FC<FakeStringProps> = ({
			text,
			children,
		}: FakeStringProps) => (
			<Alert
				variant="filled"
				sx={{ marginTop: "10px", borderRadius: "10px" }}
				severity={error !== undefined ? "error" : "success"}>
				{children}
			</Alert>
		);

		const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
			e.preventDefault();
			console.log("attempting to submit");

			// Abort if form isn't valid
			if (!e.currentTarget.reportValidity()) {
				console.log("error: form not valid");
				return;
			}
			if (!elements) {
				console.log("error: elements missing");
				return;
			}
			setPayment({ status: "processing" });

			console.log("processing: ", paymentIntent);

			const card: StripeCardElement | null = elements.getElement(CardElement);

			if (cardComplete) {
				setProcessing(true);
			}

			if (
				paymentIntent?.client_secret === null ||
				paymentIntent?.client_secret === undefined
			) {
				setPayment({ status: "error" });
				setErrorString("Invalid client secret");
				console.log("error: ", "Invalid client secret");
			}
			else if (card === null) {
				setPayment({ status: "error" });
				setErrorString("Invalid card details");
				console.log("error: ", "Invalid card details");
			}
			else if (stripe === null) {
				setPayment({ status: "error" });
				setErrorString("Stripe service error");
				console.log("error: ", "Stripe service error");
			}
			else {
				console.log("processing payment: ");

				setProcessing(true);
				console.log("waiting for stripe");
				await stripe
					.confirmCardPayment(paymentIntent?.client_secret, {
						receipt_email: billingDetails.email,
						payment_method: {
							card: card,
							billing_details: {
								email: billingDetails.email,
								name: `${billingDetails.firstName} ${billingDetails.lastName}`,
								address: billingDetails.address
							},
						},
					})
					.then((a) => {
						if (a.error) {
							setPayment({ status: "error" });
							setErrorString(a.error.message ?? "");
							setError(a.error);
							setProcessing(false);
							console.log("Checkout failed: ", a.error);
						}
						else {
							setPayment(paymentIntent);
							setProcessing(false);
							setPayment({ status: "succeeded" });
							console.log("Checkout succeeded: ", a);
							finalizeCheckout();
						}
					});
			}
			if (errorString) {
				console.log("error: ", errorString);
			}
		};

		const finalizeCheckout = () => {
			console.log("payment completed, finalising");
			setErrorString("");
			setProcessing(false);

			// Do not confirm spod order, we are doing this manually for now
			// const orderConfirmResult = fetchPostJSON("/api/spod/confirmOrder", {
			// 	orderId: orderId,
			// 	paymentIntentId: paymentIntent?.id
			// }).then((r) => {
			// 	console.log("order was confirmed: ", r);				
			// });

			// Generate Receipt by Setting ReceiptBillingDetails
			setReceiptBillingDetails(billingDetails);
			setBillingDetails({
				email: "",
				firstName: "",
				lastName: "",
				address: {
					country: "",
					city: "",
					state: "",
					postal_code: "",
					line1: "",
					line2: "",
				},
			});

			if (process.env.NEXT_PUBLIC_IS_STAGING != "true" && process.env.NEXT_PUBLIC_DEV != "true") {
				fetchPostJSON("/api/send_in_blue/confirm", {
					storeOwner: currentStoreOwnerId,
					orderNumber: checkoutId,
					orderUrl: `https://app.spod.com/global/orders/${orderId}`,
					// PRODUCTS:
					productsForSendInBlue: productsForSendInBlue,
					// ADDRESS + PURCHASER INFO
					billingDetails: billingDetails,
					// SHIPPING:
					shippingType: selectedShipping ? selectedShipping.name : "none",
					// TOTALS
					currentCartValue: CurrencyFormatted((currentCartValue / 100).toString()),
					selectedShippingPrice: selectedShipping
						? CurrencyFormatted(selectedShipping.price.amount.toString())
						: "",
					grandTotal: currentCartValue
						? CurrencyFormatted(
							(
								currentCartValue / 100 +
								(selectedShipping && selectedShipping.price.amount)
							).toString()
						)
						: "",
				}).then((res: Response) => {
					// Wait for response from SendInBlue
					console.log("res.status", res.status);

					// TODO: Clear Cart;
				});
			}

			TrackEvent(
				"Purchase",
				new Map([
					["Owner ID", currentStoreOwnerId],
					["Value", currentCartValue.toString()],
					["Item Count", currentCartItems.length.toString()],
					["Country", billingDetails.address.country]
				])
			);
		};

		const doPrinterOrder = async () => {
			console.log("cid", checkoutId);
			const requestObject = {
				orderItems: currentCartItems.map((p) => {
					return {
						sku: p.sku,
						quantity: p.quantity,
						externalOrderItemReference: p.printerId,
						customerPrice: {
							//TODO TAXES
							amount: 0,
							taxRate: 19,
							taxAmount: 0,
							currency: "AUD",
						},
					};
				}),
				shipping: {
					address: {
						//"company": "",
						firstName: billingDetails.firstName,
						lastName: billingDetails.lastName,
						street: billingDetails.address.line1,
						//"streetAnnex": "",
						city: billingDetails.address.city,
						country: billingDetails.address.country,
						state: billingDetails.address.state !== "" ? billingDetails.address.state : "",
						zipCode: billingDetails.address.postal_code,
					},
					// "fromAddress": {
					// 	"company": "Write in Stone Pty Ltd",
					// 	"firstName": "",
					// 	"lastName": "",
					// 	"street": "1:7 Guboo Place",
					// 	"streetAnnex": "",
					// 	"city": "Bermagui",
					// 	"country": "Australia",
					// 	"state": "NSW",
					// 	"zipCode": "2546"
					// },
					preferredType: undefined as unknown as string,
					customerPrice: {
						//TODO TAXES
						amount: 0,
						taxRate: 19,
						taxAmount: 0,
						currency: "AUD",
					},
				},
				// "billingAddress": {
				// 	//"company": "",
				// 	//"firstName": "",
				// 	"lastName": billingDetails.name,
				// 	"street": billingDetails.address.line1,
				// 	//"streetAnnex": "",
				// 	"city": billingDetails.address.city,
				// 	"country": billingDetails.address.country,
				// 	"state": billingDetails.address.state,
				// 	"zipCode": billingDetails.address.postal_code
				// },
				phone: "+61 475460540",
				email: "duncan@writeinstone.com",
				externalOrderReference: checkoutId,
				state: "NEW",
				customerTaxType: "SALESTAX",
				origin: "string",
			};

			if (selectedShipping != null) {
				requestObject.shipping.preferredType = selectedShipping.id;
			}

			console.log("req = ", JSON.stringify(requestObject));
			console.log("id = ", orderId);
			let tempOrderId = orderId;
			if (orderId == null) {
				const response = await fetchPostJSON("/api/spod/order", {
					requestObject: requestObject,
				});
				console.log("response ID ", response.id);
				setOrderId(response.id);
				tempOrderId = response.id;
			}
			else {
				const response = await fetchPutJSON("/api/spod/order", {
					orderId: orderId,
					requestObject: requestObject,
				});
				if (response.id != orderId) {
					console.log("ERROR: New order was created after update call");
					setOrderId(response.id);
				}
				//console.log("Order response: ", response);
			}

			console.log("Checking shipping options for order: ", tempOrderId);

			const so = await fetch("/api/spod/shipping", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					orderId: tempOrderId,
				})
			});

			const shippingResult = await so.json();
			//console.log("Shipping options: ", shippingResult);
			if (so.ok) {
				setShippingOptions(shippingResult);
			}
		};

		const billingDetailsIncomplete = Object.values(billingDetails).every(
			(value) => {
				if (
					Object.values(billingDetails).includes("") ||
					Object.values(billingDetails.address.country).includes("") ||
					Object.values(billingDetails.address.line1).includes("") ||
					Object.values(billingDetails.address.postal_code).includes("")
				) {
					return true;
				}
				return false;
			}
		);

		React.useEffect(() => {
			console.log("billingDetailsIncomplete ===" + billingDetailsIncomplete);
		}, [billingDetails]);

		const fadeFormAnimation = useSpring({
			// config: { tension: 46, friction: 9, velocity: 0 },
			opacity: fadeForm ? 0 : 1,
		});

		const receiptPop = useSpring({
			opacity: payment.status === "succeeded" ? 0 : 1,
			marginTop: payment.status === "succeeded" ? "0px" : "100px",
		});

		const duration = 800;

		function fadeFormFunction(step: number) {
			setFadeForm(true);
			setTimeout(() => {
				setActiveStep(step);
			}, duration / 2);
			setTimeout(() => {
				setFadeForm(false);
			}, duration);
		}

		return (
			<FormWrapper>
				{payment.status !== "succeeded" ? (
					<>
						<CheckoutFormStyle className="Form" id="checkoutForm" onSubmit={handleSubmit}>
							<FormGroupCheckout style={fadeFormAnimation}>
								{activeStep === 0 && (
									<>
										{" "}
										<h3>Contact Details:</h3>
										<FormRow className="d-none d-md-flex">
											<Field
												label="First Name"
												id="name"
												type="text"
												placeholder="Jane"
												required
												autoComplete="name"
												value={billingDetails.firstName}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														firstName: e.target.value,
													})
												}
											/>
											<Field
												label="Last Name"
												id="name"
												type="text"
												placeholder="Smith"
												required
												autoComplete="name"
												value={billingDetails.lastName}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														lastName: e.target.value,
													})
												}
											/>
										</FormRow>
										{/* // Seperate for Mobile */}
										<FormRow className="d-md-none">
											<Field
												label="First Name"
												id="name"
												type="text"
												placeholder="Jane"
												required
												autoComplete="name"
												value={billingDetails.firstName}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														firstName: e.target.value,
													})
												}
											/>
										</FormRow>
										<FormRow className="d-md-none">
											<Field
												label="Last Name"
												id="name"
												type="text"
												placeholder="Jane Doe"
												required
												autoComplete="name"
												value={billingDetails.lastName}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														lastName: e.target.value,
													})
												}
											/>
										</FormRow>
										{/* //////////////////////////// */}
										<FormRow>
											<Field
												label="Email"
												id="email"
												type="email"
												placeholder="janedoe@gmail.com"
												required
												autoComplete="email"
												value={billingDetails.email}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														email: e.target.value,
													})
												}
											/>
										</FormRow>
									</>
								)}
								<FormRow>
									<FormGroup>
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="
				Email me with news and offers"
										/>
									</FormGroup>
								</FormRow>
								<div>
									<div
										style={{
											display: activeStep !== 0 ? "none" : "block",
										}}
									>
										<h3>Shipping Details:</h3>
										<Box
											sx={{
												minWidth: 120,
												marginBottom: "15px",
												marginTop: "18px",
											}}
										>
											<FormControl fullWidth>
												<InputLabel id="countrylabel">Country / Region</InputLabel>
												<Select
													label="Country / Region"
													labelId="countryLabel"
													variant="filled"
													IconComponent={FcGlobe}
													style={{ flex: 1 }}
													id="Country"
													value={billingDetails.address.country}
													onChange={(e: SelectChangeEvent) => {
														setBillingDetails({
															...billingDetails,
															address: {
																...billingDetails.address,
																country: e.target.value as string,
															},
														});
													}}
												>
													{!!countryListElements?.length && countryListElements}
												</Select>
											</FormControl>
										</Box>
										<FormRow>
											<Field
												label="Address Line 1"
												id="line1"
												type="address"
												placeholder="123 Smith Street"
												required
												autoComplete="address-line1"
												value={billingDetails.address.line1}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														address: {
															...billingDetails.address,
															line1: e.target.value,
														},
													})
												}
											/>
										</FormRow>
										<FormRow>
											<Field
												label="Address Line 2"
												id="line2"
												type="address"
												placeholder="123 Smith Street"
												autoComplete="address-line2"
												value={billingDetails.address.line2}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														address: {
															...billingDetails.address,
															line2: e.target.value,
														},
													})
												}
											/>
										</FormRow>
										<FormRow>
											{billingDetails.address.country == "US" ?
												<FormControl style={{ minWidth: "50%" }}>
													<InputLabel id="stateLabel">State</InputLabel>
													<Select
														label="State"
														labelId="stateLabel"
														variant="filled"
														IconComponent={FcGlobe}
														style={{ flex: 1 }}
														id="State"
														value={billingDetails.address.state}
														onChange={(e: SelectChangeEvent) => {
															setBillingDetails({
																...billingDetails,
																address: {
																	...billingDetails.address,
																	state: e.target.value as string,
																},
															});
														}}
													>
														{!!usStateListElements?.length && usStateListElements}
													</Select>
												</FormControl>
												:
												<Field
													label="State"
													id="state"
													type="state"
													placeholder="NSW"
													required
													autoComplete="state"
													value={billingDetails.address.state}
													onChange={(e) =>
														setBillingDetails({
															...billingDetails,
															address: {
																...billingDetails.address,
																state: e.target.value,
															},
														})
													}
												/>}
											<Field
												label={billingDetails.address.country == "" ? "Postal Code / Zip" : billingDetails.address.country == "US" ? "Zip Code" : "Postal Code"}
												id="zip"
												type="zip"
												placeholder="1234"
												required
												autoComplete="zip"
												value={billingDetails.address.postal_code}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														address: {
															...billingDetails.address,
															postal_code: e.target.value,
														},
													})
												}
											/>
										</FormRow>
										<FormRow>
											<Field
												label="City"
												id="city"
												type="city"
												placeholder="City"
												autoComplete="city"
												value={billingDetails.address.city}
												onChange={(e) =>
													setBillingDetails({
														...billingDetails,
														address: {
															...billingDetails.address,
															city: e.target.value,
														},
													})
												}
											/>
										</FormRow>
									</div>
									{/* // Shipping Step */}
									<div
										style={{
											display: activeStep === 0 ? "none" : "block",
										}}
									>
										<h3>Your Details:</h3>
										<YourDetails>
											<div className="section top">
												<div className="subtitle">
													<p>Contact</p>
												</div>
												<div className="info">
													<p>{billingDetails.email}</p>
													<span>	<p style={{ display: "inline-block" }}>{billingDetails.firstName}</p>
														<p style={{ display: "inline-block" }}>{" "}{billingDetails.lastName}</p></span>
												</div>
											</div>
											<div className="section">
												<div className="section">
													<div className="subtitle">
														<p>Ship to:</p>
													</div>
													<div className="info">
														<p>{billingDetails.address.line1}</p>
														{billingDetails.address.line2 && <p>{billingDetails.address.line2}</p>}
														<p>{billingDetails.address.city}</p>
														<p>{billingDetails.address.state}</p>
														<p>{billingDetails.address.postal_code}</p>
														<p>{billingDetails.address.country}</p>
													</div>
													<div className="changeDiv">
														<p onClick={() => setActiveStep(0)}>Change</p>
													</div>
												</div>
											</div>
										</YourDetails>
										{activeStep === 1 && (
											<>
												<h3>Select Shipping:</h3>
												<ShippingOptionsDiv>
													<div className="section">
														<Box
															sx={{
																minWidth: 120,
																marginBottom: "15px",
																marginTop: "18px",
																width: "100%",
																flex: 1,
															}}
														>
															{shippingOptions != null &&
																shippingOptions.length > 0 ? (
																<ShippingFormControl
																	onlyOne={shippingOptions.length === 1}
																	style={{ width: "100%", flex: 1 }}
																	fullWidth
																>
																	{shippingOptions.map((s) => {
																		return (
																			<ShippingRadioButton
																				key={s.id}
																				selected={s.id == selectedShipping?.id}
																			>
																				<input
																					type="radio"
																					id={s.id}
																					name="shippingRadio"
																					value={`${s.name} - $${s.price.amount}`}
																					checked={s.id == selectedShipping?.id}
																					onChange={(c) => setSelectedShipping(s)}
																				/>
																				<label className="radio-label">
																					{s.name} - ${s.price.amount}
																				</label>
																			</ShippingRadioButton>
																		);
																	})}
																</ShippingFormControl>
															) : shippingOptions != null &&
																shippingOptions?.length == 0 ? (
																<p>No Shipping Available for this region</p>
															) : (
																<>
																	<Skeleton
																		width="100%"
																		animation="wave"
																		height={53.02}
																		sx={{ margin: "0 0.5rem 0 0" }}
																	/>
																	<Skeleton
																		width="100%"
																		animation="wave"
																		height={53.02}
																		sx={{ margin: "0 0.5rem 0 0" }}
																	/>
																</>
															)}
														</Box>
													</div>
												</ShippingOptionsDiv>
											</>
										)}
									</div>
									{/* // Note the Credit Card Form is here the whole time, just being shown and hidden */}
									<div
										style={{
											visibility: activeStep !== 2 ? "collapse" : "visible",
											position: activeStep !== 2 ? "fixed" : "relative",
											pointerEvents: activeStep !== 2 ? "none" : "auto",
											top: 0,
											left: 0,
											right: 0,
										}}
									>
										<fieldset className="FormGroup">
											<CardField
												onChange={(e) => {
													setError(e.error);
													setCardComplete(e.complete);
												}}
											/>
										</fieldset>
										{error && (
											<ErrorMessage text={"ignoreThis"}>
												{error.message}
											</ErrorMessage>
										)}
										{activeStep !== 0 && activeStep !== 1 && cardComplete && (
											<PaymentStatusDiv error={error !== undefined}>
												<Alert
													sx={{ background: "transparent" }}
													severity={error !== undefined ? "error" : "success"}
													className="inner"
												>
													<PaymentStatus status={payment.status} />
												</Alert>
											</PaymentStatusDiv>
										)}
									</div>
								</div>
							</FormGroupCheckout>
						</CheckoutFormStyle>
						<FooterFormWrapper>
							{activeStep === 0 && (
								<ButtonFooter>
									<div className="footerInner">
										<Button
											style={{
												opacity: fadeForm ? 0 : 1,
												transition: `opacity ${duration / 2}ms ease`,
											}}
											variant="contained"
											color="primary"
											disabled={billingDetailsIncomplete}
											onClick={() => fadeFormFunction(1)}
										>
											To Shipping
										</Button></div>
								</ButtonFooter>
							)}
							{activeStep === 1 && (
								<ButtonFooter>
									<div className="footerInner">
										<Button className="backButton"
											style={{
												opacity: fadeForm ? 0 : 1,
												transition: `opacity ${duration / 2}ms ease`,
											}}
											variant="outlined"
											startIcon={<BsChevronLeft />}
											color="secondary"
											onClick={() => fadeFormFunction(0)}
										>
											Back to Info
										</Button>
										<Button
											style={{
												opacity: fadeForm ? 0 : 1,
												transition: `opacity ${duration / 2}ms ease`,
											}}
											variant="contained"
											color="primary"
											disabled={!selectedShipping}
											onClick={() => fadeFormFunction(2)}
										>
											To Payment
										</Button>
									</div>
								</ButtonFooter>
							)}
							{activeStep === 2 && (

								<ButtonFooter>
									<div className="footerInner">
										<Button className="backButton"
											style={{
												opacity: fadeForm ? 0 : 1,
												transition: `opacity ${duration / 2}ms ease`,
											}}
											variant="outlined"
											color="secondary"
											startIcon={<BsChevronLeft />}
											onClick={() => fadeFormFunction(1)}
										>
											Back to Shipping
										</Button>
										<div

										>
											<SubmitButton
												processing={processing}
												error={errorString}
												disabled={!stripe}
											>
												Pay Now
											</SubmitButton>
										</div>
									</div>
								</ButtonFooter>
							)}
						</FooterFormWrapper>
					</>
				) : (
					<FormRow>
						<div
							className="inner w-100"
							style={{
								minHeight: "500px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<ReceiptPaper
								style={{ opacity: payment.status === "succeeded" ? 1 : 0 }}
								sx={{
									width: "100%",
									height: "100%",
									maxWidth: "760px",
									margin: "0 auto",
								}}
								className="info"
								elevation={4}
							>
								<Titles>
									<h5 className="mx-auto py-3" style={{ color: "grey" }}>
										Receipt <MdOutlineReceiptLong />
									</h5>
								</Titles>
								<Titles>
									<h3
										style={{
											paddingLeft: "2.3rem",
											fontSize: "19px",
											paddingBottom: 0,
										}}
									>
										Shipped To:
									</h3>
								</Titles>
								<div style={{ padding: "2rem" }}>
									<h5
										style={{
											margin: 0,
											padding: "5px",
											color: "rgb(1, 67, 97)",
										}}
									>
										{receiptBillingDetails.firstName}{" "}
										{receiptBillingDetails.lastName}
									</h5>

									<Alert
										variant="outlined"
										severity="info"
										sx={{ marginBottom: "1rem" }}
									>
										<p style={{ margin: 0, padding: "2px" }}>
											{receiptBillingDetails.address.line1}
										</p>
										{receiptBillingDetails.address.line2 !== "" && <p style={{ margin: 0, padding: "2px" }}>
											{receiptBillingDetails.address.line2}
										</p>}
										<p style={{ margin: 0, padding: "2px" }}>
											{receiptBillingDetails.address.city}
										</p>
										{receiptBillingDetails.address.state !== "" &&
											<p style={{ margin: 0, padding: "2px" }}>
												{receiptBillingDetails.address.state}
											</p>
										}
										<p style={{ margin: 0, padding: "2px" }}>
											{receiptBillingDetails.address.postal_code}
										</p>
										<p style={{ margin: 0, padding: "2px" }}>
											{receiptBillingDetails.address.country}
										</p>
									</Alert>
									{/* <Alert variant="outlined" severity="success">
											Your Tracking Number: <br />
											<a href="#">N/A</a>
										</Alert> */}
								</div>
							</ReceiptPaper>

						</div>
					</FormRow>
				)}
			</FormWrapper>
		);
	};

export default CheckoutForm;
