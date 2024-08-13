import styled, { keyframes } from "styled-components";

import { COLORS } from "../../../styles/colors";
import DIMENSIONS from "../../../styles/GlobalDimensions";

const columnWidth = 1.4;
const buttonBG = "#FFFFFF20";
const buttonRounding = "5px";
const buttonBoxShadow = "0px 3px 5px #00000060";
const controlsHeight = "84px";
const pauseTopPadding = "50px";
const portalLargeBP = 732;
const mobileBreakpoint = `${DIMENSIONS.breakPoints.mobile}px`;
const paddingMain = "15px";

export const OverlayDivWrapper = styled.div<{
  show: boolean;
  widgetMode: boolean;
}>`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  pointer-events: none;

  h5,
  p {
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
  }

  &:hover {
    h5 {
      padding: 10px 0;
      height: 38px;
      transition: height 0.1s ease-in, padding 0.2s ease-in-out;
    }
  }

  h5 {
    transition: height 0.2s ease-out, padding 0.1s ease-out;
    transition-delay: 0.2s;
    color: white;
    /* padding: 10px 0; */
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 110%;
    background: ${COLORS.StoneClassyDarkColorBG};
    border-radius: ${buttonRounding} ${buttonRounding} 0 0;
    height: 0;
    overflow: hidden;

    @media screen and (max-width: 800px) {
      font-size: 90%;
      &:hover {
        padding: 8px 0;
      }
    }

    @media screen and (max-width: ${mobileBreakpoint}) {
      display: none;
    }
  }

  p {
    flex: 1;
    background: ${buttonBG};
  }
`;

export const Bumper = styled.div<{ rollover: boolean }>`
  height: ${controlsHeight};
  width: 100%;
  pointer-events: ${(props) => (props.rollover ? "none" : "auto")};
  transition: height 0.3s;
  @media screen and (max-width: ${mobileBreakpoint}) {
    height: 39px;
  }
`;

export const MobileBg = styled.div<{ mobileBackground: string }>`
  background: ${(props) => `url(${props.mobileBackground}) no-repeat 58% 48%`};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 42%;
  right: 0;
  background-size: 60%;
  z-index: -1;

  @media screen and (min-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const OverlayDiv = styled.div<{ isPlayerPaused: boolean, noLeftLinks: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  gap: ${paddingMain};
  padding-right: ${paddingMain};
  min-height: 0;
  pointer-events: auto;
  padding-top: ${(props) => (props.isPlayerPaused ? pauseTopPadding : "20px")};
  transition: padding-top 0.3s ease 0.1s;

  a:hover{
	text-decoration: none;
  }

  .gutters {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: ${paddingMain};

    & > div {
      margin-bottom: 10%;
    }
  }

  .leftColumn {
    flex: ${(props) => props.noLeftLinks ? 0 : columnWidth};
    pointer-events: auto;
    border-radius: 0 0 0 ${buttonRounding};
  }

  .videoGap {
    flex: ${(props) => props.noLeftLinks ? 0.9 : 1.9};
    display: block;
  }

  .rightColumn {
    flex: ${columnWidth};
    pointer-events: auto;
    border-radius: 0 0 0 ${buttonRounding};
  }
`;

export const Divider = styled.div`
  border-bottom: solid 1px white;
  display: block;
  height: auto;
  margin: 10px 0 0 0;
  width: 100%;
  opacity: 50%;
`;

export const BusinessCardButton = styled.a<{ background: string }>`
  box-shadow: ${buttonBoxShadow};
  width: 100%;
  flex: 1;
  border-radius: ${buttonRounding};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0px 0px 5px ${COLORS.purple.rollover}, 0px 5px 10px #00000040;
  }

  .canvas {
    background-image: ${(props) => props.background};
    flex: 1;
    position: relative;
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;

    svg {
      height: 100%;
      &.merchandiseIcon {
        width: 50px;
        @media screen and (min-width: ${portalLargeBP}px) {
          width: 80px;
        }
        @media screen and (max-width: ${mobileBreakpoint}) {
          width: 28px;
        }
      }
      &.socialIcon {
        width: 40px;
        @media screen and (min-width: ${portalLargeBP}px) {
          width: 70px;
        }
        @media screen and (max-width: ${mobileBreakpoint}) {
          width: 25px;
        }
      }
    }

    .logo {
      position: absolute;
      background: #55cd5590;
      background: url(${(props) => props.background});
    }
  }
`;

const rainbow = keyframes`
    0%{background-position:0% 82%}
    50%{background-position:100% 19%}
    100%{background-position:0% 82%}
`;

export const UserLogoDiv = styled.div<{ background: string }>`
  box-shadow: ${buttonBoxShadow};
  flex: 1;
  border-radius: ${buttonRounding};
  padding: 10px 0;
  width: 100%;

  @media screen and (min-width: ${portalLargeBP}px) {
    flex: 2.4;
  }

  .holder {
    width: 80%;
    margin: 0 auto;
    height: 95%;
    padding: 0 10%; 
	display: flex;
	align-items: center;
	justify-content: center;
    .tShirtLogo {
      height: 100%;
      width: 100%;
	  max-width:222px;

      clip-path: polygon(
        16% 20%,
        35% 13%,
        40% 20%,
        60% 20%,
        65% 13%,
        86% 20%,
        100% 31%,
        85% 44%,
        80% 40%,
        80% 100%,
        20% 100%,
        20% 40%,
        15% 44%,
        0 31%
      );
      .logoItself {
        height: 100%;
        width: 100%;
        background: url("${(props) => props.background}") no-repeat center;
        background-size: 45%;
      }
      .backgroundRainbow {
        height: 100%;
        width: 100%;
		animation: ${rainbow} 18s ease infinite;
		background-size: 1800% 1800% !important;
		background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
      }
    }
  }
`;

export const BusinessCardIcon = styled.div<{ background: string }>`
  box-shadow: ${buttonBoxShadow};
  flex: 1;
  border-radius: ${buttonRounding};
  padding: 8% 0;
  width: 100%;

  @media screen and (min-width: ${portalLargeBP}px) {
    flex: 2.4;
  }

  .holder {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    padding: 0 10%;
	display: flex;

	.logoItself{
	background: url("${(props) => props.background}") no-repeat center;
    background-size: contain;
	  height: 100%;
	  width: 100%;
	}
  }
`;

export const UserLogo = styled.img`
  width: 100%;
`;
