import "../components/wdyr"; // <--- first import
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/styles.scss";

import React, { useEffect } from "react";

import { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { store } from "../components/state/_store";
import theme from "../components/styles/MaterialTheme";

// import { setIsLightMode} from "../components/state/settingsState";
// import { useAppDispatch} from "../components/state/hooks";

// import App from 'next/app'

const mediaApiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL;

// Router.events.on("routeChangeStart", (url) => {
// 	//console.log(`Loading: ${url}`);
// });

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {

	// Redux 

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");

		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.StrictMode>
			<ReduxProvider store={store}>
				<ThemeProvider theme={theme}>
					<>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<Component {...pageProps} />
					</>
				</ThemeProvider>
			</ReduxProvider >
		</React.StrictMode>
	);
}
export default CustomApp;

function TrackEvent(eventName: string, props: Map<string, string>) {
	if (typeof window === "undefined") {
		console.log("Tried to send analytics on the server");
		return;
	}

	if (
		process.env.NEXT_PUBLIC_BASE_URL == "http://localhost:3000" &&
		process.env.NEXT_PUBLIC_SEND_ANALYTICS == undefined || process.env.NEXT_PUBLIC_SEND_ANALYTICS == "false"
	) {
		// console.log("Event ignored: " + eventName);
		if (eventName == "Highlight View PP" || eventName == "Segment View") {
			//console.dir(props);
		}
		return;
	}
	// console.dir(props);

	const json: string[] = [];
	json.push(`{ "EventName": "${eventName}"`);

	props.forEach((value, key) => {
		json.push(`,"${key}":"${value}"`);
	});

	json.push("}");

	const body = json.join("");

	const success = navigator.sendBeacon(`${mediaApiUrl}/telemetry`, body);
	console.log("Event: ", eventName, success ? "sent" : "failed to send");
}

export { TrackEvent };
