import combinedReducer from "./index";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: { combinedReducer },

	// Setting this and ignoring the setPlayeriInstance removes an error that gets spammed
	// But it will also mean that timetravel on redux is broken. Maybe there is a way around this with a ref?
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ["playerState/setPlayerInstance"],
				// Ignore these field paths in all actions
				ignoredActionPaths: ["meta.arg", "payload.timestamp"],
				// Ignore these paths in the state
				ignoredPaths: ["combinedReducer.playerState.value.playerInstance"],
			},
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch