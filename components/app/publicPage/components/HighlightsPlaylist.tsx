import {
	BsInfoStyled,
	FindingsDiv,
	HighLights_Playlist_Column,
	HighlightBsPlayFill,
	HighlightsPlaylistItem,
	HighlightsPlaylistItemTitle,
	HighlightsPlaylistStyle,
	NowPlayingTitle,
	ShowInfoButton
} from "../styles/PublicPageStyles";
import React, { useEffect, useState } from "react";
import {
	currentPlaylist,
	currentSegment,
	currentSessionIndex,
	isBusinessCardSelected,
	isHighlightsOnlyMode,
} from "../../../state/playlistState";
import { isPlayerWaiting, setSkipToTime } from "../../../state/videoPlayerState";

import { COLORS } from "../../../styles/colors";
import DIMENSIONS from "../../../styles/GlobalDimensions";
import { IoMdClose } from "react-icons/io";
import PlaybackSettings from "./PlaybackSettings";
import ReactTooltip from "react-tooltip";
import { durationMsToShortString } from "../../../../helpers/helpers";
import { isMobile } from "react-device-detect";
import { projectInfo } from "../../../../APITypes/ProjectInfo.cs";
import { segment } from "../../../../APITypes/Segment.cs";
import { useAppSelector } from "../../../state/hooks";
import { useDispatch } from "react-redux";

