import { COLORS, renderSwitch } from "../styles/colors";
import { Card, Col } from "react-bootstrap";
import { ColorPicker, SizePicker } from "./Pickers";
import { CreateProduct, Product } from "../../APITypes/Product";
import { GroupState, ProductGroup } from "../../APITypes/ProductGroup";
import {
	ItemSubTitle,
	ItemTitle,
	ShirtButton,
	ShirtCard,
	ShirtPageRow
} from "./styles/StoreStyles";
import React, { useEffect, useState } from "react";
import { addProduct, setShoppingCartOpen } from "../state/cartState";

import { FaShoppingCart } from "react-icons/fa";
import NumberFormat from "react-number-format";
import { useAppDispatch } from "../state/hooks";

interface Props {
	groupState: GroupState;
	group: ProductGroup;
	setSize: (size: string, group: ProductGroup) => void;
	setColour: (colour: string, group: ProductGroup) => void;
	mobileView?: boolean;
}
const StoreItemPage: React.FC<Props> = ({
	groupState,
	group,
	setSize,
	setColour,
	mobileView
}) => {
	const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useAppDispatch();

	const setCurrentSize = (size: string): void => {
		setSize(size, group);
		CreateProduct(group, groupState.currentColour, size)
			.then((product) => setCurrentProduct(product))
			.catch((err) => console.log(err));
	};

	const setCurrentColour = (colour: string): void => {
		setColour(colour, group);
		CreateProduct(group, colour, groupState.currentSize)
			.then((product) => setCurrentProduct(product))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		//console.log("groupState" + JSON.stringify(groupState));
		//console.log("group" + JSON.stringify(group));
		setCurrentColour(groupState.currentColour ?? "white");
	}, []);

	function sizeAsText(size: string) {
		switch (size) {
			case "Youth XS":
				return "X Small";
			case "Youth S":
				return "Small";
			case "Youth M":
				return "Medium";
			case "Youth L":
				return "Large";
			case "Youth XL":
				return "X Large";
			case "S":
				return "Small";
			case "M":
				return "Medium";
			case "L":
				return "Large";
			case "XL":
				return "X large";
			case "XXL":
				return "XX large";
			default:
				return size;
		}
	}

	return (
		<ShirtPageRow>
			<Col xs={12} md={6}>
				<ShirtCard pageVersion
				>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							position: "relative",
							filter: "contrast(1.1)",
						}}
					>
						<Card.Img
							style={{
								filter: "saturate(1.2) brightness(1.1) drop-shadow(1px 5px 5px #00000050)"
							}}
							src={currentProduct?.image ?? ""}
						/>
					</div>

				</ShirtCard>
			</Col>

			<Col
				style={{
					position: "relative",
					justifyContent: "center",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
				}}
			>
				<div className="wrapperShirtPageRow">
					<ItemTitle style={{ textTransform: "capitalize" }}>
						{group.name}
					</ItemTitle>
					<div style={{ width: "100%", display: "flex" }}>
						{groupState.currentSize != "One Size" ? (
							<ItemSubTitle
								style={{
									textTransform: "capitalize",
									marginRight: "20px",
									border: "solid 2px black",
									padding: "8px",
									position: "relative",
									top: "-12px",
									borderRadius: "4px",
								}}
							>
								{sizeAsText(groupState.currentSize)}
							</ItemSubTitle>
						) : null}
						<ItemSubTitle
							style={{ textTransform: "capitalize", position: "relative" }}
						>
							<span>
								{groupState.currentColour}
								<span
									style={{
										background: renderSwitch(groupState.currentColour),
										padding: "5px",
										borderRadius: "9px",
										width: "18px",
										height: "18px",
										display: "block",
										position: "absolute",
										right: "-20px",
										top: 0,
									}}
								/>
							</span>
						</ItemSubTitle>
					</div>
					<Card.Body>
						<ItemSubTitle style={{ textTransform: "capitalize" }}>
							<NumberFormat
								prefix="$"
								displayType="text"
								decimalScale={2}
								fixedDecimalScale
								value={group.price / 100}
							/>
							<span
								style={{ fontSize: "13px", marginLeft: "5px" }}
							>
								USD
							</span>
						</ItemSubTitle>
					</Card.Body>
					<SizePicker
						size={groupState.currentSize as string}
						setSize={setCurrentSize}
						availableSizes={group.availableSizes as string[]}
						group={group}
					/>
					<ColorPicker
						color={groupState.currentColour}
						setColor={setCurrentColour}
						availableColours={group.availableColours}
						group={group}
					/>
					<ShirtButton
						invert={false}
						disabled={group.printerId == null}
						style={{
							width: "240px",
							margin: "40px 0 0 3px",
							marginBottom: mobileView ? "30px" : "3px"
						}}
						onClick={() => {
							dispatch(setShoppingCartOpen(true));
							currentProduct && dispatch(addProduct(currentProduct));
						}}
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
							<span>Add to Cart</span>
							<div className="tipple">
								<div className="tippleCircle" />
							</div>
						</div>
					</ShirtButton>
				</div>

				{group.printerId == null && (
					<span style={{ color: COLORS.IndianRed, margin: "0 auto" }}>
						Item not yet available for purchase
					</span>
				)}
			</Col>
		</ShirtPageRow>
	);
};

export default StoreItemPage;
