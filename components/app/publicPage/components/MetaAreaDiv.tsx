import "../../../../node_modules/video.js/dist/video-js.css";

import { BiWebcamStyled, MetaArea } from "../styles/PublicPageStyles";

import { AiOutlineClockCircle } from "react-icons/ai";
import {COLORS} from "../../../styles/colors";
import DIMENSIONS from "../../../styles/GlobalDimensions";
import { MdOutlineOndemandVideo } from "react-icons/md";
import React from "react";
import { Skeleton } from "@mui/material";
import { durationMsToShortString } from "../../../../helpers/helpers";
import { projectInfo } from "../../../../APITypes/ProjectInfo.cs";

export default function MetaAreaDiv(props: {
	pid: string;
	meta: projectInfo;
	lightmode: boolean;
	windowWidth: number;
	widgetMode: boolean;
}) {
	const skeletonHeight = 32;
	if (!props.meta == null || !props.windowWidth) {
		return (
			// LOADING ANIMATION ////////////////////////////////////////////////////////
			<MetaArea
				lightmode={props.lightmode}
				key="1"
				style={{
					paddingLeft: "1.42rem",
				}}
			>
				<div
					style={{
						position: "relative",
						top: " 9px",
						display: "flex",
					}}
				>
					<Skeleton
						className="skeleton"
						variant="rectangular"
						height={skeletonHeight}
						width={160}
					/>
					<Skeleton
						className="skeletonSmall"
						variant="rectangular"
						height={skeletonHeight}
						width={48}
					/>
					<Skeleton
						className="skeleton"
						variant="rectangular"
						height={skeletonHeight}
						width={50}
					/>
					<Skeleton
						className="skeletonSmall"
						variant="rectangular"
						height={skeletonHeight}
						width={28}
					/>
					<Skeleton
						className="skeleton"
						variant="rectangular"
						height={skeletonHeight}
						width={89}
					/>
					<Skeleton
						className="skeletonSmall"
						variant="rectangular"
						height={skeletonHeight}
						width={28}
					/>
					<Skeleton
						className="skeleton"
						variant="rectangular"
						height={skeletonHeight}
						width={110}
					/>
					<Skeleton
						className="skeletonSmall"
						variant="rectangular"
						height={skeletonHeight}
						width={38}
					/>
				</div>
			</MetaArea>
		);
	}
	else if (props.windowWidth) {
		return (
			// MAIN RENDER ////////////////////////////////////////////////////////////////
			<MetaArea className="MetaAreaDiv" lightmode={props.lightmode} key="2">
				<h5>
					<>
						<span className="researchDuration spanWithMargin">
							Research Duration : {""}
							<span
								style={{
									color: props.lightmode
										? COLORS.purple.rollover
										: COLORS.mellowYellow,
								}}
							>
								{props.meta.minutes} minutes
							</span>
						</span>

						{props.windowWidth < DIMENSIONS.breakPoints.mobile && (
							<div style={{ flex: 1 }} />
						)}

						{props.meta.events > 1 ? (
							<span className="spanWithMargin">
								{props.windowWidth > DIMENSIONS.breakPoints.mobile ? (
									"Events : "
								) :

									<MdOutlineOndemandVideo
										color={COLORS.StoneLightWhiteGrey}
										size={19}
										style={{ marginRight: "0.5rem", marginTop: "-4px" }}
									/>
								}
								<span
									style={{
										color: props.lightmode
											? COLORS.purple.rollover
											: COLORS.mellowYellow,
									}}
								>
									{props.meta.events}
								</span>

							</span>
						) : (
							<span className="spanWithMargin">
								{props.windowWidth > DIMENSIONS.breakPoints.mobile ? (
									"1 Event"
								) : null}
							</span>
						)}
						<span className="spanWithMargin">
							<span>
								{props.windowWidth > DIMENSIONS.breakPoints.mobile ? (
									`Highlight${props.meta.highlights > 1 && "s"} : `
								) : (
									<BiWebcamStyled
										color={COLORS.StoneLightWhiteGrey}
										size={19}
										style={{
											marginLeft: "-0.7rem",
											marginRight: "1rem",
											marginTop: "-4px",
										}}
									/>
								)}
							</span>
							<span
								style={{
									color: props.lightmode
										? COLORS.purple.rollover
										: COLORS.mellowYellow,
								}}
							>
								{props.meta.highlights}
							</span>
						</span>
						<span>
							<span className="spanWithMargin">
								{props.windowWidth > DIMENSIONS.breakPoints.mobile ? (
									"Playback Time : "
								) : (
									<AiOutlineClockCircle
										color={COLORS.StoneLightWhiteGrey}
										size={19}
										style={{ marginRight: "0.15rem", marginTop: "-4px" }}
									/>
								)}
								<span
									style={{
										color: props.lightmode
											? COLORS.purple.rollover
											: COLORS.mellowYellow,
									}}
								>
									{durationMsToShortString(props.meta.playbackDurationMs, true)}
								</span>
							</span>
						</span>
					</>
				</h5>
			</MetaArea>
		);
	}
	return null;
}
