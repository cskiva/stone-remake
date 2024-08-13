import {
	BaseDiv,
	BiWebcamStyled,
	CurrentHighlightTitle,
	LoadingSpinner,
	MainVideoDiv,
	PlayerContainerDiv,
	ShareAndViewDiv,
	VideoDiv
} from "../styles/PublicPageStyles";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import React, { useEffect, useRef, useState } from "react";
import {
	currentHighlightIndex,
	currentPlaylist,
	currentSegment,
	currentSessionIndex,
	isBusinessCardSelected,
	setIsBusinessCardSelected,
	startNextSession,
	startPreviousSession
} from "../../../state/playlistState";
import { isAudioMuted, isPaused, isFullScreen as isPlayerFullScreen, playerInstance } from "../../../state/videoPlayerState";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

import { BiReset } from "react-icons/bi";
import BusinessCard from "../../shared/BusinessCard";
import { COLORS } from "../../../styles/colors";
import NextHighlightTimer from "./NextHighlightTimer";
import { VideoJsPlayerPluginOptions } from "video.js";
import VideoPlayer from "../../shared/VideoPlayer";
import { isFloatMenuVisible } from "../../../state/settingsState";
import { playlistItem } from "../../../../APITypes/PlaylistItem.cs";
import { projectInfo } from "../../../../APITypes/ProjectInfo.cs";
import { segment } from "../../../../APITypes/Segment.cs";
import { streamSource } from "../../../../APITypes/StreamSource.cs";
import { useSwipeable } from "react-swipeable";

