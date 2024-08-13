import "../../../../node_modules/video.js/dist/video-js.css";

import {
	AbovePlayer,
	BiWebcamStyled,
	DurationSpan,
	HighlightBadge,
	PlaylistDiv,
	PlaylistItem,
	PlaylistPositionDisplay
} from "../styles/PublicPageStyles";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import React, {
	FC,
	MutableRefObject,
	useEffect,
	useRef,
	useState
} from "react";
import {
	currentPlaylist,
	currentSessionIndex,
	isBusinessCardSelected,
	isHighlightsOnlyMode,
	setCurrentSessionIndex,
	setIsBusinessCardSelected,
	startNextSession,
	startPreviousSession
} from "../../../state/playlistState";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

import { COLORS } from "../../../styles/colors";
import DIMENSIONS from "../../../styles/GlobalDimensions";
import LazyImage from "../../../LazyLoad/LazyLoad";
import MetaAreaDiv from "./MetaAreaDiv";
import ReactTooltip from "react-tooltip";
import { isMobile } from "react-device-detect";
import { projectInfo } from "../../../../APITypes/ProjectInfo.cs";

interface TimeLineProps {
	// CORE PROPS /////////////////////////////////////////////////////////////
	meta: projectInfo;
	pid: string;
	hasContent: boolean;
	// MODES AND DIMENSIONS ///////////////////////////////////////////////////
	windowWidth: number;
	widgetMode: boolean;
	lightmode: boolean;
	bookLink: string;
	patreonLink: string;
	twitterLink: string;
}

