import "../../../node_modules/video.js/dist/video-js.css";

import {
	AlternatingCallToActionStyle,
	BiWebcamStyled,
	BigPlayButton,
	BigPlayButtonContainer,
	CallToActionText,
	CgScreenStyled,
	ChevronLeft,
	ChevronRight,
	CircleCallToactionDiv,
	LogoChrome,
	LogoInPortal,
	LogoTextStyled,
	MetaArea,
	MutedIndicator,
	NoProject404Div,
	PatreonBlock,
	PlayerAndHighlightFlexDiv,
	PlayerContainerDiv,
	PlayerWeb,
	PlayerWebWrapper,
	PortalWrapper,
	SeeResearchBlock,
	TwitterBlock,
	WidgetTitleOfHighlight
} from "./styles/PortalStyles";
import {
	BsChevronLeft,
	BsChevronRight,
	BsFilePerson,
	BsPlayFill
} from "react-icons/bs";
import { FaPatreon, FaTwitter } from "react-icons/fa";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import React, { useEffect, useRef, useState } from "react";
import {
	currentSessionIndex,
	setCurrentPlaylist,
	setCurrentSessionIndex,
	setIsHighlightsOnlyMode,
	setShowBusinessCard,
	showBusinessCard,
	startNextSession,
	startPreviousSession
} from "../../state/playlistState";
import {
	isAudioMuted,
	isFullScreen,
	isPaused,
	playerInstance,
	setIsMuted
} from "../../state/videoPlayerState";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

