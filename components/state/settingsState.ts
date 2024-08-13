import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./_store";

export const settingsStateSlice = createSlice({
	name: "settingsState",
	initialState: {
		value: { isFloatMenuVisible: false, isLightMode: false, isMailingListVisible: false, stoneSubscribeFormStatus: 0 }
	},
	reducers: {
		setIsMailingListVisible: (state: { value: { isMailingListVisible: boolean; }; }, action: PayloadAction<boolean>) => {
			state.value.isMailingListVisible = action.payload;
		},
		setIsFloatMenuVisible: (state: { value: { isFloatMenuVisible: boolean; }; }, action: PayloadAction<boolean>) => {
			state.value.isFloatMenuVisible = action.payload;
		},
		setIsLightMode: (state: { value: { isLightMode: boolean; }; }, action: PayloadAction<boolean>) => {
			console.log("Setting Light Mode");

			if (action.payload === true) {
				localStorage.setItem(
					"lightmode",
					"true"
				);
				console.log("Setting Light Mode FROM SETTER TRUE");
				state.value.isLightMode = true;
			}
			else {
				localStorage.setItem(
					"lightmode",
					"false"
				);
				console.log("Setting Light Mode FROM SETTER FALSE");
				state.value.isLightMode = false;
			}
		},
		setStoneSubscribeFormStatus: (state: { value: { stoneSubscribeFormStatus: number; }; }, action: PayloadAction<number>) => {
			state.value.stoneSubscribeFormStatus = action.payload;
		}
	},
});

// Action creators are generated for each case reducer function
export const {
	setStoneSubscribeFormStatus: setStoneSubscribeFormStatus,
	setIsMailingListVisible: setIsMailingListVisible,
	setIsFloatMenuVisible: setIsFloatMenuVisible,
	setIsLightMode: setIsLightMode
} = settingsStateSlice.actions;

// Selectors
export const stoneSubscribeFormStatus = (state: RootState) => state.combinedReducer.settingsState.value.stoneSubscribeFormStatus;
export const isMailingListVisible = (state: RootState) => state.combinedReducer.settingsState.value.isMailingListVisible;
export const isFloatMenuVisible = (state: RootState) => state.combinedReducer.settingsState.value.isFloatMenuVisible;
export const isLightMode = (state: RootState) => state.combinedReducer.settingsState.value.isLightMode;

export default settingsStateSlice.reducer;