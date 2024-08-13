/* eslint-disable indent */

import { BiScreenshot, BiWebcam } from "react-icons/bi";
import styled, { css, keyframes } from "styled-components";

import { BsInfo } from "react-icons/bs";
import { BsPlayFill } from "react-icons/bs";
import {COLORS} from "../../../styles/colors";
import { CgScreen } from "react-icons/cg";
import DIMENSIONS from "../../../styles/GlobalDimensions";
import { IoChevronDownCircle } from "react-icons/io5";

const WidgetColor = COLORS.purple.default;
const LightModeWidgetColor = COLORS.StoneLightWhiteGrey;
const transBlack = "rgba(0,0,0,0.8)";
const PlayerChromeHeight = "26px";
const mobileBreakpoint = `${DIMENSIONS.breakPoints.mobile}px`;
const loaderSize = 4.2;
//
const fontSize = 16;

export const LockedMobileHeaderDiv = styled.div`
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const IoChevronDownCircleStyled = styled(IoChevronDownCircle)``;

export const InputFile = styled.input`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  border: #efe3cd solid 1px;
  margin: 1em;
  padding: 0.3rem;
  transition: padding 1s ease;
  color: #efe3cd;
  width: 600px;

  &:focus {
    padding: 1.5rem;
    transition: padding 1s ease;
    width: 800px;
  }
`;

// Full Container of Player

export const PlayerWebWrapper = styled.div<{ lightmode: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) => props.lightmode && "white"}; //
  @media screen and (min-width: ${mobileBreakpoint}) {
    min-height: 0;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
`;

export const PlayerWeb = styled.div<{
	lightmode: boolean;
	fixedHeight: number;
}>`
  background: ${(props) =>
		props.lightmode ? `${COLORS.StoneLightWhiteGrey}` : "#030303"};
  //
  position: relative;
  // Experimental Fixed height to Stop flash
  min-height: ${(props) => props.fixedHeight && props.fixedHeight}px;
  //
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //
  flex: 1;
  height: 100%;
  //
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  /* Chrome Visible Only in widget */

  @media screen and (max-width: ${mobileBreakpoint}) {
    overflow-x: hidden;
    width: 100vw;
    //
    height: 100%;
    width: calc(100vw + 9px);
  }
`;

// Container for the Actual Player (allowing us to center the video)

export const PlayerContainerDiv = styled.div<{
	lightmode: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
  z-index: 99;
  background-color: ${(props) =>
		!props.lightmode ? `${COLORS.StoneClassyDarkColorBG}` : "transparent"};

  // Below average Screen

  @media screen and (min-width: 967px) {
    padding: 0 7.78%;
  }

  // Medium Screen

  @media screen and (min-width: 968px) and (max-width: 1400px) {
    padding: 0 8.98%;
  }

  // Wide and Short Screen

  @media screen and (max-height: 650px) and (max-width: 1500px) {
    padding: 0 16.68%;
  }

  // Medium and Short Screen

  @media screen and (max-height: 800px) and (max-width: 1024px) {
    padding: 0 0%;
  }

  // Chevron Arrow sizing

  .arrows {
    margin: 0 1em;
    width: 80px;
    height: 80px;
    top: calc(50% - 40px);
  }

  .arrows {
    margin: 0 0.5rem;
    width: 60px;
  }

  // Left and Right arrow buttons

  .ChevronLeft {
    left: 0;
    z-index: 99;
    align-items: center;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 450px) {
      display: none;
    }

    &:hover {
      .arrows {
        transform: translateX(-4px);
        transition: transform 0.4s ease;
      }
    }
    .arrows {
      transition: transform 0.4s ease;
      transform: translateX(0px);
    }
  }

  .ChevronRight {
    right: 0;
    align-items: center;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 450px) {
      display: none;
    }

    &:hover {
      .arrows {
        transform: translateX(-4px);
        transition: transform 0.4s ease;
      }
    }
    .arrows {
      transition: transform 0.4s ease;
      transform: translateX(0px);
    }

    @media screen and (max-width: 450px) {
      display: none;
    }
  }
`;

export const TitleAndLightModeSwitch = styled.div<{
	lightmode: boolean;
	visible: boolean;
}>`
  display: ${(props) => (props.visible ? "none" : "flex")};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: ${(props) =>
		props.lightmode ? COLORS.StoneLightWhiteGrey : "transparent"};
