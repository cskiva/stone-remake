import "video.js/dist/video-js.css";
import "videojs-mobile-ui";
import "videojs-mobile-ui/dist/videojs-mobile-ui.css";

import React, { useRef, useState } from "react";
import { isBusinessCardSelected, setIsBusinessCardSelected, showBusinessCard, startNextSession } from "../../state/playlistState";
import { setAudioVolumePercent, setCurrentTime, setIsFullScreen, setIsMuted, setIsPaused, setIsWaiting, setPlayerInstance } from "../../state/videoPlayerState";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import videojs, { VideoJsPlayer } from "video.js";

interface IVideoPlayerProps {
	options: videojs.PlayerOptions;
	widgetMode: boolean;
	mobileWidgetMode: boolean;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({
	options,
	widgetMode,
	mobileWidgetMode,
}) => {

	const frameSkipAmountMs = 83.3;
	const timeReportFrequencyMs = 0; // set this to a higher number to slow down the reporting of currentTime
	const dispatch = useAppDispatch();
	const playerShowBusinessCard = useAppSelector(showBusinessCard);
	const playerIsBusinessCardSelected = useAppSelector(isBusinessCardSelected);

	const [lastTimeReported, setLastTimeReported] = useState(0);

	let currentInstance: VideoJsPlayer | null = null;
	let isFullScreen = false;

	const initialOptions: videojs.PlayerOptions = {
		controls: true,
		fluid: true,
		preload: "auto",
		autoplay: false,
		aspectRatio: "16:9",
		controlBar: {
			remainingTimeDisplay: !mobileWidgetMode ? true : false,
			playToggle: !mobileWidgetMode ? true : false,
			//progressControl: !mobileWidgetMode ? true : false,
			fullscreenToggle: false,
			// TODO: We have to restore inline true
			volumePanel: !mobileWidgetMode ? { inline: false } : false,
		},
	};

	const videoNode = useRef<HTMLVideoElement>() as React.MutableRefObject<HTMLVideoElement>;
	const player = useRef<videojs.Player>() as React.MutableRefObject<VideoJsPlayer>;
	// const [loaded, setLoaded] = useState<boolean>(false);

	React.useEffect(() => {
		player.current = videojs(videoNode.current as Element, {
			...initialOptions,
			...options,
		})
			.playsinline(true)
			.ready(function () {

				currentInstance = this;
				this.on("ready", function () {
					initPlayer(currentInstance);
				});

				this.on("waiting", function () {
					dispatch(setIsWaiting(true));
				});

				this.on("canplay", function () {
					dispatch(setIsWaiting(false));
				});

				this.on("ended", function () {
					console.log("END EVENT");
					dispatch(startNextSession());
					if (playerIsBusinessCardSelected) {
						dispatch(setIsBusinessCardSelected(false));
					}
				});

				this.on("play", function () {
					dispatch(setIsPaused(false));
					ShowFrameSkipButtons(false);
					// console.log("PLAY EVENT");
				});

				this.on("pause", function () {
					if (currentInstance) {
						if (currentInstance.duration() - currentInstance.currentTime() > 0.1) {
							dispatch(setIsPaused(true));
						}
						ShowFrameSkipButtons(true);
					}
				});

				this.on("timeupdate", () => {
					const time = this.currentTime() * 1000;
					if (lastTimeReported + timeReportFrequencyMs < time) {
						dispatch(setCurrentTime(time));
						setLastTimeReported(time);
					}
				});

				this.on("volumechange", () => {
					dispatch(setIsMuted(this.muted()));
					dispatch(setAudioVolumePercent(this.volume() * 100));
				});

				this.on("click", () => {

					if (this.paused()) {
						dispatch(setIsPaused(true));
					}
					else {
						dispatch(setIsPaused(false));
					}

				});
			});

		return () => {
			if (player.current) {
				player.current.dispose();
			}
		};
	}, []);

	const ShowFrameSkipButtons = (show: boolean) => {
		if (!window) {
			return;
		}
		const allWithClass = Array.from(
			document.getElementsByClassName("vjs-hideOnPlay")
		);
		if (show) {
			allWithClass.forEach(e => {
				e.classList.remove("vjs-width0-hidden");
			});
		}
		else {
			allWithClass.forEach(e => e.classList.add("vjs-width0-hidden"));
		}
	};

	const initPlayer = (newPlayer: videojs.Player | null) => {

		if (newPlayer !== null) {

			console.log(newPlayer.controlBar);

			//Creating New Button
			const fullScreenButton = newPlayer?.controlBar.addChild("button", {
				text: "FullScreen All",
				role: "button",
				"aria-live": "polite",
				tabIndex: 0,
			});

			const playToggle = newPlayer.controlBar.getChild("PlayToggle");

			//Fullscreen Custom Control
			fullScreenButton.addClass("vjs-fullscreen-control");
			fullScreenButton.on("click", function () {
				isFullScreen = !isFullScreen;
				dispatch(setIsFullScreen(isFullScreen));
			});

			let isSwipe = false;

			newPlayer.on("touchend", function (e) {
				if (isSwipe) {
					console.log("playerclick prevented");
					isSwipe = false;
				}
				else {
					console.log("playerclick success");
					if (newPlayer.paused()) {
						newPlayer.play();
					}
					else {
						newPlayer.pause();
					}
				}
			});

			newPlayer.on("touchmove", function (e) {
				if (!isSwipe) {
					console.log("isSwipe");
					isSwipe = true;
				}
			});

			if (!widgetMode) {
				//Creating New Button
				const frameForwardButton = newPlayer?.controlBar.addChild("button", {
					text: "Frame Forward Button",
					role: "button",
					"aria-live": "polite",
					tabIndex: 0
				});

				//Creating New Button
				const frameBackButton = newPlayer?.controlBar.addChild("button", {
					text: "Frame Back Button",
					role: "button",
					"aria-live": "polite",
					tabIndex: 0
				});
				frameBackButton.controlText("frame Back");

				// Frame by Frame Controls
				frameBackButton.on("click", function () {
					//console.log("frame back", currentInstance?.currentTime());
					if (currentInstance?.paused()) {
						currentInstance.currentTime(currentInstance.currentTime() - frameSkipAmountMs / 1000);
					}
					console.log("frame back done", currentInstance?.currentTime());
				});
				frameForwardButton.on("click", function () {
					//console.log("frame forward");
					if (currentInstance?.paused()) {
						currentInstance.currentTime(currentInstance.currentTime() + frameSkipAmountMs / 1000);
					}
				});

				frameBackButton.addClass("vjs-frameBackButton");
				frameForwardButton.addClass("vjs-frameForwardButton");
				frameBackButton.addClass("vjs-hideOnPlay");
				frameForwardButton.addClass("vjs-hideOnPlay");

				if (playToggle != undefined) {
					newPlayer?.controlBar
						.el()
						.insertBefore(
							frameBackButton.el(),
							playToggle.el()
						);
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const playerjs = require("player.js");
			const adapter = playerjs.VideoJSAdapter(newPlayer);

			adapter.ready();

			dispatch(setPlayerInstance(currentInstance));
		}
	};

	return (
		<div data-vjs-player>
			<video
				ref={videoNode}
				className={`video-js vjs-writeInStone ${widgetMode && "vjs-writeInStoneWidgetMode"} ${playerShowBusinessCard && "vjs-businessCard"}`}
			/>
		</div>
	);
};

export default VideoPlayer;