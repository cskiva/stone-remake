import cartState from "./cartState";
import { combineReducers } from "redux";
import playerState from "./videoPlayerState";
import playlistState from "./playlistState";
import settingsState from "./settingsState";

export default combineReducers({
	playerState,
	playlistState,
	settingsState,
	cartState,
});