`;

export const ShowInfoButton = styled.div<{
	descriptionShow: boolean;
	lightmode: boolean;
}>`
  background: ${(props) =>
		props.lightmode ? "white" : `${COLORS.StoneClassyDarkColor}`};
  width: ${(props) => (props.descriptionShow ? "45px" : "35px")};
  height: 45px;
  position: absolute;
  left: ${(props) => (props.descriptionShow ? "-45px" : "-35px")};
  z-index: 100;
  //
  display: flex;
  justify-content: center;
  align-items: center;
  //
  cursor: pointer;
  //
  border-radius: 0 0 0 16px;

  &:hover {
    background: ${COLORS.purple.rollover};
    color: ${COLORS.StoneLightWhiteGrey};
  }

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const BsInfoStyled = styled(BsInfo) <{ lightmode: boolean }>`
  fill: ${(props) =>
		props.lightmode ? COLORS.purple.rollover : COLORS.StoneLightWhiteGrey};
  width: 30px;
  height: 30px;

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const FindingsDiv = styled.div<{
	lightmode: boolean;
	isFindingsShowing: boolean;
}>`
  visibility: ${(props) => (props.isFindingsShowing ? "visible" : "hidden")};
  //
  position: absolute;
  //
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2em 3em;
  overflow-y: auto;

  .metaDescriptionCloseButtonDiv {
    position: absolute;
    //
    right: 0;
    top: 0;
    margin: 1em;
    padding: 0.38rem;
    border-radius: 100%;
    display: block;
    background: #ffffff10;
    cursor: pointer;

    &:hover {
      background: #ffffff18;
    }

    &:hover > .metaDescriptionCloseButton {
      stroke-width: 2.34rem;
      stroke: ${COLORS.StoneLightWhiteGrey};
      transition: stroke 0.3s ease;
    }

    .metaDescriptionCloseButton {
      stroke-width: 1.14rem;
      stroke: ${COLORS.StoneLightWhiteGrey};
      transition: stroke 0.3s ease;
    }
  }
  //
  z-index: 998;
  color: ${COLORS.StoneLightWhiteGrey};
  //
  background: ${COLORS.StoneClassyDarkColor};
  backdrop-filter: blur(2px);
  P {
    font-size: 1.58rem;
    line-height: 1.62;
  }
  h4 {
    font-size: 1.6rem;
    max-width: 269px;
  }
  h5 {
    font-size: 1.3rem;
    padding-bottom: 1.02rem;
  }
  //
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const MetaArea = styled.div<{
	lightmode: boolean;
}>`
  background: ${(props) =>
		!props.lightmode ? "transparent" : `${COLORS.StoneLightWhiteGrey}`};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  left: -14px;
  opacity: 0.666;
  font-family: "Cabin", sans-serif;
  border-radius: 4px;
  padding: 0.5rem;

  h5 {
    font-size: 16px;
    padding: 0 1em;
    color: ${(props) =>
		props.lightmode
			? `${COLORS.purple.DeepPurple}`
			: `${COLORS.StoneLightWhiteGrey}`};
    margin: 0;
    position: relative;
    top: 7px;
    font-weight: 600;
  }

  /* Number oF Style */

  h5 > .number {
    aspect-ratio: 1/1;
    width: 2em;
    background: ${(props) => (props.lightmode ? "" : `${transBlack}`)};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    border-radius: 100%;
    position: absolute;
    right: -1.5rem;
    top: -0.45rem;
  }

  .spanWithMargin {
    margin-right: 1em;

    @media screen and (max-width: ${mobileBreakpoint}) {
      // Research Duration on Mobile Offset Vertically by a bit
      &.researchDuration {
        position: relative;
        top: -5px;
      }
    }
  }
  // TODO: Mobile skeleton
  .skeleton {
    background-color: #ffffff10;
    margin-right: 0.7rem;
  }

  .skeletonSmall {
    background-color: ${COLORS.mellowYellowTrans50};
    margin-right: 1em;
  }
`;

export const ErrorMessage = styled.div<{ srcError: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background: red;
  height: 400px;
  align-items: center;
  justify-content: center;
`;
export const AbovePlayer = styled.div<{
	lightmode: boolean;
}>`
  display: flex;
  background: ${(props) =>
		props.lightmode
			? `${COLORS.StoneLightWhiteGrey}`
			: `${COLORS.StoneClassyDarkColor}`};
  flex-direction: column;

  .TopRow {
    display: flex;
    width: 100%;
    height: 24px;
    align-items: flex-end;

    @media screen and (max-width: ${mobileBreakpoint}) {
      height: 45px;
    }
  }
`;

export const MainVideoDiv = styled.div`
  margin: -40px auto 0 auto;
  flex: 1;
  width: 99%;
  touch-action: none;
  height: 100%;
  //
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: ${mobileBreakpoint}) and (max-width: 1440px) {
    width: 90%;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    margin: 0 auto;
  }