export const TimeLine: FC<TimeLineProps> = ({
	meta,
	pid,
	hasContent,
	windowWidth,
	widgetMode,
	lightmode,
	bookLink,
	patreonLink,
	twitterLink
}) => {
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useAppDispatch();
	const playList = useAppSelector(currentPlaylist);
	const currentIndex = useAppSelector(currentSessionIndex);
	const isHighlightsOnly = useAppSelector(isHighlightsOnlyMode);
	const isPlayerBusinessCardSelected = useAppSelector(isBusinessCardSelected);
	// REFS /////////////////////////////////////////////////////////////////////////
	const timelineScrollEl = useRef<HTMLDivElement>(
		null
	) as MutableRefObject<HTMLDivElement>;
	const currentPlaylistItem = useRef<HTMLDivElement>(
		null
	) as MutableRefObject<HTMLDivElement>;
	const anchor = useRef(null);
	// STATES ///////////////////////////////////////////////////////////////////////
	//____Rollover the Thumbnails in the TimeLine State:
	const [rolloverTimeline, setRollOverTimeline] = useState(false);
	// LETS AND VARS ////////////////////////////////////////////////////////////////
	//____Mouse Down Logic for Dragging the TimeLine essentially:
	let isDown = false;
	let startX = Number(1);
	let scrollPosition = Number(1);

	// USE EFFECTS //////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (!hasContent) {
			return;
		}
		window.addEventListener("mousemove", mouseMoveEvent);
		timelineScrollEl.current.addEventListener("mousedown", mouseDownEvent);
		timelineScrollEl.current.addEventListener("mouseup", mouseUpEvent);
		timelineScrollEl.current.addEventListener("mousemove", mouseMoveEvent);
		timelineScrollEl.current.addEventListener(
			"wheel",
			scrollHorizontally,
			false
		);
		return () => {
			window.removeEventListener("mousemove", mouseMoveEvent);
			timelineScrollEl.current?.removeEventListener(
				"mousedown",
				mouseDownEvent
			);
			timelineScrollEl.current?.removeEventListener("mouseup", mouseUpEvent);
			timelineScrollEl.current?.removeEventListener(
				"mousemove",
				mouseMoveEvent
			);
			if (timelineScrollEl.current != undefined) {
				timelineScrollEl.current.removeEventListener(
					"wheel",
					scrollHorizontally,
					false
				);
			}
		};
	}, [rolloverTimeline]);
	//
	useEffect(() => {
		console.log("currentIndex changed", currentIndex);
		scrollToCurrentElement();
	}, [currentIndex]);
	// FUNCTIONS ////////////////////////////////////////////////////////////////////
	const scrollHorizontally = function (e: WheelEvent) {
		if (!hasContent) {
			return;
		}
		e.preventDefault();
		const delta = Math.max(-1, Math.min(1, e.deltaY));
		timelineScrollEl.current.scrollLeft -= delta * 40; // Multiplied by 40
	};
	const mouseMoveEvent = function (e: MouseEvent) {
		if (!hasContent) {
			return;
		}
		if (!isDown) {
			return;
		}
		e.preventDefault();
		const x = e.pageX - timelineScrollEl.current.offsetLeft;
		const walk = x - startX;
		timelineScrollEl.current.scrollLeft = scrollPosition - walk;
	};
	// Mouse Stuff for Grab Dragging
	const mouseDownEvent = (e: MouseEvent) => {
		{
			if (!hasContent) {
				return;
			}
			window.addEventListener("mousedown", mouseDownEvent);
			isDown = true;
			startX = e.pageX - timelineScrollEl.current.offsetLeft;
			scrollPosition = timelineScrollEl.current.scrollLeft;
			timelineScrollEl.current.classList.add("Timeline__active-grab");
			document.getElementsByTagName("body")[0].style.cursor = "grabbing";
		}
	};
	const mouseUpEvent = function () {
		if (!hasContent) {
			return;
		}
		if (isDown) {
			isDown = false;
			timelineScrollEl.current.classList.remove("Timeline__active-grab");
			if (
				timelineScrollEl.current.clientWidth <
				timelineScrollEl.current.scrollWidth
			) {
				// setArrows(timelineScrollEl.current);
			}
			document.getElementsByTagName("body")[0].style.cursor = "default";
			window.removeEventListener("mousedown", mouseDownEvent);
		}
	};

	// Scroll Into View Current Item
	const scrollToCurrentElement = () => {
		currentPlaylistItem.current?.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
		// if (window !== undefined) {
		//   window.scrollTo(0, 0);
		// }
	};
	// RENDER //////////////////////////////////////////////////////////////////////
	return (
		<AbovePlayer lightmode={lightmode} className="TimeLine">
			<div className="TopRow">
				<MetaAreaDiv
					pid={pid}
					lightmode={lightmode}
					windowWidth={windowWidth}
					meta={meta}
					widgetMode={widgetMode}
				/>
			</div>
			<div
				className="BottomRow"
				style={{
					display: "flex",
					width: "100%",
					borderBottom: !lightmode ? "solid 1px #00000090" : "none",
				}}
			>
				<PlaylistDiv
					lightmode={lightmode}
					onMouseEnter={() => {
						setRollOverTimeline(true);
					}}
					onMouseOut={() => {
						setRollOverTimeline(false);
					}}
					className="PlaylistDiv"
					ref={timelineScrollEl}
				>
					<div
						ref={anchor}
						key={-1}
						id="timeline__anchor"
						style={{
							display: "block",
							width: "1px",
							height: "100%",
							background: "transparent",
						}}
					></div>
					{playList.map(({ poster, title }, index: number) => {
						return (
							<>
								<a
									data-tip={`► ${title}`}
									data-for="TimelineTooltip"
									onClick={() => {
										dispatch(setIsBusinessCardSelected(false));
										dispatch(setCurrentSessionIndex(index));
									}}
								>
									<img
										src={poster}
										width="100"
										height="50"
										style={{
											display: "none",
										}}
									/>
									{(playList[index].highlights.length > 0 ||
										!isHighlightsOnly) &&
										<PlaylistItem
											lightmode={lightmode}
											key={index}
											selected={
												isPlayerBusinessCardSelected ? false : currentIndex === index
											}
											ref={currentIndex === index ? currentPlaylistItem : null}
											backgroundImage={poster}
											className={`playlistItem${index}`}
										>
											<LazyImage src={poster} alt="Thumbnail" />

											{playList[index].highlights.length > 0 && (
												<HighlightBadge>
													<BiWebcamStyled
														className="icon"
														color={COLORS.mellowYellow}
														style={{
															position: "relative",
															left: "0",
														}}
													/>
													<span className="number">
														{playList[index].highlights.length}
													</span>
												</HighlightBadge>
											)}
											<DurationSpan>00:00</DurationSpan>
											{!isMobile && (
												<ReactTooltip
													className="reactTooltipStyle"
													id="TimelineTooltip"
													effect="solid"
													place="bottom"
													backgroundColor={COLORS.StoneClassyDarkColor}
												/>
											)}
										</PlaylistItem>
									}
								</a>
							</>
						);
					})}
					<a>
						<PlaylistItem
							lightmode={lightmode}
							key={9998}
							style={{ opacity: 0 }}
							selected={false}
							backgroundImage="https://via.placeholder.com/150"
							className={"playlistItemBlankDesktop"}
						>
							<DurationSpan>00:00</DurationSpan>
						</PlaylistItem>
					</a>

					<a
						className="playlistItemBusinessCard"
						data-tip={"► Business Card"}
						data-for="TimelineTooltip"
						onClick={() => dispatch(setIsBusinessCardSelected(true))}
					>
						<PlaylistItem
							lightmode={lightmode}
							key={9999}
							selected={isPlayerBusinessCardSelected}
							backgroundImage="https://via.placeholder.com/150"
						>
							<div className="d-flex" style={{
								width: "100%", position: "absolute", height: "100%", top: 0, right: "3px",
								bottom: 0
							}}>
								<div style={{ background: `url(${meta.logoUrl})`, flex: 1.3, margin: "0 6px 0 6px", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }} />
								<div style={{ flex: 1, margin: "2px" }} className="d-flex flex-column">
									<div style={{ flex: 1, background: COLORS.purple.rollover, display: "block", width: "100%", margin: "2px" }} />
									<div style={{ flex: 1, background: COLORS.purple.rollover, display: "block", width: "100%", margin: "2px" }} />
								</div>
								<div style={{ flex: 1, margin: "2px" }} className="d-flex flex-column">
									<div style={{ flex: 1, background: COLORS.purple.rollover, display: "block", width: "100%", margin: "2px" }} />
									<div style={{ flex: 1, background: COLORS.purple.rollover, display: "block", width: "100%", margin: "2px" }} />
								</div>
							
							</div>
							{!isMobile && (
								<ReactTooltip
									className="reactTooltipStyle"
									id="BusinessCardTimelineTooltip"
									effect="solid"
									place="left"
									backgroundColor={COLORS.StoneClassyDarkColor}
								/>
							)}
						</PlaylistItem>
					</a>
				</PlaylistDiv>

				{playList.length > 6 && (
					<PlaylistPositionDisplay
						className="PlaylistPositionDisplay"
						lightmode={lightmode}
					>
						<p>
							{currentIndex + 1}
							{" / "}
							{playList.length}
						</p>
					</PlaylistPositionDisplay>
				)}

				{windowWidth < 1025 && windowWidth > DIMENSIONS.breakPoints.mobile && (
					<div className="d-flex justify-content-center align-items-center">
						<BsChevronLeft
							size={62}
							className="arrows ChevronLeft"
							style={{
								opacity: currentIndex == 0 ? "0.3" : 1,
								cursor: currentIndex == 0 ? "default" : "pointer",
							}}
							onClick={() => {
								dispatch(startPreviousSession());
							}}
							color={lightmode ? "grey" : "white"}
						/>
						<BsChevronRight
							size={62}
							onClick={() => {
								dispatch(startNextSession());
							}}
							style={{
								margin: "0 20px",
								opacity: currentIndex + 1 == playList.length ? "0.3" : 1,
								cursor:
									currentIndex + 1 == playList.length ? "default" : "pointer",
							}}
							className="arrows ChevronRight"
							color={lightmode ? "grey" : "white"}
						/>
					</div>
				)}
			</div>
		</AbovePlayer>
	);
};

export default TimeLine;
