import { CreateProduct, Product } from "../../APITypes/Product";
import { GroupState, ProductGroup } from "../../APITypes/ProductGroup";
import { ItemSubTitle, ItemTitle, ShirtCardButton, SwatchCircleDiv, SwatchDiv } from "./styles/StoreStyles";
import React, { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { renderSwitch } from "../styles/colors";
import { useSpring } from "react-spring";

interface Props {
	groupState: GroupState;
	group: ProductGroup;
	index: number;
	setVisibleItem: (index: number) => void;
	setColour: (colour: string, group: ProductGroup) => void;
	setMobileViewItemIsSelected?: () => void;
}
const StoreItemCard: React.FC<Props> = ({
	groupState,
	group,
	setColour,
	index,
	setVisibleItem,
	setMobileViewItemIsSelected
}) => {
	const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

	const setCurrentColour = (colour: string): void => {
		setColour(colour, group);
		CreateProduct(group, colour, groupState.currentSize)
			.then((product) => setCurrentProduct(product))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		setCurrentColour(groupState.currentColour ?? "white");
	}, []);

	const [{ x }, set] = useSpring(() => ({ x: -1.5 }));

	return (
		<ShirtCardButton
			style={{ transform: x.to(v => `translateX(${v}%`) }}
			onMouseEnter={() => set({ x: 0 })}
			onMouseLeave={() => set({ x: -1.5 })}
			onClick={() => {
				setVisibleItem(index);
				if (setMobileViewItemIsSelected !== undefined) {
					setMobileViewItemIsSelected();
				}
			}
			}>
			<div

				style={{
					display: "flex",
					justifyContent: "center",
					position: "relative",
					filter: "contrast(1.1)",
				}}
			>
				<Card.Img
					style={{ filter: "drop-shadow(1px 5px 5px #00000050)"}}
					src={currentProduct?.image ?? ""}
				/>
			</div>

			<ItemTitle style={{ textTransform: "capitalize" }}>
				{group.name}
			</ItemTitle>
			<SwatchDiv>
				{group.availableColours.map((color, index) => {
					return <SwatchCircleDiv index={index} length={group.availableColours.length} key={color} background={color.includes("/") ? renderSwitch(color.split("/")[0]) : renderSwitch(color)}>
						<div className="circleSwatch" >
							{color?.includes("/") &&
								<div style={{ position: "absolute", display: "block", height: "100%", width: "50%", left: "50%", top: 0, background: renderSwitch(color?.split("/")[1]) }} />
							}
						</div>
					</SwatchCircleDiv>;
				})}
			</SwatchDiv>
			<Card.Body>
				<ItemSubTitle>
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
		</ShirtCardButton>
	);
};

export default StoreItemCard;