`;

const mobileBumpLeftAnimation = keyframes`
0%{
  left: 0;
}
50%{
  left: 1.618rem;
}
100%{ 
  left: 0;
}
`;

export const VideoDiv = styled.div<{
	lightmode: boolean;
	mobileBump: string;
	floatMenuIsVisible: boolean;
}>`
  // Video Container Div  CSS
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  //
  width: 100%;
  // TODO: responsive breakpoints (consider bootstrap)

  // disable video controls when share menu is open
  pointer-events: ${(props) => props.floatMenuIsVisible && "none"};
  animation: ${(props) =>
		props.mobileBump == "Left" &&
		css`
      ${mobileBumpLeftAnimation} 0.5s 0.2s cubic-bezier(0.87, 0, 0.13, 1)
    `};
  // Video CSS
  video {
    width: unset !important;
  }

  .video-js {
    max-width: calc(100% * 1.1);
    margin: 0 auto;
    max-height: 300px;
    background: transparent;
  }

  .vjs-control-bar {
    z-index: 1000;
  }
`;

export const Chevrons = styled.div<{ lightmode: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: rgb(18, 18, 18);
  width: 400px;
  background: linear-gradient(
    90deg,
    rgba(18, 18, 18, 0) 0%,
    ${(props) =>
		!props.lightmode
			? `${COLORS.StoneClassyDarkColor}`
			: `${COLORS.StoneLightWhiteGrey}`}
      50%
  );
`;

export const WidgetPlaylistNumber = styled.div<{
	lightmode: boolean;
}>`
  margin: 0 0.666rem;

  span {
    &:first-child {
      margin: 0 6px;
    }

    &:nth-child(3) {
      margin-left: 6px;
    }

    color: ${COLORS.StoneLightWhiteGrey} !important;
    pointer-events: none;
    position: relative;
    top: 4px;
  }
`;

export const PlaylistDiv = styled.div<{ lightmode: boolean }>`
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  overflow-y: hidden;
  align-items: center;
  flex: 1;
  padding: 0.8rem 0.3rem 0.8rem 0.3rem;
  margin: -0.1rem 0 0 0;
  position: relative;
  background: ${(props) => props.lightmode && "#cdcdcd"};
  box-shadow: ${(props) => props.lightmode && "inset 5px 5px 25px #00000013"};
  margin: ${(props) => props.lightmode && "0.3rem"};
  border-radius: ${(props) => props.lightmode && "16px"};

  .playlistItemBusinessCard{
margin-left: auto;  
margin-right: 12px;
div{
	background: ${COLORS.StoneClassyDarkColorBG};
}

}

  &::-webkit-scrollbar {
    width: 0;
    height: 2px;
    border-radius: 10px;
  }

  /*add a shadow to the scrollbar here*/
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
    border-radius: 10px;
  }
`;

const load3 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div<{ offset: number }>`
  position: absolute;
  top: calc(50% - ${loaderSize / 2}em);
  left: calc(50% - ${loaderSize / 2}em);
  font-size: 10px;
  text-indent: -9999rem;
  width: ${loaderSize}em;
  height: ${loaderSize}em;
  border-radius: 50%;
  background: #ffffff;
  background: linear-gradient(
    to right,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  animation: ${load3} 1.75s infinite linear;
  animation-delay: ${(props) => props.offset && `0.1${props.offset}s`};
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  &:after {
    background: ${COLORS.StoneClassyDarkColor};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    top: calc(50% - ${loaderSize / 1.5 / 2}em);
    left: calc(50% - ${loaderSize / 1.5 / 2}em);
    width: ${loaderSize / 1.5}em;
    height: ${loaderSize / 1.5}em;
  }
`;

export const PlaylistItem = styled.div<{
	selected: boolean;
	lightmode: boolean;
	backgroundImage: string;
}>`
  position: relative;
  cursor: pointer;
  min-width: 132px;
  display: block;
  height: 0;
  padding-top: 48.88%;
  margin-right: 9px;
  margin-left: 12px;
  border-radius: 5px;
  overflow: hidden;
  background: #00000020;
  box-shadow: ${(props) =>
		!props.selected
			? "1px 2px 5px #00000020"
			: !props.lightmode
				? "1px 2px 5px #00000020"
				: "1px 2px 5px #00000040"};

  // Medium Breakpoint
  @media screen and (max-width: 967px) {
    width: 100px;
    min-width: unset;
    margin-right: 5px;
    margin-left: 5px;
  }
  @media screen and (max-height: 650px) and (max-width: 1500px) {
    width: 76px;
    min-width: unset;
  }
  // Mobile Breakpoint
  @media screen and (max-width: 425px) {
    width: 90px;
    min-width: unset;
    margin-right: 5px;
    margin-left: 5px;
  }

  border: ${(props) =>
		props.selected
			? `2px solid ${COLORS.mellowYellow}`
			: "2px solid transparent"};
  transition: border 0.3s ease;

  &:hover {
    border: ${(props) =>
		!props.selected && `2px solid ${COLORS.purple.rollover}`};
    transition: border 0.3s ease;
  }
`;

