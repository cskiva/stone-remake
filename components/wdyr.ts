import React from "react";

if (process.env.NEXT_PUBLIC_DEV === "true") {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const whyDidYouRender = require("@welldone-software/why-did-you-render");
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const ReactRedux = require("react-redux");
	whyDidYouRender(React, {
		trackAllPureComponents: true,
		trackExtraHooks: [
			[ReactRedux, "useAppSelector"]
		]
	});
}