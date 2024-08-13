import "../../../node_modules/video.js/dist/video-js.css";

import React, { useEffect } from "react";
import {
	isFloatMenuVisible,
	isLightMode,
	setIsLightMode
} from "../../../components/state/settingsState";
import {
	useAppDispatch,
	useAppSelector
} from "../../../components/state/hooks";

import DIMENSIONS from "../../../components/styles/GlobalDimensions";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NavbarStone from "../../../components/global/layout/Navbar";
import NoProject from "../../../public/images/SVG/noProject.svg";
import PublicPageComponent from "../../../components/app/publicPage/PublicPageComponent";
import ShareMenu from "../../../components/app/publicPage/components/ShareMenu/ShareMenu";
import StateChangeTracker from "../../../components/global/analytics/StateChangeTracker";
import { projectInfo } from "../../../APITypes/ProjectInfo.cs";
import { projectStreamData } from "../../../APITypes/ProjectStreamData.cs";
import useWindowDimensions from "../../../helpers/GetWindowDimensions";

// Note: We Are Setting the Head Here Including oEmbed

const BaseDomainURL = process.env.NEXT_PUBLIC_BASE_URL;
const fetchRetryDelay = 500;

const getOembedUrl = (pid: string) => {
	return `${BaseDomainURL}/api/oembed?url=${encodeURIComponent(
		`${BaseDomainURL}/widget/${pid}`
	)}`;
};

function PublicPage(props: {
	data: projectStreamData;
	info: projectInfo;
	pid: string;
	html: string;
	source: string;
	setURLcurrentIndex: number;
}) {
	// Redux
	const dispatch = useAppDispatch();
	const floatMenuIsVisible = useAppSelector(isFloatMenuVisible);
	const lightMode = useAppSelector(isLightMode);

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (localStorage.getItem("lightmode") === "true") {
				dispatch(setIsLightMode(true));
				console.log("Setting Light Mode FROM LOCAL TRUE");
			}
		}
	}, []);
	//
	const { height: windowHeight, width: windowWidth } = useWindowDimensions();

	if (!props.data && !props.info && !props.html) {
		return (
			<>
				<Head>
					<title>Write In Stone - Project Not Found</title>
				</Head>
				<NavbarStone
					showCart={false}
					showSettings
					meta={props.info}
					landingPage={false}
					ProjectTitle="Not found"
					checkout={false}
				></NavbarStone>
				<div
					style={{
						height: `calc(100vh - ${DIMENSIONS.heights.navbar.standard}px)`,
					}}
					className="w-100 d-flex flex-column justify-content-center align-items-center"
				>
					<NoProject width="300" className="my-5" />
					<h1 style={{ color: "grey" }}>404</h1>
					<b>this project appears to have been deleted</b>
				</div>
			</>
		);
	}

	const oEmbedURL = getOembedUrl(props.pid);

	return (
		<>
			<style jsx global>{`
        div#__next {
          position: fixed;
        }
      `}</style>
			<Head>
				<title>
					{props.info?.title} - Write In Stone - by {props.info?.authorName}
				</title>
				<link
					rel="alternate"
					type="application/json+oembed"
					href={oEmbedURL}
					title="Write In Stone"
				/>
			</Head>
			<StateChangeTracker
				pid={props.pid}
				data={props.data}
				meta={props.info}
				isPortal={false}
			/>
			<NavbarStone
				showSettings
				meta={props.info}
				landingPage={false}
				ProjectTitle={props.info?.title}
				showCart={false}
				checkout={false}
			></NavbarStone>
			{floatMenuIsVisible && <ShareMenu pid={props.pid} meta={props.info} html={props.html} />}
			<PublicPageComponent
				pid={props.pid}
				data={props.data}
				widgetMode={false}
				windowWidth={windowWidth ?? 0}
				windowHeight={windowHeight ?? 0}
				lightmode={lightMode}
				setURLcurrentIndex={
					props.setURLcurrentIndex ? props.setURLcurrentIndex : 1
				}
				meta={props.info}
				baseUrl={BaseDomainURL ?? ""}
				linkSource={props.source}
			/>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const mediaApiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL;

	//console.log("pid", context.params?.pid);

	const [result, result2, result3] = await Promise.all([
		fetchRetry(
			`${mediaApiUrl}/stream/${context.params?.pid}`,
			fetchRetryDelay,
			3
		),
		fetchRetry(
			`${mediaApiUrl}/stream/info/${context.params?.pid}`,
			fetchRetryDelay,
			3
		),
		fetchRetry(
			`${mediaApiUrl}/stream/${context.params?.pid}/html`,
			fetchRetryDelay,
			3
		),
	]);
	const [data, info, html] = await Promise.all([
		result.json().catch((): projectStreamData | null => {
			return null;
		}),
		result2.json().catch((): projectInfo | null => {
			return null;
		}),
		result3.json().catch((): string | null => {
			return null;
		}),
	]);

	//console.log("data", data);

	return {
		props: {
			pid: context.params?.pid,
			source: context.query?.source ?? null,
			data: data,
			info: info,
			html: html?.html ?? null,
		},
	};
};

function wait(delay: number) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

async function fetchRetry(
	url: string,
	delay: number,
	tries: number,
	fetchOptions = {}
): Promise<Response> {
	async function onError(err: unknown): Promise<Response> {
		const triesLeft = tries - 1;
		if (triesLeft < 0) {
			throw err;
		}
		await wait(delay);
		return await fetchRetry(url, delay, triesLeft, fetchOptions);
	}
	try {
		return await fetch(url, fetchOptions);
	}
	catch (err_1: unknown) {
		return onError(err_1);
	}
}

export default PublicPage;
