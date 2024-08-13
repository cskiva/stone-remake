import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
				pageQuery: ctx.query,
				pageUrl: ctx.pathname,
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		}
		finally {
			sheet.seal();
		}
	}
	render() {

		return (
			<Html>
				<Head>
					{/* Google Font Imports */}
					<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet" />

					{/* // The main og tags */}

					<meta property="og:title" content="Write In Stone" />
					<meta property="og:type" content="video" />
					<meta property="og:image" content="/android-chrome-192x192.png" />
					<meta property="og:url" content="http://www.writeinstone.com/" />
					<meta property="og:description" content="Stone creates video bibliographies. Capture evidence and share your process with the world." />

				</Head>
				<body>
					<Main className="documentLevelMainWrapper" />
					<NextScript />
				</body>
			</Html>
		);
	}
}