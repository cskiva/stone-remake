import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./_store";
import { VideoJsPlayer } from "video.js";

export const playerStateSlice = createSlice({
	name: "playerState",
	initialState: {
		value: {
			isPaused: true,
			currentPlaybackTime: 0,
			playerInstance: null as VideoJsPlayer | null,
			skipToTime: -1,
			audioVolumePercent: 100,
			isAudioMuted: false,
			isPlayerWaiting: false,
			isFullScreen: false
		},
	},
	reducers: {
		setIsPaused: (state, action: PayloadAction<boolean>) => {
			state.value.isPaused = action.payload;
		},

		frameForward: (state) => {
			state.value.currentPlaybackTime += msPerFrame;
		},

		frameBack: (state) => {
			state.value.currentPlaybackTime += msPerFrame;
		},

		setCurrentTime: (state, action: PayloadAction<number>) => {
			state.value.currentPlaybackTime = action.payload;
		},

		setSkipToTime: (state, action: PayloadAction<number>) => {
			state.value.skipToTime = action.payload;
		},

		setPlayerInstance: (state, action: PayloadAction<VideoJsPlayer | null>) => {
			if (state.value.playerInstance != null) {
				state.value.playerInstance.dispose();
			}
			state.value.playerInstance = action.payload;
		},

		setAudioVolumePercent: (state, action: PayloadAction<number>) => {
			state.value.audioVolumePercent = Math.min(Math.max(action.payload, 0), 100);
		},

		setIsMuted: (state, action: PayloadAction<boolean>) => {
			state.value.isAudioMuted = action.payload;
		},

		setIsWaiting: (state, action: PayloadAction<boolean>) => {
			state.value.isPlayerWaiting = action.payload;
		},

		setIsFullScreen: (state, action: PayloadAction<boolean>) => {
			console.log("Fullscreen Requested");
			state.value.isFullScreen = action.payload;
		}
	},
});

// Action creators are generated for each case reducer function
export const {
	setIsPaused: setIsPaused,
	frameForward: frameForward,
	frameBack: frameBack,
	setCurrentTime: setCurrentTime,
	setPlayerInstance: setPlayerInstance,
	setSkipToTime: setSkipToTime,
	setAudioVolumePercent: setAudioVolumePercent,
	setIsMuted: setIsMuted,
	setIsWaiting: setIsWaiting,
	setIsFullScreen: setIsFullScreen
} = playerStateSlice.actions;

// Selectors
export const isPaused = (state: RootState) => state.combinedReducer.playerState.value.isPaused;
export const currentTime = (state: RootState) => state.combinedReducer.playerState.value.currentPlaybackTime;
export const playerInstance = (state: RootState) => state.combinedReducer.playerState.value.playerInstance;
export const skipToTime = (state: RootState) => state.combinedReducer.playerState.value.skipToTime;
export const audioVolumePercent = (state: RootState) => state.combinedReducer.playerState.value.audioVolumePercent;
export const isAudioMuted = (state: RootState) => state.combinedReducer.playerState.value.isAudioMuted;
export const isPlayerWaiting = (state: RootState) => state.combinedReducer.playerState.value.isPlayerWaiting;
export const isFullScreen = (state: RootState) => state.combinedReducer.playerState.value.isFullScreen;

export default playerStateSlice.reducer;

//other constants
const msPerFrame = 41;