const FadeIn = keyframes`
from{
opacity: 0;
}
to{
opacity: 1;
}
`;

export const HighlightBadge = styled.span`
  border: solid ${COLORS.mellowYellow} 0;
  min-width: 40px;
  margin: 4px 3px;
  color: ${COLORS.mellowYellow};
  position: absolute;
  top: 0;
  border-radius: 4px;
  right: 0;
  padding: 0.1rem 0.4rem;
  background: ${transBlack};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  animation: ${FadeIn} 0.5s forwards ease;

  .number {
    font-size: 14px;
    margin-left: 4px;
  }

  // Medium Breakpoint
  @media screen and (max-width: 967px) {
    min-width: 30px;
    right: 20px;
    margin: 5px;
  }
  @media screen and (max-height: 700px) {
    min-width: 30px;
    right: 0px;
    margin: 0px;
  }
  // Mobile Breakpoint
  @media screen and (max-width: 425px) {
    min-width: 50px;
    margin: 3px;
    font-size: 12px;
  }
`;

export const BiWebcamStyled = styled(BiWebcam) <{ color: string }>`
  font-size: ${fontSize}px;
  position: relative;
  right: -6px;
  // Medium Breakpoint
  @media screen and (max-width: 967px) {
    font-size: 14px;
  }
  // Mobile Breakpoint
  @media screen and (max-width: 425px) {
    font-size: 12px;
  }
`;

export const CgScreenStyled = styled(CgScreen) <{ color: string }>`
  font-size: ${fontSize}px;
  margin-right: 6px;
  position: relative;
  left: -6px;
  display: none !important;
  // Medium Breakpoint
  @media screen and (max-width: 967px) {
    font-size: 14px;
  }
  // Mobile Breakpoint
  @media screen and (max-width: 425px) {
    font-size: 12px;
  }
`;

export const BiProjectStyled = styled(BiScreenshot)`
  color: ${COLORS.StoneLightWhiteGrey};
  font-size: ${fontSize}px;
  // Medium Breakpoint
  @media screen and (max-width: 967px) {
    font-size: 14px;
  }
  // Mobile Breakpoint
  @media screen and (max-width: 425px) {
    font-size: 12px;
  }
`;

export const DurationSpan = styled.div`
  background: ${transBlack};
  padding: 0.3rem;
  margin: 0.3rem;
  border-radius: 4px;
  position: absolute;
  bottom: 0;
  right: 0;
  display: none;
  color: ${COLORS.StoneLightWhiteGrey};
`;

const FadeOutSoon = keyframes`
0%{
opacity:1 ;
}
12.5%{
opacity:0.75 ;
}
25%{
opacity:1 ;
}
37.5%{
opacity:0.75 ;
}
50%{
  opacity:1
}
85%{
opacity:1 
}
100%{
opacity: 0
}
`;

export const BaseOfHighlightShowButtonDiv = styled.div<{
	baseOfHighlightDivHide: boolean;
}>`
  position: fixed;
  bottom: ${(props) => (props.baseOfHighlightDivHide ? "0" : "120px")};
  display: flex;
  z-index: 9999;
  width: 100vw;
  background: ${(props) =>
		props.baseOfHighlightDivHide
			? `${COLORS.StoneClassyDarkColorDarkened}`
			: "transparent"};
  color: ${COLORS.StoneLightWhiteGrey};
  box-shadow: -13px 0px 10px black;

  .message {
    display: ${(props) => (props.baseOfHighlightDivHide ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    flex: 1;
    animation: ${FadeOutSoon} 2s forwards;
    animation-delay: 0.1s;

    p {
      margin: 0;
      opacity: 0.8;
      padding: 0;
      color: ${COLORS.mellowYellow};
      &.fullResearchPlayback {
        color: ${COLORS.StoneLightWhiteGrey};
      }
    }
  }

  button {
    background: ${(props) =>
		props.baseOfHighlightDivHide
			? "#ffffff10"
			: `${COLORS.StoneClassyDarkColor}`};
    padding: 1em;
    border: ${(props) =>
		props.baseOfHighlightDivHide
			? "none"
			: `solid 1px ${COLORS.mellowYellow}`};
    border-bottom: none;
    color: ${COLORS.StoneLightWhiteGrey};
    display: flex;
    border-radius: ${(props) =>
		props.baseOfHighlightDivHide ? "0 6px 6px 0" : "6px 6px 0 0"};
    flex-direction: row;
    align-items: center;
    width: 180px;
    justify-content: center;
    margin-left: ${(props) =>
		!props.baseOfHighlightDivHide ? "calc(100vw - 180px)" : "0px"};
    transition: margin-left 0.5 ease-in-out;

    p {
      margin: 0;
      padding: 0;
      margin-left: 0.3rem;
    }
  }
`;

