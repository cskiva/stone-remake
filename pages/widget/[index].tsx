import "../../node_modules/video.js/dist/video-js.css";

import { GetServerSideProps } from "next";
import Portal from "../../components/app/portal/Portal";
import React from "react";
import StateChangeTracker from "../../components/global/analytics/StateChangeTracker";
import { projectInfo } from "../../APITypes/ProjectInfo.cs";
import { projectStreamData } from "../../APITypes/ProjectStreamData.cs";

const WidgetPage = (props: { data: projectStreamData, info: projectInfo, pid: string }) => {
	return (
		<div style={{ overflow: "hidden", height: "100%" }}>
			<StateChangeTracker pid={props.pid} data={props.data} meta={props.info} isPortal={true} />
			<Portal
				pid={props.pid}
				data={props.data}
				compact={false}
				lightmode={false}
				video={1}
				meta={props.info}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const mediaApiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL;
	const pid = context.params?.index;
	//console.log("Query = ", `${mediaApiUrl}/stream/${pid}`);
	const result = await fetch(`${mediaApiUrl}/stream/${pid}`);
	const data: projectStreamData = await result.json().catch((err) => {
		console.error(err);
		return null;
	});
	const result2 = await fetch(`${mediaApiUrl}/stream/info/${pid}`).catch((err) => {
		console.error(err);
		return null;
	});
	const info: projectInfo = await result2?.json().catch((err) => {
		console.error(err);
		return null;
	});
	return {
		props: {
			data: data,
			info: info,
			pid: pid,
		},
	};
};

export default WidgetPage;
