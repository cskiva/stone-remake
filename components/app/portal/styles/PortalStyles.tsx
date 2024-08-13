import { BiScreenshot, BiWebcam } from "react-icons/bi";
import styled, { css, keyframes } from "styled-components";

import { COLORS } from "../../../styles/colors";
import { CgScreen } from "react-icons/cg";
import DIMENSIONS from "../../../styles/GlobalDimensions";
import { IoChevronDownCircle } from "react-icons/io5";
import Logo from "../../../../public/images/SVG/logo.svg";
import LogoText from "../../../../public/images/SVG/logoText.svg";

const transBlack = "rgba(0,0,0,0.8)";
const mobileBreakpoint = `${DIMENSIONS.breakPoints.mobile}px`;

export const PortalWrapper = styled.div`
height: 100%;
.fullscreen{
	height: 100%;
}
`;

export const LogoInPortal = styled(Logo)`
  margin-left: 14px;
  transition: opacity 0.3s ease;
  cursor: pointer;

  @media screen and (max-width: ${mobileBreakpoint}) {
    margin-left: 9px;
  }
`;

export const PopUpCallToActionWrapper = styled.div`
  left: 7px;
  bottom: 74px;
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  overflow: hidden;
  height: 67px;

  @media screen and (max-width: ${mobileBreakpoint}) {
    bottom: 73px;
  }
`;

const PopUpAnimation = keyframes`
0%{
  top: 58px;
}
69%{
  top: -8px;
}
100%{
  top: 0px;
}
`;

export const PopUpCallToActionStyle = styled.div<{ videoStarted: boolean }>`
  top: ${(props) => (props.videoStarted ? "58px" : "unset")};
  height: 57px;
  opacity: ${(props) => (!props.videoStarted ? "0" : "1")};
  visibility: ${(props) => (!props.videoStarted ? "hidden" : "visible")};
  transition: opacity 1s ease;
  animation: ${(props) =>
		props.videoStarted
			? css`
          ${PopUpAnimation} 1.5s 1s forwards cubic-bezier(0.280, 0.840, 0.420, 1)
        `
			: "unset"};
  position: relative;
  margin-right: 0.7rem;
  padding: 1rem 1rem 0 1rem;
  border-radius: 16px;
  min-width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation-delay: 1s;

  @media screen and (max-width: ${mobileBreakpoint}) {
    a {
      font-size: 0.9rem !important;
      padding: 0.11rem 0.11rem 0 0.11rem;
    }
  }
`;

export const AlternatingCallToActionStyle = styled.div<{ backgroundColor: string }>`
  width: 100%;
  background: ${(props) => props.backgroundColor};
  height: 29px;
  margin: 0 5px;
  border-radius: 12px;
  flex-direction: row;
  position: relative;
  transition: box-shadow 0.1s ease;

  	&:hover{
		box-shadow: 1px 1px 4px #00000080 ;
		transition: box-shadow 0.1s ease;
		filter: saturate(1.8);
	}

  @media screen and (max-width: ${mobileBreakpoint}) {
        height: 26px;
		top: 2px;
      }

  a {
    width: 100%;
    padding: 0px 0px !important;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    //
    position: absolute;

    p {
      width: 100%;
      text-align: center !important;
      margin: 0;
      padding: 0;
      position: absolute;

	    @media screen and (max-width: ${mobileBreakpoint}) {
		top: 3px;
      }

      svg {
        position: relative;
        top: -1px;
      }
    }
  }
`;

export const SeeResearchBlock = styled.a<{ triggerAnimation: boolean }>`
  opacity: ${(props) => (props.triggerAnimation ? 1 : 0)};
  transition: opacity 1s ease;
  letter-spacing: 0.3rem;
  visibility: ${(props) => (!props.triggerAnimation ? "hidden" : "visible")};
  display: block;
`;

export const PatreonBlock = styled.a<{
	triggerAnimation: boolean;
	popUpMode: boolean;
}>`
  opacity: ${(props) => (props.triggerAnimation ? 1 : 0)};
  font-size: ${(props) => props.popUpMode && "1.11rem"};
  text-shadow: ${(props) => props.popUpMode && "2px 2px #00000090"};
  transition: opacity 1s ease;
  visibility: ${(props) => (!props.triggerAnimation ? "hidden" : "visible")};
  //
  color: ${COLORS.StoneLightWhiteGrey} !important;
  text-decoration: none;
`;

