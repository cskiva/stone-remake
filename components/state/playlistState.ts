import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./_store";
import { playlistItem } from "../../APITypes/PlaylistItem.cs";
import { segment } from "../../APITypes/Segment.cs";

//import { playlistItem } from "../../APITypes/PlaylistItem.cs";

export const playlistStateSlice = createSlice({
	name: "playlistState",
	initialState: {
		value: {
			isHighlightsOnlyMode: false,
			isFloatMenuVisible: false,
			currentSessionIndex: 0,
			currentSegmentIndex: 0,
			currentSegment: null as segment | null,
			currentPlaylist: [] as playlistItem[],
			currentHighlightIndex: null as number | null,
			showBusinessCard: false,
			isBusinessCardSelected: false
		}
	},
	reducers: {
		setIsHighlightsOnlyMode: (state: { value: { isHighlightsOnlyMode: boolean; }; }, action: PayloadAction<boolean>) => {
			state.value.isHighlightsOnlyMode = action.payload;
		},
		setCurrentSessionIndex: (state: { value: { currentSessionIndex: number; }; }, action: PayloadAction<number>) => {
			console.log("setting currentSessionIndex", action.payload);
			state.value.currentSessionIndex = action.payload;
			console.log("done setting currentSessionIndex", action.payload);
		},
		startNextSession: (state: { value: { currentSessionIndex: number; currentPlaylist: string | any[]; }; }) => {
			if (state.value.currentSessionIndex < state.value.currentPlaylist.length - 1) {
				state.value.currentSessionIndex++;
			}
			else {
				state.value.currentSessionIndex = 0;
			}
		},
		startPreviousSession: (state: { value: { currentSessionIndex: number; }; }) => {
			if (state.value.currentSessionIndex > 0) {
				state.value.currentSessionIndex--;
			}
		},
		setCurrentSegmentIndex: (state: { value: { currentSegmentIndex: number; }; }, action: PayloadAction<number>) => {
			state.value.currentSegmentIndex = action.payload;
		},
		setCurrentHighlightIndex: (state: { value: { currentHighlightIndex: number | null; }; }, action: PayloadAction<number | null>) => {
			state.value.currentHighlightIndex = action.payload;
		},
		setCurrentSegment: (state: { value: { currentSegment: segment | null; }; }, action: PayloadAction<segment | null>) => {
			state.value.currentSegment = action.payload;
		},
		setCurrentPlaylist: (state: { value: { currentPlaylist: playlistItem[]; }; }, action: PayloadAction<playlistItem[]>) => {
			state.value.currentPlaylist = action.payload;
		},
		setShowBusinessCard: (state: { value: { showBusinessCard: boolean; }; }, action: PayloadAction<boolean>) => {
			state.value.showBusinessCard = action.payload;
		},
		setIsBusinessCardSelected: (state: { value: { isBusinessCardSelected: boolean; }; }, action: PayloadAction<boolean>) => {
			state.value.isBusinessCardSelected = action.payload;
		}
	},
});

// Action creators are generated for each case reducer function
export const {
	setIsHighlightsOnlyMode: setIsHighlightsOnlyMode,
	setCurrentSessionIndex: setCurrentSessionIndex,
	setCurrentSegmentIndex: setCurrentSegmentIndex,
	setCurrentSegment: setCurrentSegment,
	startNextSession: startNextSession,
	startPreviousSession: startPreviousSession,
	setCurrentPlaylist: setCurrentPlaylist,
	setCurrentHighlightIndex: setCurrentHighlightIndex,
	setShowBusinessCard: setShowBusinessCard,
	setIsBusinessCardSelected: setIsBusinessCardSelected
} = playlistStateSlice.actions;

// Selectors
export const isHighlightsOnlyMode = (state: RootState) => state.combinedReducer.playlistState.value.isHighlightsOnlyMode;
export const currentSessionIndex = (state: RootState) => state.combinedReducer.playlistState.value.currentSessionIndex;
export const currentSegmentIndex = (state: RootState) => state.combinedReducer.playlistState.value.currentSegmentIndex;
export const currentSegment = (state: RootState) => state.combinedReducer.playlistState.value.currentSegment;
export const currentPlaylist = (state: RootState) => state.combinedReducer.playlistState.value.currentPlaylist;
export const currentHighlightIndex = (state: RootState) => state.combinedReducer.playlistState.value.currentHighlightIndex;
export const showBusinessCard = (state: RootState) => state.combinedReducer.playlistState.value.showBusinessCard;
export const isBusinessCardSelected = (state: RootState) => state.combinedReducer.playlistState.value.isBusinessCardSelected;

export default playlistStateSlice.reducer;

