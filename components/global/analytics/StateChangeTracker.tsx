import React, { useEffect, useState } from "react";
import { audioVolumePercent, currentTime, isPaused, playerInstance, setSkipToTime, skipToTime } from "../../state/videoPlayerState";
import { currentPlaylist, currentSegment, currentSessionIndex, isHighlightsOnlyMode, setCurrentHighlightIndex, setCurrentSegment, setCurrentSegmentIndex, setCurrentSessionIndex } from "../../state/playlistState";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

import { TrackEvent } from "../../../pages/_app";
import { playlistItem } from "../../../APITypes/PlaylistItem.cs";
import { projectInfo } from "../../../APITypes/ProjectInfo.cs";
import { projectStreamData } from "../../../APITypes/ProjectStreamData.cs";
import { segment } from "../../../APITypes/Segment.cs";
import { streamSource } from "../../../APITypes/StreamSource.cs";

export default function StateChangeTracker(props: {
	pid: string
	data: projectStreamData,
	meta: projectInfo,
	isPortal: boolean
}) {

	// Please note the current behaviour for (analytics) reporting re-watching of content: 
	// Refreshing the browser, or opening the content in a new tab will forget all previously 
	// watched content and resend events for any subsequently watched segment/highlight
	// Behaviour in a single tab/refresh/browser session is as follows:
	// Portal:
	// Users will register one highglight view if they view any frame of that highlight
	// Rewatching highlights multiple times will not trigger additional reports
	// Project page:
	// Users will register one highlight/segment view if they view any frame of that highlight/segment
	// Rewatching content multiple times will not trigger additional reports UNLESS
	// Watching a different session resets the count, meaning:
	// if you watch s1h1, then switch to s2, then back to s1 and watch h1 again you will get 2 reported views for h1

	// Redux state
	const dispatch = useAppDispatch();
	const sessionIndex = useAppSelector(currentSessionIndex);
	const isPlayerPaused = useAppSelector(isPaused);
	const playbackPosition = useAppSelector(currentTime);
	const isHighlightMode = useAppSelector(isHighlightsOnlyMode);
	const segmentPlaying = useAppSelector(currentSegment);
	const skipTo = useAppSelector(skipToTime);
	const player = useAppSelector(playerInstance);
	const sessions = useAppSelector(currentPlaylist);
	const volume = useAppSelector(audioVolumePercent);

	// Local State
	const [lastReportedTimestamp, setLastReportedTimestamp] = useState<Date | null>(null);
	const [segmentsWatched, setSegmentsWatched] = useState<string[]>([]);

	let currentPlaybackPosition = playbackPosition;

	// useEffects ****
	useEffect(() => {
		// console.log(isPlayerPaused ? "paused" : "unpaused");
		if (isPlayerPaused && segmentPlaying != null) {
			trackWatchedTime(segmentPlaying);
		}
		if (!isPlayerPaused) {
			if (lastReportedTimestamp == null) {
				setLastReportedTimestamp(new Date());
				trackSegmentChanged();
			}
		}
	}, [isPlayerPaused]);

	useEffect(() => {
		handleSessionChange();
	}, [sessionIndex, isHighlightMode]);

	useEffect(() => {
		checkAudio();
	}, [volume]);

	useEffect(() => {
		checkSkipTo();
	}, [skipTo]);

	useEffect(() => {
		if (!isPlayerPaused) {
			player?.play();
		}
	}, [player]);

	useEffect(() => {
		trackSegmentChanged();
	}, [playbackPosition]);
	// end useEffects ****

	const trackSegmentChanged = () => {
		const currentPlaylist = props.isPortal ? props.data.highlightVideos[sessionIndex] : props.data.sessionPlaylist[sessionIndex];
		if (segmentPlaying == null) {
			const [firstSegment, firstIndex] = getSegmentAt(currentPlaybackPosition, currentPlaylist);
			onSegmentChanged(firstSegment);
			dispatch(setCurrentSegment(firstSegment));
			dispatch(setCurrentSegmentIndex(firstIndex));
			calculateCurrentHighlightIndex(firstSegment);
			return;
		}

		const start = isHighlightMode
			? segmentPlaying?.highlightsOnlyStart
			: segmentPlaying?.start;
		const end = isHighlightMode
			? segmentPlaying?.highlightsOnlyEnd
			: segmentPlaying?.end;
		if (
			currentPlaybackPosition >= start &&
			currentPlaybackPosition <= end
		) {
			return;
		}

		const [nextSegment, playingIndex] = getSegmentAt(currentPlaybackPosition, currentPlaylist);

		if (segmentPlaying != nextSegment) {
			onSegmentChanged(nextSegment);
			trackWatchedTime(segmentPlaying);
			dispatch(setCurrentSegment(nextSegment));
			dispatch(setCurrentSegmentIndex(playingIndex));
			calculateCurrentHighlightIndex(nextSegment);
		}
	};

	const getSegmentAt = (time: number, playlist: playlistItem) => {
		let playingIndex = -1;
		if (!props.isPortal) {
			const nextSegment = playlist.segments.filter(
				(
					s: segment,
					i: number
				) => {
					if (
						(isHighlightMode ? s.highlightsOnlyStart : s.start) <=
						time &&
						(isHighlightMode ? s.highlightsOnlyEnd : s.end) >=
						time
					) {
						playingIndex = i;
						return true;
					}
				}
			)[0];

			return [nextSegment, playingIndex];
		}
		else {
			return [playlist.highlights[0], 0];
		}
	};

	const onSegmentChanged = (newSegment: segment) => {
		if (newSegment === undefined || newSegment === null) {
			return;
		}

		if (props.isPortal) {
			const videoSource = props.data.highlightVideos[sessionIndex].highlightsOnlyStream;
			if (
				videoSource &&
				!segmentsWatched.includes(newSegment.id)
			) {
				segmentsWatched.push(newSegment.id);
				TrackEvent(
					"Highlight View",
					new Map([
						["name", newSegment?.title],
						["id", newSegment?.id],
						["Project Title", props.meta.title],
						["Project ID", props.pid],
						["Author ID", props.meta?.authorId],
						["file", videoSource.src],
					])
				);
			}
		}
		else if (newSegment != null && !segmentsWatched.includes(newSegment.id)) {
			segmentsWatched.push(newSegment.id);
			TrackEvent(
				newSegment.isHighlight ? "Highlight View PP" : "Segment View",
				new Map([
					["name", newSegment.title],
					["id", newSegment.id],
					["Project Title", props.meta.title],
					["Project ID", props.pid],
					["Author ID", props.meta?.authorId],
					["streamUrl", props.data.sessionPlaylist[sessionIndex].fullStream],
				])
			);
		}
	};

	function trackWatchedTime(trackedSegment: segment) {
		if (trackedSegment == null) {
			return;
		}
		if (lastReportedTimestamp && Date.now() - +lastReportedTimestamp >= 500) {
			// console.log("Time watched = ", Date.now() - +lastReportedTimestamp);
			// Please don't remove this until bug #694 is resolved
			const currentPlaylist = props.isPortal ? props.data.highlightVideos[sessionIndex] : props.data.sessionPlaylist[sessionIndex];
			TrackEvent(
				"TimeWatched",
				new Map([
					["Project Title", props.meta.title],
					["Project ID", props.pid],
					["Author ID", props.meta?.authorId],
					[
						"Is Highlight",
						trackedSegment?.isHighlight.toString() ?? "",
					],
					["Is Widget", props.isPortal.toString()],
					[
						"id", trackedSegment?.id ?? "-",
					],
					[
						"name", trackedSegment?.title ?? "-",
					],
					[
						"Session Title",
						currentPlaylist.title ?? "_",
					],
					["Milliseconds", (Date.now() - +lastReportedTimestamp).toString()],
				])
			);
			if (!isPlayerPaused) {
				setLastReportedTimestamp(new Date());
			}
		}

		if (isPlayerPaused) {
			setLastReportedTimestamp(null);
		}
	}

	function checkSkipTo() {
		if (skipTo != -1) {
			currentPlaybackPosition = skipTo;
			trackSegmentChanged();
			player?.currentTime(skipTo / 1000);
			player?.play();
			dispatch(setSkipToTime(-1));
		}
	}

	function handleSessionChange() {
		if (!props.isPortal) {
			setSegmentsWatched([]);
		}
		let session = sessions[sessionIndex];
		let tempSessionIndex = sessionIndex;
		if (isHighlightMode) {
			while (!session.highlightsOnlyStream && tempSessionIndex < sessions.length - 1) {
				tempSessionIndex++;
				session = sessions[tempSessionIndex];
			}
			if (!session.highlightsOnlyStream) {
				// console.log("reached end of stream ", tempSessionIndex);
				dispatch(setCurrentSessionIndex(0));
				player?.pause();
				return;
			}
			dispatch(setCurrentSessionIndex(tempSessionIndex));
		}

		if (session) {
			const toPlay: streamSource = props.isPortal || isHighlightMode ? session.highlightsOnlyStream : session.fullStream;
			//console.log(toPlay);
			player?.src(toPlay.src);
			currentPlaybackPosition = 0;
			dispatch(setCurrentSegment(null));
			if (!isPlayerPaused) {
				player?.play();
			}
		}
		if (segmentPlaying != null) {
			trackWatchedTime(segmentPlaying);
		}
	}

	function checkAudio() {
		if (player != null && Math.floor(player.volume() * 100) != volume) {
			player.volume(volume / 100);
		}
	}

	function calculateCurrentHighlightIndex(nextSegment: segment) {
		let index: number | null = null;
		if (props.isPortal) {
			return 1;
		}
		if (nextSegment?.isHighlight) {
			props.data.sessionPlaylist[sessionIndex].highlights.filter(
				(
					s: segment,
					i: number
				) => {
					if (
						s.id == nextSegment.id
					) {
						index = i;
						return true;
					}
				});
		}
		//console.log("setting current highlight index:", index);
		dispatch(setCurrentHighlightIndex(index));
	}

	return <div></div>;
}