export default function HighlightsPlaylist(props: {
	pid: string;
	meta: projectInfo;
	lightmode: boolean;
	windowWidth: number;
	widgetMode: boolean;
}): JSX.Element {
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useDispatch();
	const isHighlightMode = useAppSelector(isHighlightsOnlyMode);
	const nowPlayingSegment = useAppSelector(currentSegment);
	const playList = useAppSelector(currentPlaylist);
	const isPlayerBuffering = useAppSelector(isPlayerWaiting);
	const sessionIndex = useAppSelector(currentSessionIndex);
	const isPlayerBusinessCardSelected = useAppSelector(isBusinessCardSelected);
	// STATES //////////////////////////////////////////////////////////////////////////
	const [isFindingsShowing, setIsFindingsShowing] = useState(false);
	const [prevIndex, SetPrevIndex] = useState(0);
	const [isItemChangingDirection, setItemChangingDirection] = useState("static");

	useEffect(() => {
		changedItem();
	}, [sessionIndex]);

	function ShowInfoButtonRender() {
		return (
			<ShowInfoButton
				descriptionShow={isFindingsShowing}
				lightmode={props.lightmode}
				data-tip={!isFindingsShowing ? "Show Findings" : "Hide Findings"}
				data-for="ShowInfoButtonTooltip"
				onClick={() => {
					setIsFindingsShowing(!isFindingsShowing);
				}}
			>
				<BsInfoStyled lightmode={props.lightmode} />
				{!isMobile && (
					<ReactTooltip className="reactTooltipStyle"
						id="ShowInfoButtonTooltip"
						effect="solid"
						place="top"
						backgroundColor={COLORS.purple.rollover}
					/>
				)}
			</ShowInfoButton>
		);
	}

	function changedItem() {
		//console.log("prevIndex =" + prevIndex);
		//console.log("playerCurrentIndex =" + playerCurrentIndex);
		if ((prevIndex ?? 0) < sessionIndex || sessionIndex == 1) {
			setItemChangingDirection("itemChangingRight");
		}
		if ((prevIndex ?? 0) > sessionIndex) {
			setItemChangingDirection("itemChangingLeft");
		}
		setTimeout(() => {
			setItemChangingDirection("static");
		}, 420);

		SetPrevIndex(sessionIndex);
	}

	return (
		<HighLights_Playlist_Column
			playListMode={playList.length > 1}
			lightmode={props.lightmode}
			className="HighLights_Playlist_Column"
		>
			<FindingsDiv
				lightmode={props.lightmode}
				isFindingsShowing={isFindingsShowing}
			>
				<div
					className="metaDescriptionCloseButtonDiv"
					onClick={() => {
						setIsFindingsShowing(false);
					}}
				>
					<IoMdClose
						className="metaDescriptionCloseButton"
						fill="white"
						size={32}
					/>
				</div>
				<div className="metaDescriptionBody">
					<h4>{props.meta.title}</h4>
					<h5>by {props.meta.authorName}</h5>
					{props.meta.description ? (
						<p
							dangerouslySetInnerHTML={{
								__html: props.meta.description.replace(
									/(?:\r\n|\r|\n)/g,
									"<br>"
								),
							}}
						/>
					) : (
						<>
							<p>...</p>
						</>
					)}
				</div>
			</FindingsDiv>
			<div className="d-flex NewRowForMetaAndTitle">
				<div>{ShowInfoButtonRender()}</div>
				{!isPlayerBusinessCardSelected &&			<NowPlayingTitle
					data-tip={
						props.windowWidth > DIMENSIONS.breakPoints.mobile ? "Session Title" : null
					}
					data-for="NowPlayingTitleTooltip"
					className="NowPlayingTitle"
					lightmode={props.lightmode}
				>
					<span>{playList[sessionIndex]?.title}</span>
					{!isMobile && (
						<ReactTooltip className="reactTooltipStyle"
							id="NowPlayingTitleTooltip"
							effect="float"
							place="top"
							backgroundColor={COLORS.StoneClassyDarkColor}
							borderColor="darkgreen"
						/>
					)}
				</NowPlayingTitle>}
			</div>

			{!isPlayerBusinessCardSelected &&		<HighlightsPlaylistStyle
				lightmode={props.lightmode}
				className="HighlightsPlaylist"
			>
				<div className="line">
					<div className="borderLine" />
					<div className="borderLine" />
				</div>
				{/* Render Highlights List Items */}
				{playList[sessionIndex]?.highlights?.length > 0 ? (
					playList[sessionIndex].highlights.map(
						(s: segment, j: React.Key) =>
							<HighlightsPlaylistItem isPlayerBuffering={isPlayerBuffering} selected={s.id == nowPlayingSegment?.id} lightmode={props.lightmode} key={j}>
								<div className="boundingBoxTrigger"
									data-for={
										props.windowWidth > DIMENSIONS.breakPoints.mobile &&
										"HighlightTooltip"
									}
									data-tip={
										props.windowWidth > DIMENSIONS.breakPoints.mobile &&
										"Play Highlight"
									}
									onClick={() => {
										dispatch(setSkipToTime(isHighlightMode ? s.highlightsOnlyStart : s.start));
									}}
								/>
								<div className="boundingBox">
									<HighlightsPlaylistItemTitle key="j" lightmode={props.lightmode}>
										<span className="title">{s.title}</span>
									</HighlightsPlaylistItemTitle>

									<div className="HighLightStartTime">
										<p>{durationMsToShortString(s.start)}</p>
									</div>
									<div className="HighlightBsPlayFillDiv">
										<HighlightBsPlayFill className="HighlightBsPlayFill" />{" "}
									</div>
									{!isMobile && (
										<ReactTooltip className="reactTooltipStyle"
											id="HighlightTooltip"
											effect="solid"
											place="left"
											backgroundColor={COLORS.StoneClassyDarkColor}
										/>
									)}
								</div>
							</HighlightsPlaylistItem>
					)
				)
					:
					<p style={{ margin: "1.5rem" }}>There are no Highlights to display.</p>
				}
			</HighlightsPlaylistStyle>}
			{!isPlayerBusinessCardSelected &&		<PlaybackSettings
				// CORE PROPS ////////////////////////////////////////////////////
				highlightsArray={playList[sessionIndex]?.highlights}
				playList={playList}
				// MODES & DIMENSIONS ////////////////////////////////////////////
				windowWidth={props.windowWidth}
				widgetMode={props.widgetMode}
				lightmode={props.lightmode}
			/>}
		</HighLights_Playlist_Column>
	);
}
