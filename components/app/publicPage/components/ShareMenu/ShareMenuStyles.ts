import { Col, Container, Row } from "react-bootstrap";
import {
	HiClipboard,
	HiOutlineDocumentAdd,
	HiOutlineGlobeAlt,
} from "react-icons/hi";
import styled, { keyframes } from "styled-components";

import {COLORS} from "../../../../styles/colors";
import { ImEmbed2 } from "react-icons/im";

const FadeInShareMenu = keyframes`0%{
opacity: 0;
}
100%{
opacity: 1;
}
`;
export const SettingsFloatMenu = styled(Container)`
  background: ${COLORS.purple.default};
  border-radius: 16px;
  font-family: "Cabin", sans-serif;
  padding: 0 !important;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 0px 20px #00000090;
  z-index: 9999;
  animation-name: ${FadeInShareMenu};
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  width: unset;
  /* position: absolute;
  left: 50%;
  top: 50%; */
  /* transform: translate(-50%, -50%); */

  @media screen and (max-width: 575px) {
    margin: 1%;
    width: 350px;
    max-width: 100vw;
  }

  @media screen and (max-width: 361px) {
    margin: 2%;
    width: 350px;
    max-width: 100vw;
    max-height: 100vh;
  }

  .header {
    background: ${COLORS.StoneClassyDarkColor};
    position: relative;
    border-radius: 16px 16px 0 0;
    width: 100%;
    display: flex;
    height: 50px;
    margin: 0 -10px 0 -9px;
    width: calc(100% + 18px);
    align-items: center;
    justify-content: center;

    h1 {
      color: ${COLORS.StoneLightWhiteGrey};
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.15rem;
      line-height: 2.4;
      white-space: nowrap;
      font-size: 21px;
      margin: 0;

      @media screen and (max-width: 575px) {
        letter-spacing: 0.1rem;
        line-height: 2;
        font-size: 19px;
        margin-top: 5px;
      }

      @media screen and (max-width: 361px) {
        letter-spacing: 0.1rem;
        line-height: 2;
        font-size: 16px;
        margin-top: 3px;
      }
    }

    .StoneLogoAI {
      position: absolute;
      left: 6px;
      top: 3px;
      margin: 8px;
      width: 33px;
      height: 29px;

      @media screen and (max-width: 361px) {
        left: 23px;
        top: 1px;
        margin: 7px;
        width: 35px;
        height: 31px;
      }
    }

    // Close Button of Modal
    button {
      all: undet;
      cursor: pointer;
      position: absolute;
      right: 2px;
      top: 2px;
      // Actual styles
      background: none;
      border-radius: 6px 16px 6px 6px;
      margin: 2px;
      border: none;

      @media screen and (max-width: 361px) {
        right: 19px;
      }

      @media screen and (max-width: 321px) {
        right: 24px;
      }

      &:hover {
        background: ${COLORS.IndianRed};
      }
    }
  }

  .sectionHeadingDivwithIcon {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 575px) {
      margin: unset;
    }
  }
`;

export const ModalBG = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  min-height: 100vh;
  right: 0;
  z-index: 9998;
  background-color: ${COLORS.StoneClassyDarkColor}50;
  backdrop-filter: blur(8px);
`;

export const ClipboardIcon = styled(HiClipboard)`
  color: ${COLORS.StoneLightWhiteGrey};
  width: 24px;
  height: 24px;
  margin: 0 6px;

  @media screen and (max-width: 575px) {
    width: 20px;
    height: 20px;
  }
`;

export const ShareMenuButton = styled.div`
  &.hiddenOnXXS {
    display: none;
  }

  & > button {
    background: ${COLORS.NiceGreen};
    padding: 8px 12px;
    display: flex;
    border: none;
    border-radius: 20px;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 361px) {
      margin: 1.3vh 0;
      padding: 6px 10px 0px 8px;
    }

    h3 {
      text-transform: uppercase;
      letter-spacing: 0.15rem;
      font-size: 17px;
      font-weight: 600;
      color: ${COLORS.StoneLightWhiteGrey};
      padding: 0;
      margin: 0;

      @media screen and (max-width: 575px) {
        letter-spacing: 0.1rem;
        font-size: 14px;
        font-weight: 600;
        color: ${COLORS.StoneLightWhiteGrey};
        padding: 0;
        margin: 0;
        line-height: 2;
      }

      @media screen and (max-width: 361px) {
        font-size: 12px;
      }
    }
  }
`;

export const ContentAreaCol = styled(Col)`
  flex: 1;
  width: 400px;
  padding: 1rem 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media screen and (max-width: 575px) {
    width: 100%;
    padding: 0.5rem 0;
  }

  @media screen and (max-width: 361px) {
    width: 100%;
    padding: 0.1rem 0;
  }

  &.settingsCol {
    padding: 0;
  }
