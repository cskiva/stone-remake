import { currentSegment, isHighlightsOnlyMode } from "../../../state/playlistState";

import React from "react";
import { currentTime } from "../../../state/videoPlayerState";
import { durationMsToShortString } from "../../../../helpers/helpers";
import { segment } from "../../../../APITypes/Segment.cs";
import { useAppSelector } from "../../../state/hooks";

export default function NextHighlightTimer(props: { highlightsArray: segment[] }) {
	// Redux state
	const playingSegment = useAppSelector(currentSegment);
	const isHighlightMode = useAppSelector(isHighlightsOnlyMode);
	const playbackPosition = useAppSelector(currentTime);

	if (isHighlightMode || props.highlightsArray.length < 1) {
		return <></>;
	}

	const nextHighlight = props.highlightsArray.find(h => h.start > playbackPosition);
	const hasHighlightPlayed = playbackPosition < props.highlightsArray[0]?.start;

	return <>
		{playingSegment?.isHighlight &&
			<p className="countDown">
				{durationMsToShortString(playingSegment?.end - playingSegment?.start - (playbackPosition - playingSegment?.start), true).replace(/^0m/, "")}
			</p>}
		{!playingSegment?.isHighlight &&
			nextHighlight != null &&
			<p>
				{hasHighlightPlayed ? "First" : "Next"} Highlight In{" "}
				<span>
					{durationMsToShortString(nextHighlight?.start - playbackPosition, true).replace(/^0m/, "")}
				</span>
			</p>}
	</>;
}