import { AiOutlineClockCircle } from "react-icons/ai";
import BusinessCard from "../shared/BusinessCard";
import Button from "@material-ui/core/Button";
import { COLORS } from "../../styles/colors";
import DIMENSIONS from "../../styles/GlobalDimensions";
import { ImVolumeMute2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import NoProject from "../../../public/images/SVG/noProject.svg";
import ReactTooltip from "react-tooltip";
import { TrackEvent } from "../../../pages/_app";
import { VideoJsPlayerPluginOptions } from "video.js";
import VideoPlayer from "../shared/VideoPlayer";
import { durationMsToShortString } from "../../../helpers/helpers";
import { getIcon } from "../../../helpers/helpers";
import { isMobile } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import { projectInfo } from "../../../APITypes/ProjectInfo.cs";
import { projectStreamData } from "../../../APITypes/ProjectStreamData.cs";
import { useMeasure } from "react-use";
import { useSwipeable } from "react-swipeable";
import useWindowDimensions from "../../../helpers/GetWindowDimensions";

// import HoverRating from '../components/HoverRating';

const useStyles = makeStyles((theme) => ({
	buttonContact: {
		margin: theme.spacing(8),
		width: 130,
		height: 50,
		"&:hover": {
			backgroundColor: COLORS.StoneCadenceGreen,
			color: "#FFF",
		},
	},
}));

export default function Portal(props: {
	pid: string;
	video: number;
	data: projectStreamData;
	lightmode: boolean;
	compact: boolean;
	meta: projectInfo;
}) {
	// Redux
	const dispatch = useAppDispatch();
	const currentIndex = useAppSelector(currentSessionIndex);
	const player = useAppSelector(playerInstance);
	const isPlayerPaused = useAppSelector(isPaused);
	const isMuted = useAppSelector(isAudioMuted);
	const isPlayerFullscreen = useAppSelector(isFullScreen);
	const portalShowBusinessCard = useAppSelector(showBusinessCard);

	dispatch(setIsHighlightsOnlyMode(false));

	//console.log("info", props.meta);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const BaseDomainURL = process.env.NEXT_PUBLIC_BASE_URL;
	//
	const classes = useStyles();

	// This is the actual mechanism for switching fullscreen
	const fullScreenHandler = useFullScreenHandle();
	//

	const [wasBusinessCardShown, setWasBusinessCardShown] = useState<boolean>(false);
	const [isBusinessCardPlaying, setisBusinessCardPlaying] = useState<boolean>(false);

	const [playerWeb, { width: playerWebWidth }] = useMeasure<HTMLDivElement>();
	const playlist = props.data.highlightVideos;

	const videoDiv = useRef<HTMLDivElement>(null);

	const [mobileBump, setMobileBump] = useState<string>("");

	const [lightmode, setLightMode] = useState<boolean>(props.lightmode);

	const [leftCalltoActionShowing, setLeftCallToActionShowing] = useState(false);

	const compact = props.compact;

	const [source, setSource] = useState(
		playlist && playlist[currentIndex]?.highlightsOnlyStream
	);

	//const [rolloverTimeline, setRollOverTimeline] = useState(false);
	const [rolloverWrapper, setRolloverWrapper] = useState(false);

	const [videoJsOptions, setVideoJsOptions] =
		useState<VideoJsPlayerPluginOptions>({
			muted: false,
			normalizeAutoplay: true,
			autoplay: currentIndex === 0 ? false : true,
			sources: [
				{
					src: source?.src,
					type: source?.type,
				},
			],
		});

	const currentPlaylistItem = useRef<HTMLDivElement>(null);

	const { height: windowHeight, width: windowWidth } = useWindowDimensions(); // This is backwards (should be width, height). Please check

	const [iconUrl1, setIconUrl1] = useState("");
	const [iconUrl2, setIconUrl2] = useState("");
	//const [iconUrl3, setIconUrl3] = useState("");
	const [domain1, setDomain1] = useState("");
	const [domain2, setDomain2] = useState("");
	//const [domain3, setDomain3] = useState("");

	// triggers

	// Setter
	const [trigger, setTrigger] = useState(0);

	//
	const [isMouseOverLink, setIsMouseOverLink] = useState(false);

	const IsMerchEnabled = () => {
		return !wasBusinessCardShown
			&& player != null
			&& props.meta.enableMerchandiseScreen
			&& (
				(bookLink && bookLink.length > 5)
				|| (props.meta.merchandiseVideoUrl && props.meta.merchandiseVideoUrl.length > 5)
				|| (props.meta.logoUrl && props.meta.logoUrl.length > 5)
			);
	};

	const twitterLink =
		props?.meta?.socialAccount2 &&
		"https://" +
		props?.meta?.socialAccount2
			?.replace("https://", "")
			.replace("http://", "");
	const patreonLink =
		props?.meta?.socialAccount1 &&
		"https://" +
		props?.meta?.socialAccount1
			?.replace("https://", "")
			.replace("http://", "");

	// const subscribeLink =
	// 	props?.meta?.socialAccount3 &&
	// 	"https://" +
	// 	props?.meta?.socialAccount3
	// 		?.replace("https://", "")
	// 		.replace("http://", "");
	// const merchLink =
	// 	props?.meta?.merchandiseLink1 &&
	// 	"https://" +
	// 	props?.meta?.merchandiseLink1
	// 		?.replace("https://", "")
	// 		.replace("http://", "");
	const bookLink =
		props?.meta?.merchandiseLink2 &&
		"https://" +
		props?.meta?.merchandiseLink2
			?.replace("https://", "")
			.replace("http://", "");

	const getDomainWithoutSuffix = async (s: string): Promise<string> => {
		if (!s) {
			return "";
		}
		const url = (new URL(s));
		let hostName = url.hostname;
		hostName = hostName.replace(/^www\./, "");
		return hostName;
	};

	let isFirstLoad = false;

	useEffect(() => {
		console.log("Setting icons");
		const getIconAsync = async () => {
			// get the data from the api
			setIconUrl1(await getIcon(twitterLink));
			setIconUrl2(await getIcon(patreonLink));
			//setIconUrl3(await getIcon(props.bookLink));
			setDomain1(await getDomainWithoutSuffix(twitterLink));
			setDomain2(await getDomainWithoutSuffix(patreonLink));
		};

		getIconAsync();

	}, []);

	useEffect(() => {
		console.log("iconUrl1", iconUrl1);
		console.log("iconUrl2", iconUrl2);
		//console.log("iconUrl3", iconUrl3);
	}, [iconUrl1, iconUrl2]);

	useEffect(() => {
		isFirstLoad = true;
		console.log("props.meta" + JSON.stringify(props.meta));
	}, []);

	// Fullscreen trigger
	useEffect(() => {
		if (isFirstLoad) {
			return;
		}
		console.log("setting fullscreen: ", isFullScreen);
		isPlayerFullscreen ? fullScreenHandler.enter() : fullScreenHandler.exit();
		if (isPlayerFullscreen) {
			document
				.getElementsByClassName("vjs-writeInStone")[0]
				.classList.add("vjs-writeInStone-fullscreen");
			screen.orientation.lock("landscape").catch((e) => console.log(e));
		}
		else {
			document
				.getElementsByClassName("vjs-writeInStone")[0]
				.classList.remove("vjs-writeInStone-fullscreen");
			if (isMobile) {
				screen.orientation.lock("any");
			}
		}
	}, [isPlayerFullscreen]);

	useEffect(() => {
		if (!playlist) {
			return;
		}

		dispatch(setCurrentPlaylist(playlist));
		if (patreonLink || twitterLink) {
			UpdateCallToAction(trigger);
		}

		TrackEvent(
			"Widget View",
			new Map([
				["Title", props.meta.title],
				["ID", props.pid],
				["Author ID", props.meta.authorId],
				["Author Name", props.meta.authorName],
			])
		);

		const fullScreen = (event: Event) => {
			// document.fullscreenElement will point to the element that
			// is in fullscreen mode if there is one. If there isn't one,
			// the value of the property is null.
			if (document.fullscreenElement) {
				console.log(
					`Element: ${document.fullscreenElement.id} entered full-screen mode.`
				);
			}
		};

		document.addEventListener("fullscreenchange", fullScreen);

		return () => {
			document.removeEventListener("fullscreenchange", fullScreen);
		};
	}, []);

	useEffect(() => {
		// Overflow Effect for Mobile Scroll
		if (currentIndex > 0) {
			setMobileBump("None");
		}
	});

	// The Initialization of the playlist

	// Set LightMode on Switch - Not Sure if this is needed.

	useEffect(() => {
		setLightMode(props.lightmode);
	}, [props.lightmode]);

	useEffect(() => {
		if (!playlist) {
			return;
		}

		const nextSource = playlist[currentIndex]?.highlightsOnlyStream;

		if (currentIndex == 1 && IsMerchEnabled()) {
			console.log("attempting to play  video at ", props.meta.merchandiseVideoUrl);
			let videoUrl;
			if (props.meta.merchandiseVideoUrl != null && props.meta.merchandiseVideoUrl.length > 5) {
				videoUrl = props.meta.merchandiseVideoUrl;
			}
			else {
				videoUrl = "https://application-downloads.azurewebsites.net/nothing.mp4";
			}
			setVideoJsOptions({
				muted: isMuted,
				// Hide Controls on Business Card
				controls: false,
				normalizeAutoplay: true,
				autoplay: true,
				sources: [
					{
						src: videoUrl,
						type: "video/mp4",
					},
				],
			});

			setSource({
				src: videoUrl,
				type: "video/mp4",
			});

			setWasBusinessCardShown(true);
			setisBusinessCardPlaying(true);
			dispatch(setShowBusinessCard(true));
			return;
		}

		if (isBusinessCardPlaying) {
			console.log("done playing merchandise video ", currentIndex);
			dispatch(setCurrentSessionIndex(1));
			setisBusinessCardPlaying(false);
			dispatch(setShowBusinessCard(false));
			return;
		}

		if (currentIndex == 1 && wasBusinessCardShown) {
			setWasBusinessCardShown(false);
		}

		console.log("playing next session ", currentIndex);

		setVideoJsOptions({
			muted: isMuted,
			normalizeAutoplay: true,
			autoplay: currentIndex === 0 ? false : true,
			sources: [
				{
					src: nextSource?.src,
					type: nextSource?.type,
				},
			],
		});

		setSource(nextSource);
		/// scroll in timeline
		scrollToCurrentElement();
	}, [currentIndex]);

	const scrollToCurrentElement = () => {
		currentPlaylistItem.current?.scrollIntoView({ behavior: "smooth" });
		if (typeof window !== undefined) {
			window.scrollTo(0, 0);
		}
	};

	const playerPlaylistSeek = (s: string) => {
		if (s == "prev" && currentIndex > 0) {
			dispatch(startPreviousSession());
		}
		else if (s == "next") {
			dispatch(startNextSession());
		}
	};

	const unMuteButton = (e: React.MouseEvent<Element, MouseEvent>) => {
		dispatch(setIsMuted(!isMuted));
	};

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			playerPlaylistSeek("next");
		},
		onSwipedRight: () => {
			playerPlaylistSeek("prev");
		},
		onSwipeStart: (dir) => {
			if (currentIndex == 0) {
				console.log("We've reached the start, we Swiped:" + dir);
				setMobileBump("Left");
				setTimeout(() => {
					setMobileBump("None");
				}, 700);
			}
		},
		preventDefaultTouchmoveEvent: true,
	});

	function useInterval(callback: () => void, delay: number) {
		const savedCallback = useRef<() => void>();

		// Remember the latest callback.
		useEffect(() => {
			savedCallback.current = callback;
		}, [callback]);

		// Set up the interval.
		useEffect(() => {
			function tick() {
				if (savedCallback.current != undefined) {
					savedCallback.current();
				}
			}
			if (delay !== null) {
				const id = setInterval(tick, delay);
				return () => clearInterval(id);
			}
		}, [delay]);
	}

	const playPauseFunction = () => {
		console.log("click");
		if (isPlayerPaused) {
			player?.play();
		}
		else {
			player?.pause();
		}
	};

	const doubleButtonBreakpoint = 800;

	if (patreonLink || twitterLink) {
		const interval =
			windowWidth !== null && windowWidth > doubleButtonBreakpoint
				? 4200
				: 3200;
		useInterval(() => {
			UpdateCallToAction(trigger);
		}, interval);
	}

	/// Increment call to action trigger
	const UpdateCallToAction = (lastValue: number) => {
		{
			let tempValue = lastValue + 1;
			if (!isMouseOverLink) {
				if (
					windowWidth !== null &&
					windowWidth > doubleButtonBreakpoint &&
					tempValue == 0
				) {
					//console.log("0 is no good ", tempValue);
					tempValue++;
				}
				if (!patreonLink && tempValue == 1) {
					//console.log("1 is no good ", tempValue);
					tempValue++;
				}
				if (!twitterLink && tempValue == 2) {
					//console.log("2 is no good ", tempValue);
					tempValue++;
				}
				// if (!subscribeLink && tempValue == 3) {
				// 	//console.log("3 is no good ", tempValue);
				// 	tempValue++;
				// }
				if (tempValue >= 3) {
					UpdateCallToAction(-1);
					return;
				}
				//console.log("save calltoaction at ", tempValue);
				setTrigger(tempValue);
			}
		}
	};

	const AlternatingCallToAction = () => {
		return (
			<AlternatingCallToActionStyle
				onMouseEnter={() => setIsMouseOverLink(true)}
				onMouseOut={() => setIsMouseOverLink(false)}
				backgroundColor={
					windowWidth !== null && windowWidth < doubleButtonBreakpoint
						? COLORS.ForensicNewsColor
						: "transparent"
				}
				style={{
					border:
						windowWidth !== null &&
							windowWidth > doubleButtonBreakpoint &&
							(twitterLink || patreonLink)
							? "1px solid #FFFFFF50"
							: "transparent",
					pointerEvents:
						!twitterLink || !patreonLink ? "none" : "auto",
				}}
			>
				{windowWidth !== null && windowWidth < doubleButtonBreakpoint && (
					<SeeResearchBlock triggerAnimation={trigger == 0}>
						<p
							data-for="SeeResearchTooltip"
							data-tip={`Playback Time:  ${durationMsToShortString(
								props.meta.playbackDurationMs,
								true
							)}`}
						>
							See Research
						</p>
					</SeeResearchBlock>
				)}
				{patreonLink && (
					<PatreonBlock
						popUpMode={false}
						triggerAnimation={trigger == 1}
						href={patreonLink}
						target="_top"
					>
						<p>
							{/* <img src={iconUrl1}></img> */}
							&nbsp;{domain1}
						</p>
					</PatreonBlock>
				)}
				{twitterLink && (
					<TwitterBlock
						popUpMode={false}
						triggerAnimation={trigger == 2}
						href={twitterLink}
						target="_top"
					>
						<p>
							{/* <img src={iconUrl2}></img> */}
							&nbsp;{domain2}
						</p>
					</TwitterBlock>
				)}
			</AlternatingCallToActionStyle>
		);
	};

	// Main Render:

	if (playlist && playlist.length > 0) {
		return (
			<PortalWrapper>
				{playlist && playlist.length > 0 && (
					<img
						src={playlist[0].poster}
						width="300px"
						style={{
							position: "absolute",
							opacity: 0,
							top: "33vh",
							left: "50",
							zIndex: -5,
							pointerEvents: "none",
						}}
					/>
				)}
				<FullScreen handle={fullScreenHandler}>
					<PlayerWebWrapper
						{...handlers}
						onMouseLeave={() => {
							setLeftCallToActionShowing(false);
							setRolloverWrapper(false);
						}}
						onMouseEnter={() => setRolloverWrapper(true)}
						fullScreen={fullScreenHandler.active}
						lightmode={lightmode}
						compact={compact}
						widgetMode={true}
						onTouchEnd={() =>
							(windowWidth ?? 0) <= DIMENSIONS.breakPoints.mobile &&
							setRolloverWrapper(false)
						}
						mode={"widgetMode"}
					>
						{isMuted && isMobile && (
							<MutedIndicator
								onClick={(e) => unMuteButton(e)}
								lightmode={lightmode}
								widgetMode={true}
							>
								<h3>
									<span>
										<ImVolumeMute2 />
									</span>
									Tap to Unmute
								</h3>
							</MutedIndicator>
						)}
						<PlayerWeb
							ref={playerWeb}
							className="PlayerWeb"
							fullScreen={fullScreenHandler.active}
							lightmode={lightmode}
							compact={compact}
							widgetMode={true}
							mode={"widgetMode"}
						>
							<CallToActionText
								showing={leftCalltoActionShowing}
								onMouseEnter={() => setLeftCallToActionShowing(true)}
							>
								<h4>
									Try the
									<br />
									App
								</h4>
							</CallToActionText>

							<CircleCallToactionDiv
								onMouseLeave={() => setLeftCallToActionShowing(false)}
								className="type1"
								showing={leftCalltoActionShowing}
							>
								<div className="innerCircle"></div>
							</CircleCallToactionDiv>

							<LogoChrome isPaused={isPlayerPaused}>
								<div className="BG"></div>
								<div className="firstDiv">
									<a href="/" target="_blank">
										{" "}
										<LogoInPortal
											height="28"
											width="28"
											style={{
												opacity: !isPlayerPaused && 0,
											}}
										/>
									</a>
									<a href="/" target="_blank">
										<LogoTextStyled
											width="55"
											fill={COLORS.StoneLightWhiteGrey}
											onMouseEnter={() => setLeftCallToActionShowing(true)}
										/>
									</a>
									<WidgetTitleOfHighlight
										nowPlaying={!isPlayerPaused}
										href={`/public/research/${props.pid}?source=portal`}
										target="_blank"
									>
										<p className="WidgetTitleOfHighlight">
											{portalShowBusinessCard ? "Support my Journalism" : playlist[currentIndex]?.title}
										</p>
									</WidgetTitleOfHighlight>
								</div>
							</LogoChrome>
							{
								<>
									<PlayerAndHighlightFlexDiv
										widgetMode={true}
										className="PlayerAndHighlightFlexDiv"
									>
										<div className="widgetPlayerBG" />

										{/* Only Visible in WidgetMode on Desktop (on Mouse over) The left (ie. Previous) Arrow) */}

										{currentIndex > 0 &&
											(windowWidth ?? 0) > DIMENSIONS.breakPoints.mobile ?
											<ChevronLeft
												className="WidgetleftChevron"
												blank={false}
												visible={rolloverWrapper && !isPlayerPaused}
											>
												<BsChevronLeft
													style={{
														cursor: currentIndex == 0 ? "default" : "pointer",
													}}
													onClick={() => {
														playerPlaylistSeek("prev");
													}}
													className="arrows"
													color={lightmode ? "grey" : "white"}
												/>
											</ChevronLeft>
											:
											<ChevronLeft blank visible={false} />
										}

										{/* This is The Video Player */}
										<PlayerContainerDiv
											isFullScreen={isPlayerFullscreen}
											className="PlayerContainerDiv"
											mobileBump={mobileBump}
											lightmode={lightmode}
											ref={videoDiv}
										>
											<BigPlayButtonContainer
												isPaused={isPlayerPaused}
												onClick={() => playPauseFunction()}
											>
												<BigPlayButton isPaused={isPlayerPaused} businessCardOverlayMode={portalShowBusinessCard}>
													<BsPlayFill />
												</BigPlayButton>
											</BigPlayButtonContainer>
											<BusinessCard
												bookLink={bookLink}
												logoUrl={props.meta.logoUrl}
												patreonLink={patreonLink}
												twitterLink={twitterLink}
												// subscribeLink={subscribeLink}
												userId={props.meta.authorId}
												widgetMode={true}
												show={portalShowBusinessCard}
											/>
											<VideoPlayer
												widgetMode={true}
												key={source?.src}
												mobileWidgetMode={
													(windowWidth ?? 0) <= DIMENSIONS.breakPoints.mobile
														? true
														: false
												}
												options={videoJsOptions}
											/>

											<MetaArea
												className="MetaAreaDiv"
												lightmode={lightmode}
												widgetMode={true}
												progressAmount={0}
												doubleButtonBreakpoint={doubleButtonBreakpoint}
											>
												<div className="topMost">
													<a
														href={`/public/research/${props.pid}?source=portal`}
														target="_blank"
														rel="noop noreferrer"
													>
														<div className="holder">
															<div className="researchDuration">
																<span
																	className="spanWithMargin ResearchTime"
																	data-tip="Research <br/> Recorded"
																	data-for="ViewToolTip"
																>
																	<span>
																		<AiOutlineClockCircle
																			style={{
																				marginTop: "-3px",
																				marginRight: "6px",
																			}}
																			color={COLORS.mellowYellow}
																		/>
																	</span>
																	{props?.meta?.minutes}m
																	<ReactTooltip
																		className="reactTooltipStyle"
																		id="ViewToolTip"
																		effect="solid"
																		html={true}
																		place="top"
																		backgroundColor={
																			COLORS.StoneClassyDarkColor
																		}
																	/>
																</span>
																<span
																	className="spanWithMargin EventNumber"
																	data-tip="Number <br/> of Events"
																	data-for="EventsTooltip"
																>
																	{props?.meta?.events}
																	<span>
																		<CgScreenStyled
																			color={COLORS.mellowYellow}
																			style={{
																				marginTop: "-3px",
																				marginLeft: "6px",
																			}}
																		/>
																	</span>
																	<ReactTooltip
																		className="reactTooltipStyle"
																		id="EventsTooltip"
																		effect="solid"
																		place="top"
																		html={true}
																		backgroundColor={
																			COLORS.StoneClassyDarkColor
																		}
																	/>
																</span>
																<span
																	className="spanWithMargin HighlightsNumber"
																	data-tip="Number <br/> of Highlights"
																	data-for="HighlightsAmountTooltip"
																>
																	{props?.meta?.highlights}
																	<span>
																		<BiWebcamStyled
																			color={COLORS.mellowYellow}
																			className="icon"
																			style={{
																				marginTop: "-3px",
																				marginLeft: "3px",
																			}}
																		/>
																	</span>
																	<ReactTooltip
																		className="reactTooltipStyle"
																		id="HighlightsAmountTooltip"
																		effect="solid"
																		place="top"
																		html={true}
																		backgroundColor={
																			COLORS.StoneClassyDarkColor
																		}
																	/>
																</span>
															</div>
															<div className="viewEntireResearchProcess">
																{AlternatingCallToAction()}
																{windowWidth !== null &&
																	windowWidth > doubleButtonBreakpoint &&
																	<AlternatingCallToActionStyle
																		backgroundColor={COLORS.ForensicNewsColor}
																	>
																		<SeeResearchBlock triggerAnimation={true}>
																			<p
																				data-for="SeeResearchTooltip"
																				data-tip={`Playback Time:  ${durationMsToShortString(
																					props.meta.playbackDurationMs,
																					true
																				)}`}
																			>
																				See Research
																			</p>
																		</SeeResearchBlock>
																	</AlternatingCallToActionStyle>
																}
															</div>
															<ReactTooltip
																className="reactTooltipStyle"
																id="SeeResearchTooltip"
																effect="solid"
																place="top"
																backgroundColor={COLORS.StoneClassyDarkColor}
															/>
														</div>
														{/* Now playing Number for Widget */}

														{props?.meta?.highlights > currentIndex ? (
															<div
																className="widgetPlaylistNumber"
																data-tip="Highlight <br/> Number"
																data-for="NowPlayingTooltip"
															>
																<span>{currentIndex + 1}</span>
																<span>/</span>
																<span>{props?.meta?.highlights}</span>
															</div>
														) : (
															<div
																className="widgetPlaylistNumber"
																data-tip="Video Bio"
																data-for="NowPlayingTooltip"
															>
																<span>
																	<BsFilePerson style={{ margin: "0 0.4em" }} />
																</span>
															</div>
														)}
														<ReactTooltip
															className="reactTooltipStyle"
															id="NowPlayingTooltip"
															effect="solid"
															place="top"
															html={true}
															backgroundColor={COLORS.StoneClassyDarkColor}
														/>
													</a>
												</div>
												{/* {fullScreenButtonRender()} */}
											</MetaArea>
										</PlayerContainerDiv>

										{/* Only Visible in WidgetMode Desktop (On Mouse Over) The right (ie. Next Video) Arrow) */}

										{currentIndex + 1 < playlist.length &&
											(windowWidth ?? 0) > DIMENSIONS.breakPoints.mobile ?
											<ChevronRight
												className="WidgetRightChevron"
												blank={false}
												visible={rolloverWrapper && !isPlayerPaused}
											>
												<BsChevronRight
													onClick={() => {
														playerPlaylistSeek("next");
													}}
													style={{
														cursor:
															currentIndex + 1 == playlist.length
																? "default"
																: "pointer",
													}}
													className="arrows"
													color={lightmode ? "grey" : "white"}
												/>
											</ChevronRight>
											:
											<ChevronRight blank visible={false} />
										}
									</PlayerAndHighlightFlexDiv>
								</>
							}
						</PlayerWeb >
					</PlayerWebWrapper >
				</FullScreen >
			</PortalWrapper >
		);
	}

	return (
		<>
			<NoProject404Div>
				<span
					className="mx-auto position-absolute"
					style={{ bottom: 0, right: "1.5em" }}
				>
					<Button
						variant="contained"
						color="secondary"
						href="mailto:info@writeinstone.com"
						className={classes.buttonContact}
						startIcon={<MdEmail />}
					>
						Contact
					</Button>
				</span>
				<p color={COLORS.StoneClassyDarkColor} style={{ padding: "1em" }}>
					Project Not Found
				</p>
				<NoProject style={{ width: "300px" }} />
			</NoProject404Div>
		</>
	);
}