export const TwitterBlock = styled.a<{
	triggerAnimation: boolean;
	popUpMode: boolean;
}>`
  opacity: ${(props) => (props.triggerAnimation ? 1 : 0)};
  font-size: ${(props) => props.popUpMode && "1.11rem"};
  transition: opacity 1s ease;
  visibility: ${(props) => (!props.triggerAnimation ? "hidden" : "visible")};
  //
  color: ${COLORS.StoneLightWhiteGrey} !important;
  text-decoration: none;
`;

export const SubscribeBlock = styled.a<{
	triggerAnimation: boolean;
	popUpMode: boolean;
}>`
  opacity: ${(props) => (props.triggerAnimation ? 1 : 0)};
  font-size: ${(props) => props.popUpMode && "1.11rem"};
  transition: opacity 1s ease;
  visibility: ${(props) => (!props.triggerAnimation ? "hidden" : "visible")};
  //
  color: ${COLORS.StoneLightWhiteGrey} !important;
  text-decoration: none;
`;

export const LogoStyled = styled(Logo)`
  margin: 0 0 0 0.66rem;
  @media screen and (max-width: ${mobileBreakpoint}) {
    /* display: none; */
  }
`;

export const LogoTextStyled = styled(LogoText)`
  margin: 0 0 0 0.66rem;
  @media screen and (max-width: ${mobileBreakpoint}) {
    display: none;
  }
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

export const PlayerWebWrapper = styled.div<{
	lightmode: boolean;
	fullScreen: boolean;
	compact: boolean;
	widgetMode: boolean;
	mode: string;
}>`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const MobileResponseDiv = styled.div<{ isShowing: boolean }>`
  position: absolute;
  //border: 1px solid #11a7dd;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: ${(props) => (!props.isShowing ? "none" : "block")};
`;