export const BaseOfHighlightDiv = styled.div<{
	talkMode: boolean;
	lightmode: boolean;
	baseOfHighlightDivHide: boolean;
}>`
  margin: 0 auto;
  left: 0;
  right: 0;
  padding-top: 1rem;
  background: ${(props) =>
		props.lightmode ? "white" : COLORS.StoneClassyDarkColorDarkened};
  border-left: ${(props) =>
		!props.lightmode && `${COLORS.StoneClassyDarkColorDarkened} 2px solid`};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  & > p {
    text-align: center;
    display: block;
    margin-top: 0.618rem;
    width: 100px;
    font-size: 13px;
    border-radius: 5px;
    padding: 0.5rem 0.2rem;
    transition: background, color, border 0.33s ease;

    &.fullResearchPlayback {
      margin-left: 3px;
      border: ${(props) =>
		!props.talkMode
			? `${COLORS.mellowYellow} solid 1px`
			: `${COLORS.StoneMediumGreyColor} solid 1px`};
      background: ${(props) =>
		!props.talkMode
			? !props.lightmode
				? `${COLORS.mellowYellowTrans50}`
				: `${COLORS.StoneClassyDarkColor}`
			: "none"};
      color: ${(props) =>
		!props.talkMode
			? `${COLORS.mellowYellow}`
			: !props.lightmode
				? `${COLORS.purple.cadenceLavender}`
				: `${COLORS.purple.DeepPurple}`};
    }

    &.HighlightsOnlyMode {
      border: ${(props) =>
		props.talkMode
			? `${COLORS.mellowYellow} solid 1px`
			: `${COLORS.StoneMediumGreyColor} solid 1px`};
      background: ${(props) =>
		props.talkMode
			? !props.lightmode
				? `${COLORS.mellowYellowTrans50}`
				: `${COLORS.StoneClassyDarkColor}`
			: "none"};
      color: ${(props) =>
		props.talkMode
			? `${COLORS.mellowYellow}`
			: !props.lightmode
				? `${COLORS.purple.cadenceLavender}`
				: `${COLORS.purple.DeepPurple}`};
    }
  }

  @media screen and (min-width: ${mobileBreakpoint}) {
    position: absolute;
    bottom: 45px;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    flex: 1;
    background: ${COLORS.StoneClassyDarkColor};
    border-top: solid 1px #ffffff30;
    display: ${(props) => props.baseOfHighlightDivHide && "none"};
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    z-index: 900;
  }
`;

