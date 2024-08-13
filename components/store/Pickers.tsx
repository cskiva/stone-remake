import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ShirtColorOption, ShirtColorSelect } from "./styles/StoreStyles";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { ProductGroup } from "../../APITypes/ProductGroup";
import React from "react";
import ReactTooltip from "react-tooltip";
import { isMobile } from "react-device-detect";
import { renderSwitch } from "./../styles/colors";

export const ColorPicker = (props: {
	color: string;
	setColor: (colour: string) => void;
	availableColours: string[];
	group: ProductGroup;
}) => {

	return (
		<ShirtColorSelect>
			{props.availableColours.map((color, index) => {
				return (
					<div key={index} data-tip={color}
						data-for={`colorPickerTooltip${index}`}>
						<button
							style={{
								background: renderSwitch(color),
								cursor: "pointer",
							}}
							onClick={() => props.setColor(color)}
						>
							<ShirtColorOption
								value={color}
								// For double colours:
								colorFill={renderSwitch(color?.includes("/") ? color?.split("/")[0] : color)}
								inline={false}>
								{/* // For double colours: */}
								{color?.includes("/") &&
									<div style={{ position: "absolute", display: "block", height: "80%", width: "80%", borderRadius: "100%", right: "-40%", top: "-40%", background: renderSwitch(color?.split("/")[1]) }}/>
								}
							</ShirtColorOption>
						</button>
						{!isMobile && (
							<ReactTooltip
								id={`colorPickerTooltip${index}`}
								effect="solid"
								place="bottom"
								html={true}
								className="text-capitalize d-none"
								textColor="black"
								backgroundColor="white" />)}
					</div>
				);
			})}
		</ShirtColorSelect>
	);
};

export const SizePicker = (props: {
	size: string;
	setSize: (size: string) => void;
	availableSizes: string[];
	group: ProductGroup;
}) => {
	return (
		<Box
			sx={{
				minWidth: 120,
				marginBottom: "15px",
				marginTop: "18px",
			}}
		>
			<FormControl fullWidth>
				<InputLabel id="sizeLabel">Size</InputLabel>
				<Select
					sx={{ width: "100%" }}
					label="Size"
					displayEmpty
					value={props.size}
					labelId="sizeLabel"
					onChange={(e: SelectChangeEvent) => props.setSize(e.target.value)}
				>
					{props.availableSizes.map((size) => {
						return (
							<MenuItem key={size} value={size}>
								{size}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
};
