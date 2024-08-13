import "../../../node_modules/video.js/dist/video-js.css";

import {
	NoProject404Div,
	PlayerAndHighlightFlexDiv,
	PlayerWeb,
	PlayerWebWrapper
} from "./styles/PublicPageStyles";
import React, { useEffect, useRef, useState } from "react";
import {
	currentSessionIndex,
	isHighlightsOnlyMode,
	setCurrentPlaylist
} from "../../state/playlistState";

import Button from "@material-ui/core/Button";
import { COLORS } from "../../styles/colors";
import Carousel from "./components/Carousel";
import DIMENSIONS from "../../styles/GlobalDimensions";
import HighlightsPlaylist from "./components/HighlightsPlaylist";
import { MdEmail } from "react-icons/md";
import NoProject from "../../../public/images/SVG/noProject.svg";
import TimeLine from "./components/TimeLine";
import { TrackEvent } from "../../../pages/_app";
import { VideoJsPlayerPluginOptions } from "video.js";
import { isAudioMuted } from "../../state/videoPlayerState";
import { makeStyles } from "@material-ui/core/styles";
import { playlistItem } from "../../../APITypes/PlaylistItem.cs";
import { projectInfo } from "../../../APITypes/ProjectInfo.cs";
import { projectStreamData } from "../../../APITypes/ProjectStreamData.cs";
import { segment } from "../../../APITypes/Segment.cs";
import { useAppSelector } from "../../state/hooks";
import { useDispatch } from "react-redux";

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