export const HighlightsOnlyModeSwitch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5rem;
  justify-content: space-between;

  // Medium Breakpoint
  @media screen and (max-width: 967px) {
    margin: 0 0.3rem;
    flex-direction: column;
    justify-content: center;
  }
  // Mobile Breakpoint
  @media screen and (max-width: ${mobileBreakpoint}) {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
`;

export const TalkModeSwitch = styled.div<{
	lightmode: boolean;
	talkMode: boolean;
}>`
  background: #333333;
  background: ${(props) =>
		!props.talkMode
			? !props.lightmode
				? "rgba(51, 51, 51, 1)"
				: "rgba(210, 200, 190, 1)"
			: !props.lightmode
				? "rgba(10, 255, 140, 1)"
				: `${COLORS.mellowYellow}`};
  border-style: solid;
  border-color: ${(props) =>
		!props.talkMode ? "rgba(255, 227, 191, 0.5)" : "rgba(255, 227, 191, 1)"};
  border-width: 1px;
  border-radius: 25px;
  width: 48px;
  height: 28px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin: 0 0;
  transition: background, border-color, 0.3s ease;
  box-shadow: inset 2px 3px 6px rgba(0, 0, 0, 0.5);

  .circle {
    background: #0aff8c;
    background: ${(props) =>
		props.talkMode
			? !props.lightmode
				? "rgba(51, 51, 51, 1)"
				: `${COLORS.StoneClassyDarkColor}`
			: !props.lightmode
				? "rgba(10, 255, 140, 1)"
				: `${COLORS.mellowYellow}`};
    border-radius: 22.5px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    display: block;
    height: 23px;
    min-width: 23px;
    position: absolute;
    margin: 2px;
    right: ${(props) => (props.talkMode ? "0" : "20px")};
    transition: right, background, top, 0.6s ease;
    top: ${(props) => (!props.talkMode ? "-1px" : " ")};
  }
`;

export const LightModeSwitch = styled.div<{ lightmode: boolean }>`
  background: ${(props) =>
		props.lightmode ? "rgba(136, 136, 136, 0.8)" : "rgba(50, 56, 140, 0.8)"};
  border-style: solid;
  border-color: ${(props) =>
		props.lightmode ? "rgba(106, 106, 106, 0.8)" : "rgba(255, 227, 191, 0.1)"};
  border-width: 1px;
  border-radius: 12.5px;
  width: 40px;
  height: 25px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: background, border-color, 0.3s ease;
  box-shadow: inset 2px 3px 6px rgba(0, 0, 0, 0.5);

  .circle {
    background: rgba(51, 51, 51, 1);
    background: ${(props) =>
		!props.lightmode ? "rgba(251, 251, 251, 1)" : "aliceblue"};
    border-radius: 22.5px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    display: block;
    height: 22.5px;
    min-width: 22.5px;
    position: absolute;
    margin: 1px;
    right: ${(props) => (!props.lightmode ? "0" : "14.5px")};
    transition: right, background, top, 0.6s ease;
    top: ${(props) => (props.lightmode ? "-1.5px" : "-1px")};
  }
`;

export const HighLights_Playlist_Title_Button = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;

  position: absolute;
  right: 22px;
  top: 48px;

  h1 {
    cursor: pointer;
    padding: 1em;
    letter-spacing: 0.01rem;
    transition: letter-spacing 0.3s ease;
    margin: 0 0;
    padding: 0.5rem 0;
    font-size: 18px;
    &:hover {
      letter-spacing: 0.1rem;
      transition: letter-spacing 0.3s;
    }
  }
`;

export const HighLights_Playlist_Column = styled.div<{
	lightmode: boolean;
	playListMode: boolean;
}>`
  display: block;
  background: ${(props) =>
!props.lightmode ? `${COLORS.StoneClassyDarkColorDarkened}` : "White"};
  min-width: 320px;
  position: relative;
  top: 0;

  @media screen and (min-width: ${mobileBreakpoint}) {
    height: calc(100vh - ${(props) => !props.lightmode ? "142px" : "152px"});
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    overflow-y: scroll;
    flex: ${(props) => (props.playListMode ? "0.72" : "1")};
    transition: margin-bottom 0.17s cubic-bezier(0, 0.21, 0.355, 1);
    max-height: ${(props) => !props.playListMode && "calc(25% + 1vh)"};
    min-height: ${(props) => !props.playListMode && "39vh"};
  }

  @media screen and (min-width: 1025px) {
    min-width: 450px;
  }
`;

export const HighlightsPlaylistStyle = styled.div<{
	lightmode: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  transition: width, padding-left, 1s ease;
  flex-grow: 1;
  width: 100%;
  overflow-x: hidden;
  color: ${(props) => (props.lightmode ? WidgetColor : LightModeWidgetColor)};

  // Early Technology Version of Styling Scrollbars (Only in Firefox)

  // Custom Scrollbars

  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-track {
    background: ${COLORS.StoneClassyDarkColor};
    border-radius: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.purple.rollover};
    border-radius: 7px;
    border: 3px solid ${COLORS.purple.rollover};
  }

  @media screen and (min-width: ${mobileBreakpoint}) {
    height: calc(100% - 214px);
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    padding-right: 1em;
  }
`;

export const HighlightsPlaylistItemTitle = styled.h5<{
	lightmode: boolean;
}>`
  color: ${(props) => (props.lightmode ? WidgetColor : LightModeWidgetColor)};
  display: flex;
  position: relative;
  /* top: 7px; */
  font-weight: normal;
  font-size: ${fontSize}px;
  pointer-events: none;
  text-transform: capitalize;
  margin: 0;
  padding: 0;

  span {
    width: 293px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

	 @media screen and (min-width: 1025px) {
    width: 363px;
  }

    @media screen and (max-width: ${mobileBreakpoint}) {
      width: calc(100vw * 0.7);
      margin-right: 8px;
    }
  }
`;

export const HighlightsPlaylistItem = styled.div<{
	lightmode: boolean;
	selected: boolean;
	isPlayerBuffering: boolean;
}>`
  position: relative;
  cursor: pointer;
  min-height: 50px;
  height: 50px;
  width: 100%;
  z-index: 800;

  &:last-child {
    @media screen and(max-width: ${mobileBreakpoint}) {
      margin-bottom: 5rem;
    }
  }

  @media screen and(max-width: ${mobileBreakpoint}) {
    width: calc(100 % - 6px);
  }

  &:hover {
    background: ${(props) =>
		props.selected
			? !props.lightmode
				? "#FFFFFF15"
				: "#00000015"
			: !props.lightmode
				? "#FFFFFF10"
				: "#00000010"};
  }

  .boundingBoxTrigger {
    cursor: pointer;
    z-index: 99;
    background: transparent;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
  }

  .boundingBox {
    transition: opacity 1.3s ease;
    animation-delay: 0.3s;
    border: solid transparent 1px;
    transition: border ease-in 0.3s;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid transparent;
    border-left: 3px solid transparent;
    padding: 0.6rem 0.2rem 0.6rem 0rem;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    // Selected State

    border-bottom: ${(props) =>
		props.selected && `1px solid ${COLORS.mellowYellow}`};
    border-left: ${(props) =>
		props.selected && `2px solid ${COLORS.mellowYellow}`};
    border-right: ${(props) =>
		props.selected && `1px solid ${COLORS.mellowYellow}`};
    border-top: ${(props) =>
		props.selected && `1px solid ${COLORS.mellowYellow}`};
    background: ${(props) =>
		props.selected && !props.lightmode
			? "rgba(255, 255, 255, 0.1)"
			: "transparent"};
    border-radius: 0 4px 0 0;

	// buffering state

	opacity: ${(props) => props.isPlayerBuffering && 0.5};

    h5 {
      letter-spacing: -0.01em;
      font-family: "Cabin", sans-serif;
      font-weight: 600 !important;
    }

    // Medium Breakpoint
    @media screen and(max-width: 967px) {
      width: calc(100 % - 4px);
      margin-left: 8px;
    }

    .HighLightStartTime {
      display: flex;
      justify-content: end;
      flex: 1;
      padding-right: 6px;
      p {
        margin: 0;
        padding: 0;
        opacity: 0.9;
        text-align: right;
        letter-spacing: 0.01em;
        font-family: sans-serif;
        font-size: 15px;
      }
    }
  }
`;

export const HighlightBsPlayFill = styled(BsPlayFill)`
  width: 21px !important;
  height: 21px !important;
`;

export const PlaylistChangeButton = styled.button`
  background: rgba(255, 255, 255, 0.03);
  color: #fafafa;
  width: 100%;
  display: inline-block;
  padding: 3em 0;
  border: solid 1px grey;
  margin: 1em 0;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
  }

  &:active,
  &:focus {
    outline: solid 1px #9966ff;
  }

  .Project_Title {
    font-size: 18px;
    font-family: "Cabin", sans-serif;
  }
