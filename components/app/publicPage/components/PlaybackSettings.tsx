import { BaseOfHighlightDiv, HighlightsOnlyModeSwitch, TalkModeSwitch } from "../styles/PublicPageStyles";
import { isHighlightsOnlyMode, setIsHighlightsOnlyMode } from "../../../state/playlistState";

import {COLORS} from "../../../styles/colors";
import HighlightIcon from "../../../../public/images/Highlights_Only.svg";
import React from "react";
import { playlistItem } from "../../../../APITypes/PlaylistItem.cs";
import { segment } from "../../../../APITypes/Segment.cs";
import { useAppSelector } from "../../../state/hooks";
import { useDispatch } from "react-redux";

export default function PlaybackSettings(props: {
	lightmode: boolean;
	windowWidth: number;
	widgetMode: boolean;
	highlightsArray: segment[];
	playList: playlistItem[];
}): JSX.Element {
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useDispatch();
	const isHighlightMode = useAppSelector(isHighlightsOnlyMode);
	return (
		<BaseOfHighlightDiv
			baseOfHighlightDivHide={false}
			lightmode={props.lightmode}
			talkMode={isHighlightMode}
		>
			<p className="fullResearchPlayback">
				Full Research
				<br /> Playback
			</p>

			{/* Conditionally Hide the HighLights only Mode Optionality
                  When Highlights are not present */}

			{props.playList.some(
				(p: playlistItem) => p.highlights.length > 0
			) &&
				<>
					<HighlightsOnlyModeSwitch>
						<HighlightIcon
							width="50px"
							style={{
								marginBottom: "0.618rem",
								fill: !isHighlightMode
									? !props.lightmode
										? "#43434D"
										: "transparent"
									: !props.lightmode
										? `${COLORS.mellowYellow}`
										: "rgba(50,80,100,0.5)",
								transition: "fill 0.3s ease",
							}}
						/>
						<TalkModeSwitch
							talkMode={isHighlightMode}
							lightmode={props.lightmode}
							onClick={() => {
								dispatch(setIsHighlightsOnlyMode(!isHighlightMode));
							}}
						>
							<div className="circle" />
						</TalkModeSwitch>
					</HighlightsOnlyModeSwitch>

					<p className="HighlightsOnlyMode">
						Highlights <br /> Only
					</p>
				</>
			}
		</BaseOfHighlightDiv>
	);
}