export default function Carousel(props: {
	// CORE PROPS /////////////////////////////////////////////////////////////
	pid: string;
	meta: projectInfo;
	source: streamSource;
	sessionPlaylist: playlistItem[];
	playList: playlistItem[];
	highlightsArray: segment[];
	videoJsOptions: VideoJsPlayerPluginOptions;
	// MODES AND DIMENSIONS ///////////////////////////////////////////////////
	windowWidth: number;
	lightmode: boolean;
	widgetMode: boolean;
	// GETTERS ////////////////////////////////////////////////////////////////
	isVirginState: boolean;
	isMuted: boolean;
	nextSource: streamSource;
	mobileBump: string;
	// SETTERS ////////////////////////////////////////////////////////////////
	setMobileBump: (mobileBump: string) => void;
	// CALLBACK FUNCTIONS //////////////////////////////////////////////////////
	setHighlightsArray: (highlights: segment[]) => void;
	//////
	bookLink: string;
	patreonLink: string;
	twitterLink: string;
}) {
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useAppDispatch();
	const sessionIndex = useAppSelector(currentSessionIndex);
	const playingSegment = useAppSelector(currentSegment);
	const playingHighlightIndex = useAppSelector(currentHighlightIndex);
	const player = useAppSelector(playerInstance);
	const floatMenuIsVisible = useAppSelector(isFloatMenuVisible);
	const isFullScreen = useAppSelector(isPlayerFullScreen);
	const playerCurrentIndex = useAppSelector(currentSessionIndex);
	const isMuted = useAppSelector(isAudioMuted);
	const isPlayerBusinessCardSelected = useAppSelector(isBusinessCardSelected);
	const playList = useAppSelector(currentPlaylist);
	// REFS ////////////////////////////////////////////////////////////////////
	const videoDiv = useRef(null);
	// USESTATE
	const [prevIndex, SetPrevIndex] = useState(0);
	const [isSwitchingHighlight, setSwitchingHighlight] = useState(false);
	const [itemChangingDirection, setItemChangingDirection] = useState("static");
	const [currentHighlightsArrayLength, setCurrentHighlightsArrayLength] = useState(0);

	// FULLSCREEN //////////////////////////////////////////////////////////////////
	const fullScreenHandler = useFullScreenHandle();

	//
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			dispatch(startNextSession());
		},
		onSwipedRight: () => {
			dispatch(startPreviousSession());
		},
		onSwipeStart: () => {
			if (sessionIndex == 0) {
				props.setMobileBump("Left");
				setTimeout(() => {
					props.setMobileBump("None");
				}, 700);
			}
		},
		preventDefaultTouchmoveEvent: true,
	});

	useEffect(() => {
		console.log("setting fullscreen: ", isFullScreen);
		isFullScreen ? fullScreenHandler.enter() : fullScreenHandler.exit();
	}, [isFullScreen]);

	useEffect(() => {
		changedItem();
	}, [playingHighlightIndex]);

	function changedItem() {
		//console.log("prevIndex =" + prevIndex);
		//console.log("playerCurrentIndex =" + playerCurrentIndex);
		if (playingHighlightIndex !== null) {
			if ((prevIndex ?? 0) < playingHighlightIndex || playingHighlightIndex == 1) {
				setItemChangingDirection("itemChangingRight");
			}

			if ((prevIndex ?? 0) > playingHighlightIndex) {
				setItemChangingDirection("itemChangingLeft");
			}
			setTimeout(() => {
				setItemChangingDirection("static");
			}, 420);

			SetPrevIndex(playingHighlightIndex);
			setCurrentHighlightsArrayLength(playList[sessionIndex].highlights.length);
		}
	}

	function changedHighlightItem() {
		setSwitchingHighlight(true);
		setTimeout(() => {
			setSwitchingHighlight(false);
		}, 500);
	}
	return (
		<PlayerContainerDiv
			lightmode={props.lightmode}
			className="PlayerContainerDiv"
		>
			{/* //Muted Indicator for Mobile */}

			{/* // Chevrons */}
			{props.windowWidth >= 1025 && !isPlayerBusinessCardSelected && (
				<BsChevronLeft
					className="arrows ChevronLeft"
					style={{
						opacity: sessionIndex == 0 ? 0 : 1,
						cursor: sessionIndex == 0 ? "default" : "pointer",
					}}
					onClick={() => {
						dispatch(startPreviousSession());
					}}
					color={props.lightmode ? "grey" : "white"}
				/>
			)}

			<MainVideoDiv {...handlers} className="MainVideoDiv">
				{player == null && <LoadingSpinner offset={0} />}
				<VideoDiv
					floatMenuIsVisible={floatMenuIsVisible}
					className="VideoDiv"
					mobileBump={props.mobileBump}
					lightmode={props.lightmode}
					ref={videoDiv}
				>
					<FullScreen handle={fullScreenHandler}>

						<BusinessCard
							widgetMode={false}
							bookLink={props.bookLink}
							logoUrl={props.meta.logoUrl}
							patreonLink={props.patreonLink}
							twitterLink={props.twitterLink}
							userId={props.meta.authorId}
						/>

						{!isPlayerBusinessCardSelected ? <VideoPlayer
							key={props.source?.src}
							widgetMode={props.widgetMode}
							mobileWidgetMode={false}
							options={props.videoJsOptions}
						/> :
							<VideoPlayer
								options={{
									muted: isMuted,
									controls: true,
									autoplay: playerCurrentIndex === 0 ? false : true,
									sources: [
										{
											src: props.meta.merchandiseVideoUrl,
											type: "video/mp4",
										},
									],
								}}
								widgetMode={props.widgetMode}
								mobileWidgetMode={false}
							/>}
					</FullScreen>

					{player != null && (
						<BaseDiv lightmode={props.lightmode} playing={false}>
							<div className="d-flex align-items-center justify-content-center">
								{isPlayerBusinessCardSelected && <BiWebcamStyled color={COLORS.purple.rollover} />}
								{playingHighlightIndex != null && !isPlayerBusinessCardSelected ? (<BiWebcamStyled color={COLORS.purple.rollover} />) : <BiWebcamStyled color="transparent" />}
								{playingHighlightIndex != null && !isPlayerBusinessCardSelected ? (
									<>
										<h5
											style={{
												margin: 0,
												padding: 0,
												marginLeft: "1rem",
											}}
										>
											{playingHighlightIndex + 1}
										</h5>
										<h5 style={{ margin: 0, padding: 0 }}>/</h5>
										<h5 style={{ margin: 0, padding: "0 6px 0 0" }}>
											{currentHighlightsArrayLength}
										</h5>
									</>
								) : <div className="d-flex align-items-center justify-content-center" style={{ width: "37px" }}> <p style={{ margin: 0, padding: 0 }}>. . .</p> </div>}
							</div>
							<CurrentHighlightTitle
								switching={isSwitchingHighlight}
							>
								{!isPlayerBusinessCardSelected ? playingSegment?.isHighlight
									? playingSegment.title
									: props.playList[sessionIndex]?.title : props.meta.authorName}
							</CurrentHighlightTitle>
							<div className="metaForTitle">
								{/* <NextHighlightTimer highlightsArray={props.highlightsArray}></NextHighlightTimer> */}
							</div>
						</BaseDiv>
					)}

					<ShareAndViewDiv
						lightmode={props.lightmode}
						playing={false}
					>
						<h4>132</h4> <h4>views</h4>
					</ShareAndViewDiv>
				</VideoDiv>
			</MainVideoDiv>

			{props.windowWidth >= 1025 && (
				!isPlayerBusinessCardSelected ?	<BsChevronRight
					onClick={() => {
						dispatch(startNextSession());
					}}
					style={{
						opacity: sessionIndex + 1 == props.playList.length ? 0.3 : 1,
						cursor:
							sessionIndex + 1 == props.playList.length
								? "default"
								: "pointer",
					}}
					className="arrows ChevronRight"
					color={props.lightmode ? "grey" : "white"}
				/> :
					<BiReset
						onClick={() => {
							dispatch(setIsBusinessCardSelected(false));
						}}
						style={{
							opacity: sessionIndex + 1 == props.playList.length ? 0.3 : 1,
							cursor:
								sessionIndex + 1 == props.playList.length
									? "default"
									: "pointer",
						}}
						className="arrows ChevronRight"
						color={props.lightmode ? "grey" : "white"}
					/>
			)}
		</PlayerContainerDiv>
	);
}