`;

export const PlayerLoadingFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
  background: black;
  position: relative;
`;

export const PlayerAndHighlightFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
  position: relative;

  .widgetPlayerBG {
    position: absolute;
    top: 1px;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 34px;
    z-index: 1;
    display: block;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
  }
`;

export const NoProject404Div = styled.div`
  background: ${COLORS.StoneLightWhiteGrey};
  position: absolute;
  top: ${DIMENSIONS.heights.navbar.standard}px;
  width: 100%;
  display: flex;
  bottom: 0;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const UnderPlayer = styled.div`
  flex: 1;
  width: calc(100% - 320px);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

// const ItemChangingDirection = (mode: any) => {
//   switch (mode) {
//     case "itemChangingLeft":
//       return `padding-left: 0.8rem ; color: ${COLORS.mellowYellow}`;
//     case "itemChangingRight":
//       return `padding-left: 1.2rem ; color: ${COLORS.mellowYellow}`;
//     case "static":
//       return `padding-left: 1em`;
//   }
// };

export const NowPlayingTitle = styled.div<{
	lightmode: boolean;
}>`
  margin: 0 0 0.8rem 0;
  padding-top: 0.8rem;
  border-radius: 4px 4px 0 0;
  padding: 0.5rem;
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Cabin", sans-serif;
  background: ${(props) =>
		props.lightmode ? "White" : `${COLORS.StoneClassyDarkColor}`};
  border-bottom: ${(props) =>
		props.lightmode ? "solid 1px #00000010" : "solid 1px #FFFFFF30"};
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: -2px 0 1px #00000050;

  & > span {
    text-align: left;
    width: 100%;
    font-weight: 500;
    line-height: 20px;
    font-size: 1rem;
    color: ${(props) => !props.lightmode && "white"};
    transition: padding, color, 0.3s ease;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    margin: 0;
    border-radius: 0;
    max-width: 100vw;
  }
`;

const gradient = keyframes`{
	0% {
		background-position: 0% 0%;
	}
	100% {
		background-position: 100% 0%;
	}
}
`;

export const RatingDiv = styled.div`
  border: 1px solid ${COLORS.purple.cadenceLavender}30;
  padding: 6px 20px 3px 20px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${COLORS.purple.DeepPurple}10;