export default function PublicPageComponent(props: {
	pid: string;
	setURLcurrentIndex: number;
	data: projectStreamData;
	lightmode: boolean;
	meta: projectInfo;
	widgetMode: boolean;
	baseUrl: string;
	linkSource: string;
	windowWidth: number;
	windowHeight: number;
}) {
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useDispatch();
	const isHighlightMode = useAppSelector(isHighlightsOnlyMode);
	const playerCurrentIndex = useAppSelector(currentSessionIndex);
	const isMuted = useAppSelector(isAudioMuted);
	// INIT. CONSTANTS ////////////////////////////////////////////////////////////////
	//const BaseDomainURL = process.env.NEXT_PUBLIC_BASE_URL;

	// STATES ////////////////////////////////////////////////////////////////////////
	// from Props_____MUST BE AT TOP________________________________________________//
	const [lightmode, setLightMode] = useState<boolean>(props.lightmode);

	// Pause Consistency
	const [isVirginState, setIsVirginState] = useState<boolean>(true);
	///////////////////////////////////////////////////////////////////////////////////
	// STATES_________CORE PLAYER FUNCTIONS _________________________________________//
	const [playlist] = useState<playlistItem[]>(props.data.sessionPlaylist);
	const [highlightsArray, setHighlightsArray] = useState(
		playlist[playerCurrentIndex]?.highlights
	);
	const [hasContent, setHasContent] = useState(false);
	const [source, setSource] = useState(
		isHighlightMode
			? playlist[playerCurrentIndex]?.highlightsOnlyStream
			: playlist[playerCurrentIndex]?.fullStream
	);
	const [videoJsOptions, setVideoJsOptions] = useState<VideoJsPlayerPluginOptions>({
		muted: isMuted,
		controls: true,
		normalizeAutoplay: true,
		autoplay: playerCurrentIndex === 0 ? false : true,
		sources: [
			{
				src: source?.src,
				type: source?.type,
			},
		],
	});
	///////////////////////////////////////////////////////////////////////////////////
	// STATES_________ANIMATION DEPENDENCIES _______________________________________//
	//const [switchingHighlight, setSwitchingHighlight] = useState(false);
	//
	//const [itemChangingDirection, setItemChangingDirection] = useState<string>("static");
	// Overscroll mobile effect
	const [mobileBump, setMobileBump] = useState("");
	///////////////////////////////////////////////////////////////////////////////////
	// STATES_________HEIGHT + WIDTH CALCULATIONS ___________________________________//
	const [playerWebFixedHeight, setPlayerWebFixedHeight] = useState<number | null>(0);
	//////////////////////////
	const nextSource = isHighlightMode
		? playlist[playerCurrentIndex]?.highlightsOnlyStream
		: playlist[playerCurrentIndex]?.fullStream;

	// Links

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
	const bookLink =
		props?.meta?.merchandiseLink2 &&
		"https://" +
		props?.meta?.merchandiseLink2
			?.replace("https://", "")
			.replace("http://", "");

	// OnLoad INITIAL USE EFFECT //////////////////////////////////////////////////////
	useEffect(() => {

		TrackEvent(
			"Project View",
			new Map([
				["Title", props.meta.title],
				["ID", props.pid],
				["Author ID", props.meta.authorId],
				["Author Name", props.meta.authorName],
			])
		);

		if (!playlist) {
			return;
		}

		dispatch(setCurrentPlaylist(playlist));

		setIsVirginState(true);

		const nextSource = isHighlightMode
			? playlist[playerCurrentIndex]?.highlightsOnlyStream
			: playlist[playerCurrentIndex]?.fullStream;

		console.log("playlist ", playlist);

		setVideoJsOptions({
			muted: isMuted,
			controls: true,
			autoplay: false,
			normalizeAutoplay: true,
			sources: [
				{
					src: nextSource?.src,
					type: nextSource?.type,
				},
			],
		});
	}, []);
	// USE EFFECTS ////////////////////////////////////////////////////////////////////

	// The Initialization of the playlist

	useEffect(() => {
		if (playlist.length <= 0) {
			setHasContent(false);
		}
		else {
			setHasContent(true);
		}
	}, [playlist]);

	// Set VideoDivWidth on Window Resize (and other Window Resize Functions go here)
	useEffect(() => {
		if (
			props.windowWidth !== 0 &&
			props.windowWidth > DIMENSIONS.breakPoints.mobile
		) {
			setPlayerWebFixedHeight(
				props.windowHeight - DIMENSIONS.heights.navbar.standard
			);
		}
		else {
			setPlayerWebFixedHeight(null);
		}
	}, [props.windowWidth, props.windowHeight]);
	useEffect(() => {
		setLightMode(props.lightmode);
	}, [props.lightmode]);

	// FUNCTIONS //////////////////////////////////////////////////////////////////////
	const usePrevious = (value: number): number | undefined => {
		const ref = useRef<number>();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	};
	const prevIndex = usePrevious(playerCurrentIndex);
	//

	// NO PROJECT RENDER //////////////////////////////

	if (props.data.sessionPlaylist == null) {
		const classes = useStyles();
		return (
			<>
				<NoProject404Div>
					<span
						className="mx-auto position-absolute"
						style={{ bottom: 0, right: "1.5rem" }}
					>
						<Button
							variant="contained"
							color="secondary"
							href="mailto:info@writeinstone.com"
							className={classes.buttonContact}
							startIcon={<MdEmail />}
						>Contact</Button>
					</span>
					<p color={COLORS.StoneClassyDarkColor} style={{ padding: "1rem" }}>
						Project Not Found
					</p>
					<NoProject style={{ width: "300px" }} />
				</NoProject404Div>
			</>
		);
	}

	const ImageForOpenGraphRender = () => {
		if (playlist && playlist.length > 0) {
			return (
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
			);
		}
		return null;
	};

	// Main Render (remove check for player to stop reload - but then need to make better height):

	return (
		<>
			{ImageForOpenGraphRender()}
			<PlayerWebWrapper className="PlayerWebWrapper" lightmode={lightmode}>
				<PlayerWeb
					className="PlayerWeb"
					lightmode={lightmode}
					fixedHeight={playerWebFixedHeight ?? 0}
				>
					<>
						{/* This is The 'TimeLine' */}
						<TimeLine
							// CORE PROPS ////////////////////////////////////////////////////
							pid={props.pid}
							hasContent={hasContent}
							meta={props.meta}
							// MODES & DIMENSIONS ////////////////////////////////////////////
							windowWidth={props.windowWidth}
							widgetMode={props.widgetMode}
							lightmode={lightmode}
							bookLink={bookLink}
							patreonLink={patreonLink}
							twitterLink={twitterLink}
						/>
						<PlayerAndHighlightFlexDiv className="PlayerAndHighlightFlexDiv">
							{/* This is The Video Player */}
							<Carousel
								// CORE PROPS ////////////////////////////////////////////////////
								pid={props.pid}
								source={source}
								videoJsOptions={videoJsOptions}
								highlightsArray={highlightsArray}
								playList={playlist}
								sessionPlaylist={props?.data?.sessionPlaylist}
								nextSource={nextSource}
								// CORE PLAYER FUNCTIONS /////////////////////////////////////////
								setHighlightsArray={(highlightsArray: segment[]) =>
									setHighlightsArray(highlightsArray)
								}
								// MODES & DIMENSIONS ////////////////////////////////////////////
								windowWidth={props.windowWidth}
								widgetMode={props.widgetMode}
								lightmode={lightmode}
								// GETTERS ///////////////////////////////////////////////////////
								isMuted={isMuted}
								isVirginState={isVirginState}
								// CALLBACK FUNCTIONS ////////////////////////////////////////////
								setMobileBump={(e: string) => setMobileBump(e)}
								meta={props.meta}
								mobileBump={mobileBump}
								// Business Card Links as Props
								bookLink={bookLink}
								patreonLink={patreonLink}
								twitterLink={twitterLink}
							/>
							{/* This is The Highlight List to the Right of the Player */}
							<HighlightsPlaylist
								// CORE PROPS ////////////////////////////////////////////////////
								meta={props.meta}
								pid={props.pid}
								// MODES & DIMENSIONS ////////////////////////////////////////////
								windowWidth={props.windowWidth}
								widgetMode={props.widgetMode}
								lightmode={lightmode}
							/>
						</PlayerAndHighlightFlexDiv>
					</>
				</PlayerWeb>
			</PlayerWebWrapper>
		</>
	);
}