export const PlayerWeb = styled.div<{
	lightmode: boolean;
	fullScreen: boolean;
	compact: boolean;
	widgetMode: boolean;
	mode: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const LogoChrome = styled.div<{ isPaused: boolean }>`
  .BG {
    background: linear-gradient(#000000cd 30%, #00000090 70%, #00000001);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
  }

  .firstDiv {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    z-index: 2;
    align-items: center;
    justify-content: flex-start;
  }
  width: 100%;
  //
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  height: 14.4%;
  opacity: ${(props) => !props.isPaused && 0};
  transition: opacity 0.5s ease;

  /* border-radius: 16px; */

  @media screen and (max-width: ${mobileBreakpoint}) {
    border-radius: 0;
    height: 24%;
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

// Container for the Actual Player (allowing us to center the video)

export const PlayerContainerDiv = styled.div<{
	lightmode: boolean;
	mobileBump: string;
	isFullScreen: boolean;
}>`
  width: 100%;
  padding: 0;
  z-index: 99;
  display: flex;
  position: ${(props) => props.isFullScreen && "relative"};
  justify-content: center;
  align-items: center;
  animation: ${(props) =>
		props.mobileBump == "Left" &&
		css`
      ${mobileBumpLeftAnimation} 0.5s 0.2s cubic-bezier(0.87, 0, 0.13, 1)
    `};

  .video-js {
    /* position: unset; */
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

export const MetaArea = styled.div<{
	lightmode: boolean;
	widgetMode: boolean;
	progressAmount: number;
	doubleButtonBreakpoint: number;
}>`
  display: block;
  height: 35px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* border-radius: 0 0 16px 16px; */
  background: #00000090;
  z-index: 10;

  @media screen and (min-width: ${mobileBreakpoint}) {
    background: ${COLORS.StoneClassyDarkColor};
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    border-radius: 0;
    height: 30px;
  }

  .topMost {
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    @media screen and (max-width: ${mobileBreakpoint}) {
      // Scott's Color
      background: transparent;

      .timeBadge {
        background: #000000cd;
        display: flex;
        padding: 0.09rem;
        position: absolute;
        padding: 0.59rem;
        border-radius: 13px;
        top: 10%;
        left: 10%;
        p {
          margin: 0;
          padding: 0;
          color: ${COLORS.StoneLightWhiteGrey};
        }
      }
    }
  }

  a {
    height: 100%;
    font-family: "Cabin", sans-serif;
    color: ${(props) =>
		props.lightmode
			? `${COLORS.StoneClassyDarkColor}`
			: `${COLORS.StoneLightWhiteGrey}`};
    text-decoration: none;
    display: flex;
    padding: 0.2rem 0 0 0;
    flex: 1;

    @media screen and (max-width: ${mobileBreakpoint}) {
      height: 86%;
    }

    @media screen and (min-width: ${mobileBreakpoint}) {
      font-size: 1.05rem;
    }
  }

  .holder {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .viewEntireResearchProcess {
    display: flex;
    height: 29px;
    flex: 0.88;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: -0.2rem 0 0 0;
    //
    padding: 0.3rem 1em;
    text-transform: unset;
    border-radius: 99rem;
    //
    cursor: pointer;
    border: solid 1px ${COLORS.StoneLightWhiteGrey}90;
    background: ${COLORS.StoneLightWhiteGrey}30;
    transition: background, border, 0.18s ease;

    .hideOnMob {
      @media screen and (max-width: ${mobileBreakpoint}) {
        display: none;
      }
    }

    @media screen and (max-width: 414px) {
      margin-left: 6px;
    }

    @media screen and (max-width: ${mobileBreakpoint}) {
      height: 24px;
      border-radius: 11px;
    }
  }

  .researchDuration {
    height: 100%;
    flex: 0.5;
    padding: 0 0.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.93rem;

    @media screen and (max-width: ${(props) => `${props.doubleButtonBreakpoint}px`}) {
      flex: 0.7;
    }

    @media screen and (max-width: 414px) {
      display: none;
    }

    .EventNumber {
      @media screen and (max-width: 510px) {
        display: none;
      }
    }
  }

  .widgetPlaylistNumber {
    margin: 0 5px;
    padding: 0 5px;
    font-size: 0.93rem;
    position: relative;
    top: 4px;
    right: 2px;

    span {
      &:first-child {
        margin: 0 6px;
      }

      &:nth-child(3) {
        margin-left: 6px;
      }

      color: ${COLORS.StoneLightWhiteGrey} !important;
      pointer-events: none;
    }
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
	visible: boolean;
}>`
  display: ${(props) => (props.visible ? "none" : "flex")};
  background: ${(props) =>
		props.lightmode
			? `${COLORS.StoneLightWhiteGrey}`
			: `${COLORS.StoneClassyDarkColor}`};
  flex-direction: column;
`;

export const VideoDiv = styled.div<{
	widgetMode: boolean;
	lightmode: boolean;
	mobileBump: string;
	floatMenuIsVisible: boolean;
}>`
  // Video Container Div  CSS
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  font-size: 16px;
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
  font-size: 16px;
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
  font-size: 16px;
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
  @media screen and (max-width: 425px) {
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

export const PlayerAndHighlightFlexDiv = styled.div<{ widgetMode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;

  .widgetPlayerBG {
    position: absolute;
    width: 100%;
    z-index: 1;
    // Scott's Color
    background: #365c88;
    display: block;
    inset: 0 0;
    border-radius: 0;
  }

  .vjs-writeInStone {
    width: 100%;
    position: fixed;
    top: 0;
    border-radius: 0;
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

// Widget Chevrons

export const ChevronLeft = styled.div<{ blank: boolean; visible: boolean }>`
  top: 0;
  z-index: 101;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // New Stuff
  background: ${(props) => !props.blank && COLORS.StoneClassyDarkColor};
  opacity: ${(props) => (!props.blank ? 1 : 0)};
  max-width: 94px;
  width: 94px;
  border-radius: 100%;
  padding: 0.3rem;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  //
  left: ${(props) => (!props.visible ? "-60px" : 0)};
  transition: left 0.3s ease;
  transition-delay: 0.1s;
  .arrows {
    padding: 20px;
    left: 16px;
    position: relative;
  }

  &:hover {
    .arrows {
      transform: translateX(-4px);
      transition: transform 0.4s ease;
    }
  }
  .arrows {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.4s ease;
    transform: translateX(0px);
  }
  &.desktopViewChevron {
    display: flex;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const ChevronRight = styled.div<{ blank: boolean; visible: boolean }>`
  top: 0;
  right: 0;
  z-index: 99;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // New Stuff
  background: ${(props) => !props.blank && COLORS.StoneClassyDarkColor};
  opacity: ${(props) => (!props.blank ? 1 : !props.visible ? 0 : 1)};
  max-width: 94px;
  width: 94px;
  border-radius: 100%;
  padding: 0.3rem;
  transform: translate(50%, -50%);
  position: absolute;
  top: 50%;
  //
  right: ${(props) => (!props.visible ? "-60px" : 0)};
  transition: right 0.3s ease;
  transition-delay: 0.1s;
  .arrows {
    padding: 20px;
    margin-left: -16px;
  }

  &:hover {
    .arrows {
      transition: transform 0.4s ease;
      transform: translateX(4px);
    }
  }
  .arrows {
    position: relative;
    height: 100%;
    width: 100%;
    transition: transform 0.4s ease;
    transform: translateX(0px);
  }
  &.desktopViewChevron {
    display: flex;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const UnderPlayer = styled.div`
  flex: 1;
  width: calc(100% - 320px);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ItemChangingDirection = (mode: string) => {
	switch (mode) {
		case "itemChangingLeft":
			return `padding-left: 0.8rem ; color: ${COLORS.mellowYellow}`;
		case "itemChangingRight":
			return `padding-left: 1.2rem ; color: ${COLORS.mellowYellow}`;
		case "static":
			return "padding-left: 1em";
	}
};

export const NowPlayingTitle = styled.div<{
	itemChangingDirection: string;
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
  background: ${(props) => props.lightmode && "White"};
  border-bottom: solid 1px #00000010;
  width: 400px;
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
    ${({ itemChangingDirection }) =>
		ItemChangingDirection(itemChangingDirection)};
  }
`;

export const NowPlayingTitleMobile = styled.h3<{
	videoWidth: number;
	itemChangingDirection: string;
}>`
  border-top: #ffffff10 1px solid;
  margin: 0.3rem 0.3rem;
  padding-top: 0.8rem;
  border-radius: 4px;
  padding: 0;
  height: 36px;
  width: 100%;
  overflow: hidden;

  & > span {
    text-align: left;
    width: 100%;
    line-height: 20px;
    font-size: 0.95rem;
    transition: padding, color, 0.3s ease;
    ${({ itemChangingDirection }) =>
		ItemChangingDirection(itemChangingDirection)};
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

export const BaseDiv = styled.div<{ lightmode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: -35px;
  height: 35px;
  left: 0;
  background: ${(props) => props.lightmode && `${COLORS.StoneLightWhiteGrey}`};
  padding: 0 0.618rem;
  border-radius: 4px;
  right: 0;

  .metaForTitle {
    display: flex;
    height: 100%;
    align-items: center;
    margin-right: 4px;

    p {
      padding: 0;
      margin: 0;
    }
  }
`;

export const CurrentHighlightTitle = styled.h4<{ switching: boolean }>`
  flex: 1;
  text-transform: capitalize;
  margin: 0.2rem 1rem 0 0;
  padding: 0;
  font-weight: bold;
  line-height: 1.13rem;
  font-family: "Cabin", sans-serif;
  letter-spacing: -0.033rem;
  font-size: 1.13rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 78%;
  transition: opacity 0.45s ease-out;
  opacity: 1;

  &.switchingHighlight {
    opacity: 0;
    transition: opacity 0s;
  }
`;

export const WidgetTitleOfHighlight = styled.a<{ nowPlaying: boolean }>`
  color: ${COLORS.StoneLightWhiteGrey};
  cursor: pointer;
  position: relative;
  font-size: 13px;
  //
  padding-bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover,
  &:active,
  &:focus,
  &:visited {
    color: ${COLORS.StoneLightWhiteGrey};
    text-decoration: none;
  }

  &:hover {
    text-shadow: 0px 0px 0px white;
  }

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

    @media screen and (min-width: ${mobileBreakpoint}) {
      font-size: 1.3rem;
    }

    @media screen and (max-width: ${mobileBreakpoint}) {
      left: ${(props) => (props.nowPlaying ? "12px" : "10px")};
      max-width: ${mobileBreakpoint};
      opacity: ${(props) => (props.nowPlaying ? 0 : 1)};
      transition: opacity 0.45s ease,
        left 0.45s cubic-bezier(0.075, 0.82, 0.165, 1);
      transition-delay: ${(props) => (props.nowPlaying ? "0.57s" : "0s")};
    }
  }
`;
export const PlaylistPositionDisplay = styled.div<{ lightmode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -0.4rem;
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
	widgetMode: boolean;
	lightmode: boolean;
}>`
  display: ${(props) => !props.widgetMode && "none"};
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

export const FullScreenButtonDiv = styled.div<{ visibleHack: boolean }>`
  position: absolute;
  right: 10px;
  bottom: 40px;
  z-index: 99;
  opacity: ${(props) => (props.visibleHack ? "1" : "0")};
  transition: opacity 0.28s ease;
  transition-delay: 0.18s;
`;

export const BigPlayButtonContainer = styled.div<{
	isPaused: boolean;
}>`
  position: absolute;
  background: #00000050;
  width: 100%;
  height: 100%;
  z-index: 101;
  opacity: ${(props) => (props.isPaused ? "1" : "0")};
  transition: opacity 0.3s ease;
  pointer-events: ${(props) => !props.isPaused && "none"};
`;

export const BigPlayButton = styled.button<{
	isPaused: boolean;
	businessCardOverlayMode: boolean
}>`
  position: relative;
  left: ${(props) => props.businessCardOverlayMode ? "19%" : "50%"};
  top: 50%;
  transform: translate(-50%, -50%);
  height: 140px;
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998;
  border-radius: 100%;
  background: transparent;
  border: 0;
  opacity: ${(props) => (props.isPaused ? "1" : "0")};
  pointer-events: ${(props) => !props.isPaused && "none"};

  @media screen and (max-width: ${mobileBreakpoint}) {
    height: 100px;
    width: 100px;
    top: 50%;
  }

  svg {
    fill: ${COLORS.StoneLightWhiteGrey} !important;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    filter: drop-shadow(3px 3px 9px rgba(0, 0, 0, 0.7));
    transition: filter 0.2s ease;

    &:hover {
      filter: drop-shadow(3px 3px 11px rgba(0, 0, 0, 0.8));
      transition: filter 0.2s ease;
    }
  }
`;

export const CircleCallToactionDiv = styled.div<{ showing: boolean }>`
  border-radius: 50%;
  behavior: url(PIE.htc);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  cursor: pointer;
  transform: translate(-50%, -50%);
  // Magic, The Clip Path!
  clip-path: inset(50.4% 0% 0% 50.4% round 15.8px);

  @media screen and (max-width: ${mobileBreakpoint}) {
    display: none;
  }

  .innerCircle {
    background: ${COLORS.purple.rollover}CD;
    border-radius: 50%;
    behavior: url(PIE.htc);
    mix-blend-mode: hard-light;
    margin: ${(props) => (props.showing ? "2em" : "0em")};
    display: block;
    width: ${(props) => (props.showing ? "61.8vw" : "0px")};
    height: ${(props) => (props.showing ? "61.8vw" : "0px")};
    position: relative;
    transition: margin, height, width, 0.13s ease;
  }

  &.type1 {
    background: ${COLORS.purple.rollover}90;
  }
  &.type2 {
    width: 50px;
    height: 50px;
    background: #ccc;
    border: 3px solid #000;
  }
  &.type3 {
    width: 500px;
    height: 500px;
    background: aqua;
    border: 30px solid blue;
  }
`;

export const CallToActionText = styled.div<{ showing: boolean }>`
  position: fixed;
  top: ${(props) =>
		props.showing ? "calc(54px - 2rem)" : "calc(54px - 3rem)"};
  left: ${(props) => (props.showing ? "calc(3vw - 2rem)" : "calc(3vw - 3rem)")};
  z-index: 101;
  cursor: pointer;
  padding: 2rem;
  opacity: ${(props) => (props.showing ? "1" : "0")};
  pointer-events: ${(props) => !props.showing && "none"};
  transition-delay: 0.08s;
  transition: opacity, left, top, 0.1s;

  @media screen and (max-width: ${mobileBreakpoint}) {
    display: none;
  }

  h4 {
    color: ${COLORS.StoneLightWhiteGrey};
    font-family: "Cabin", sans-serif;
  }
`;