`;

export const BaseDiv = styled.div<{ lightmode: boolean; playing: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  left: 0;
  background: ${(props) =>
		props.lightmode
			? `${COLORS.StoneLightWhiteGrey}`
			: `${COLORS.StoneClassyDarkColorDarkened}`};
  padding: 0 15px 0 10px;
  height: 50px;
  border-radius: 4px;
  right: 0;
  color: ${(props) => !props.lightmode && `${COLORS.StoneLightWhiteGrey}`};

  .countDown {
    background: linear-gradient(
      -90deg,
      ${COLORS.purple.rollover} 0%,
      ${COLORS.purple.rollover} 48%,
      #685bd6 51%,
      ${COLORS.purple.rollover} 100%
    );
    color: ${COLORS.StoneLightWhiteGrey};
    padding: 0.3rem 0.5rem !important;
    border-radius: 6px;
    pointer-events: none;
    margin-right: -6px !important;
    animation: ${(props) =>
		props.playing &&
		css`
        ${gradient} 1s ease infinite
      `};
    background-size: 400% 400%;
  }

  .metaForTitle {
    display: flex;
    height: 100%;
    align-items: center;

    p {
      padding: 0;
      margin: 0;
      pointer-events: none;
    }
  }

  @media screen and (max-width: 420px) {
    display: none;
  }
`;

export const ShareAndViewDiv = styled.div<{
	lightmode: boolean;
	playing: boolean;
}>`
  border-top: solid 1px #ffffff30;
  flex: 1;
  display: flex;
  height: 30px;
  // Just for main
  opacity: 0;
  margin-bottom: -30px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  h4 {
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: ${COLORS.StoneLightWhiteGrey};

    &:nth-child(2) {
      padding-left: 6px;
    }
  }
`;

export const CurrentHighlightTitle = styled.h4<{ switching: boolean }>`
  flex: 1;
  font-size: ${fontSize}px;
  text-transform: capitalize;
  margin: 0;
  padding: 0;
  font-family: "Cabin", sans-serif;
  letter-spacing: -0.023rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: opacity 0.45s ease-out;
  opacity: 1;
  margin-left: 15px;

  &.switchingHighlight {
    opacity: 0;
    transition: opacity 0s;
  }
`;

export const WidgetTitleOfHighlight = styled.div`
  color: ${COLORS.StoneLightWhiteGrey};

  position: relative;
  font-size: 13px;
  height: calc(${PlayerChromeHeight} - 3px);

  padding-bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  p {
    right: 0px;
    padding-left: 1rem;
    /* line-height: 3px; */
    margin: 0px 1rem 0px 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
    max-width: 80vw;
  }
`;
export const PlaylistPositionDisplay = styled.div<{ lightmode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.4rem;
  margin-top: 3px;
  margin-bottom: 3px;

  & > p {
    border-radius: 5px;
    line-height: 0;
    border: 1px solid ${COLORS.StoneMediumGreyColor};
    color: ${(props) =>
		!props.lightmode
			? `${COLORS.StoneLightWhiteGrey}`
			: `${COLORS.StoneClassyDarkColor}`};
    display: block;
    margin-left: 1.5rem;
    padding: 1.5rem 0.8rem;
    margin-top: 1em;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const MutedIndicator = styled.button<{
	lightmode: boolean;
}>`
  display: none;
  border: solid 1px white;
  background: #ffffffd8;
  position: absolute;
  border-radius: 3px;
  top: 43px;
  left: 3%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    text-transform: uppercase;
    padding: 0.66rem;
    margin: 0;
    pointer-events: none;
    cursor: default !important;
    font-size: 1.23rem;
    font-weight: bold;
    color: #000000;
    span > svg {
      fill: #000000;
      margin: -5px 0.5rem 0 0;
    }
  }
`;

export const BigPlayButton = styled.button<{
	isPaused: boolean;
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 290px;
  width: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998;
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.7));
  border: 0;
  background: 0;
  border-radius: 100%;
  transition: opacity 0.2s 0.2s ease;
  // Animated Propertes:
  opacity: ${(props) => (props.isPaused ? "1" : "0")};
  visibility: ${(props) => (props.isPaused ? "visible" : "hidden")};
  pointer-events: ${(props) => (props.isPaused ? "all" : "none")};

  @media screen and (max-width: 599px) {
    height: 80px;
    width: 80px;
  }

  @media screen and (max-width: 350px) {
    height: 52px;
    width: 52px;
  }

  svg {
    fill: ${COLORS.StoneLightWhiteGrey} !important;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;