`;

export const ContentAreaRow = styled(Row)`
  flex-direction: row;
  display: flex;
  padding: 0 1.5rem;

  @media screen and (max-width: 575px) {
    flex-wrap: break;
  }

  @media screen and (max-width: 361px) {
    padding: 0;
  }

  h5 {
    color: ${COLORS.StoneLightWhiteGrey};
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.15rem;
    line-height: 2.4;
    white-space: nowrap;
    margin: 0;

    @media screen and (max-width: 575px) {
      padding: 0;
    }

    @media screen and (max-width: 361px) {
      padding: 0;
      font-size: 15px;
    }
  }

  &.settingsRow {
    margin: 5px;
    border: grey 1px solid;
    border-radius: 10px;
    background: ${COLORS.StoneClassyDarkColor}30;
    padding: 1rem;

    @media screen and (max-width: 361px) {
      padding: 0.3rem !important;
      border: none;
      border-top: grey 1px solid;
    }

    h5 {
      line-height: 1.5;
      margin: 0;
      padding: 0;

      @media screen and (max-width: 575px) {
        letter-spacing: 0.1rem;
        line-height: 2;
        font-size: 15px;
      }
    }

    p,
    h5 {
      color: ${COLORS.StoneLightWhiteGrey};
      margin: 0 0.88rem 0 0.4rem;
    }
  }
`;

const iconSize = 25;
const iconDecrease = 0.8;

export const EmbedIcon = styled(ImEmbed2)`
  color: ${COLORS.mellowYellow};
  width: ${iconSize}px;
  height: ${iconSize}px;
  margin-top: -3px;
  margin-right: 7px;

  @media screen and (max-width: 575px) {
    width: 24px;
    height: 24px;
  }
`;

export const GlobeIcon = styled(HiOutlineGlobeAlt)`
  color: ${COLORS.mellowYellow};
  width: ${iconSize}px;
  height: ${iconSize}px;
  margin-top: -3px;
  margin-right: 6px;

  @media screen and (max-width: 575px) {
    width: ${Math.floor(iconSize * iconDecrease)}px;
    height: ${Math.floor(iconSize * iconDecrease)};
    margin-right: 3px;
  }
`;

export const DocDlIcon = styled(HiOutlineDocumentAdd)`
  color: ${COLORS.StoneLightWhiteGrey};
  width: ${Math.floor(iconSize * iconDecrease)}px;
  height: ${Math.floor(iconSize * iconDecrease)}px;
  margin: 0 6px;

  @media screen and (max-width: 575px) {
    width: ${Math.floor(iconSize * iconDecrease * iconDecrease)}px;
    height: ${Math.floor(iconSize * iconDecrease * iconDecrease)}px;
  }
`;

export const EmbedWidgetDiv = styled.div`
  position: relative;
  margin: 0 18px;
  overflow: auto;
  border-radius: 16px;
  padding: 3px;
  width: 300px;
  height: 300px;

  @media screen and (max-height: 650px) {

    max-height: 180px;
  }

  @media screen and (max-width: 995px) {

    max-height: 200px;
  }

  @media screen and (max-width: 420px) {
 
    max-height: 110px;
  }

  @media screen and (max-width: 320px) {

    max-height: 90px;
  }
  border: solid 1px white;
  padding: 0.6rem;
  margin-left: 3rem;
  background-color: ${COLORS.StoneClassyDarkColor};
  box-shadow: inset 3px 3px 3px #050505;
  p {
    position: relative;
    margin: 0px !important;
    font-family: "Lucida Console";
    border-radius: 15px;
    overflow-wrap: break-word;
    color: ${COLORS.mellowYellow} !important;
    font-size: 0.9em;
    @media screen and (max-width: 320px) {
      font-size: 11px;
      border: solid 1px white;
      border-radius: 10px;
    }
  }
`;

export const QRcodeWrapper = styled.div`
  canvas {
    height: 320px !important;
    width: 320px !important;
  }

  @media screen and (max-height: 650px) {
    canvas {
      height: 180px !important;
      width: 180px !important;
    }
  }
`;

const CopiedAnimation = keyframes`
0%{
opacity: 0;
}
50%{
opacity: 1;
}
100%{
opacity: 0;
}
`;

export const CopiedTextAlert = styled.div<{
	copied: boolean;
}>`
  pointer-events: none;
  position: absolute;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  border-radius: 15px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: ${(props) => (!props.copied ? "0" : "1")};
  transition: opacity 1s ease;
  background: rgba(43, 48, 59, 0.8);
  animation: ${(props) => props.copied && CopiedAnimation} 3s forwards;
  h3 {
    display: block;
    flex: 1;
    color: rgb(163, 190, 140);
    margin: ${(props) => (!props.copied ? "1em 0 0 0" : "0 0")} !important;
    transition: margin-top 0.5s ease;
    margin-left: auto;
    margin-right: auto;
    font-weight: 600;
    letter-spacing: 0.11rem;
    text-transform: uppercase;
  }
`;
