import { FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa";
import { Nav, Navbar } from "react-bootstrap";

import { BiShareAlt } from "react-icons/bi";
import {COLORS} from "../../styles/colors";
import DIMENSIONS from "../../styles/GlobalDimensions";
import { GrUserFemale } from "react-icons/gr";
/* eslint-disable indent */
import Link from "next/link";
import Logo from "../../../public/images/SVG/logo.svg";
import LogoText from "../../../public/images/SVG/logoText.svg";
import { VscGlobe }from "react-icons/vsc";
import { animated } from "react-spring";
import styled from "styled-components";

const mobileBreakpoint = `${DIMENSIONS.breakPoints.mobile}px`;

export const FaTelegramStyled = styled(FaTelegram)<{ invertColors: boolean | null }>`
  fill: ${(props) => props.invertColors ? "white" : COLORS.StoneClassyDarkColor};
  height: 26.06px;
  width: 26.06px;
`;

export const FaTwitterStyled = styled(FaTwitter)<{ invertColors: boolean | null }>`
  fill: ${(props) => props.invertColors ? "white" : COLORS.StoneClassyDarkColor};
  height: 26.06px;
  width: 26.06px;
`;

export const FaLinkedinStyled = styled(FaLinkedin) <{ invertColors: boolean | null}>`
  fill: ${(props) => props.invertColors ? "white" : COLORS.StoneClassyDarkColor};
  height: 26.06px;
  width: 26.06px;
`;

export const RightNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 9px;
`;

export const MerchLogoHolder = styled.span`
	color: ${COLORS.purple.default};
	left: 7px;
	top: -3px;
	position: relative;
	@media screen and (min-width: ${mobileBreakpoint}){
	left: 42px;
	position: absolute;
	top: 18px;
	};
`;

export const NavWrapper = styled(Navbar)<{
  lightmode: boolean;
  landingPageElement: boolean;
  checkout: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${(props) =>
		props.landingPageElement || props.checkout
      ? "white"
      : props.lightmode
      ? `${COLORS.StoneLightWhiteGrey}`
      : `${COLORS.StoneClassyDarkColor}`};
  padding: 0 0 0 1em;
  flex-flow: nowrap;
  // Heights
  max-height: ${DIMENSIONS.heights.navbar.standard}px;
  height: ${DIMENSIONS.heights.navbar.standard}px;
  overflow: hidden;
  //
  overflow: hidden;

  @media screen and (min-width: ${mobileBreakpoint}) {
    #stone-rightNavbar-nav {
      justify-content: end;
    }
  }
  @media screen and (max-width: 992px) {
	height: 80px;
    top: ${(props) => !props.landingPageElement && 0};
    left: ${(props) => !props.landingPageElement && 0};
    right: ${(props) => !props.landingPageElement && 0};
    z-index: ${(props) => !props.landingPageElement && 9999};

    #stone-rightNavbar-nav {
      border-bottom: solid 1px grey;
      background: white;
      position: fixed;
      left: 0;
      right: 0;
      top: ${DIMENSIONS.heights.navbar.mobile}px;
      z-index: 100;
      height: 80px;
	  padding-top: 9px;
      justify-content: end;
	  box-shadow: 0px 12px 10px #00000030;
    }
  }
    @media screen and (max-width: ${mobileBreakpoint}) {
	height: ${DIMENSIONS.heights.navbar.mobile}px;
	#stone-rightNavbar-nav {
      height: 147px;
    }
	}
`;

export const ShoppingCartNavWrapper = styled.button`
    background: transparent;
    border: none;
    display: block;
    margin: 0 0.1vw;
    -webkit-letter-spacing: 0.069rem;
    -moz-letter-spacing: 0.069rem;
    -ms-letter-spacing: 0.069rem;
    letter-spacing: 0.069rem;
    font-family: 'Cabin',sans-serif;
    font-size: 1.05rem;
    padding-top: 0.2rem;
    color: hsl(211,22%,20%);
	display: flex;
    align-items: center;
	position: relative;

	&:disabled{
		opacity: 0.5
	}


	svg{
		margin: 0 10px;
	}

	@media screen and (max-width: 768px){
		border: none;
    position: absolute;
    right: 50px;
    top: -7px;
    height: 50px;
    width: 60px;
	}
`;

export const ShoppingCartNumber = styled(animated.div)<{checkout: boolean}>`
		background: ${(props) => !props.checkout ? COLORS.IndianRed : COLORS.purple.rollover};
		position: absolute;
		font-size: 9.5px;
		right: 2px;
		top: 7px;
		border-radius: 100%;
		height: 13px;
		width: 13px;
		display: flex;
		align-items: 
		center;
		justify-content: center;
		box-shadow: 1px 1px 4px #00000090;
		.number{
			span{
				position: relative;
				left: 1px;
				top: 0;
			}
			color: white;
		}
`;

export const StoreLinkInNav = styled.a`
background: ${COLORS.StoneClassyDarkColorDarkened};
display: flex;
align-items: center ;
border: solid #FFFFFF30 1px;
border-radius: 18px;
margin-right: 15px;
padding: 7px;
padding-left: 1px;
	box-shadow: 0px 0px 1px transparent;
	transition: box-shadow 0.3s ease;

&:hover{
	text-decoration: none;
	background: ${COLORS.StoneClassyDarkColor};
	box-shadow: 0px 0px 1px white;
	transition: box-shadow 0.3s ease;
}

p{
	margin: 0;padding: 0 15px;
	font-size: 16px;
	font-weight: bold;
	color: ${COLORS.StoneLightWhiteGrey};
}
`;

export const NavBarToggle = styled(Navbar.Toggle)`
  border: none;
  position: absolute;
  right: 0;
  top: -5px;
  height: ${DIMENSIONS.heights.navbar.standard}px;
  width: 60px;

  /* .navbar-toggler-icon {
    background: none !important;
  } */
`;

export const NavbarCollapse = styled(Navbar.Collapse)`
  @media screen and (max-width: 967px) {
    background: ${COLORS.purple.default};
    z-index: 999;
    position: absolute;
    right: 0;
    top: ${DIMENSIONS.heights.navbar.standard}px;
    width: 100%;
  }
`;

export const NavLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  z-index: 99;
`;

export const NavLogo = styled(Logo)`
  background: transparent;
  height: calc(${DIMENSIONS.heights.navbar.standard}px / 1.918);
  cursor: pointer;
  position: relative;
  top: 2px;

  @media screen and (max-width: ${mobileBreakpoint}){
	  top: 0;
	  left: -3px;
  }
`;

export const NavLogoText = styled(LogoText) <{ lightmode: boolean, storeTitle: boolean, checkout :boolean}>`
  background: transparent;
  
  height: calc(${DIMENSIONS.heights.navbar.standard}px / 2.1);
  fill: ${(props) =>
    !props.lightmode
		? props.landingPageElement || props.checkout
        ? `${COLORS.purple.default}`
        : `${COLORS.StoneLightWhiteGrey}`
      : `${COLORS.purple.default}`};
  margin: 0.3em 0 0 1.11em;
  transition: fill ease 0.2s;
  cursor: pointer;

  @media screen and (max-width: ${mobileBreakpoint}) {
    display: ${(props) => ((!props.landingPageElement || props.storeTitle) ? "none" : "")};
  }
`;

export const NavBarNav = styled.nav`
  width: 100%;
  height: ${DIMENSIONS.heights.navbar.standard}px;

  @media screen and (max-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const SocialLinksInNav = styled.div`
  text-align: center;
  height: ${DIMENSIONS.heights.navbar.standard}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 20px 0 0;
  width: fit-content;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;

    li {
      padding: 0;
      margin: 0;

      a {
        color: ${COLORS.StoneLightWhiteGrey};
        margin: 0 10px;
      }
    }
  }

  @media screen and (max-width: ${DIMENSIONS.breakPoints.mobile}px) {
    display: none;
  }
`;

export const ProjectTitle = styled.div<{
  lightmode: boolean | undefined;
  rightNavWidth: number;
landingPageElement: boolean;
}>`
  text-align: center;
  height: ${DIMENSIONS.heights.navbar.standard}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: ${(props) => !props.landingPageElement ? "flex-start" : "center"};
  margin-left: 130px;
  //
  flex: 1;

  @media screen and (max-width: ${mobileBreakpoint}) {
    margin-left: unset;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }

  input,h3 {
    border: 0;
    height: ${(props) => !props.landingPageElement && "100%"};
    overflow: hidden;
    margin: 0 0 0 20px;
    background: transparent;
    text-align: left;
    padding-top: 0.15rem;
    letter-spacing: 0.03rem;
    font-family: 'Cabin', sans-serif;
    font-size: 1.19rem;
	width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) =>
      !props.lightmode
			? !props.landingPageElement ? `${COLORS.StoneLightWhiteGrey}` : `${COLORS.purple.default}`
        : `${COLORS.purple.default}`};
    width: ${(props) =>
		props.landingPageElement && "100%"};

    @media screen and (max-width: ${mobileBreakpoint}) {
      margin: 0 0 0 35px;
      font-size: 0.98rem;
      width: 80%;
    }

    :focus-visible {
      border: 0;
      outline: 0;
      background: transparent;
    }
  }
`;

export const ProjectCreatedby = styled.div<{ lightmode: boolean | undefined }>`
  justify-content: flex-end;
  align-items: center;
  background: ${(props) =>
    !props.lightmode
      ? `${COLORS.StoneClassyDarkColor}50`
      : `${COLORS.StoneLightWhiteGrey}`};
  display: flex;
  border-radius: 20px;
  padding-right: 1rem;
  max-width: 33vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 9px;

  height: calc(${DIMENSIONS.heights.navbar.standard}px - 9px);
  @media screen and (max-width: 500px) {
    right: 40px;
    top: 50px;
    z-index: 1;
    display: none;
  }

  p {
    color: ${(props) =>
      props.lightmode
        ? `${COLORS.StoneClassyDarkColor}`
        : `${COLORS.StoneLightWhiteGrey}`};
    font-size: 16px;
    line-height: 0;
    margin: 0;
    padding: 0;

    @media screen and (max-width: 500px) {
      display: none;
    }
  }
`;

export const UserButtonMenu = styled.a`
  p {
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  :hover {
    text-decoration: none;
  }
`;

export const HomeMenu = styled.div`
  position: absolute;
  right: 1vw;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
  }
`;

export const NavButton = styled.button`
  background: transparent;
  border: 2px solid transparent;
  display: block;
  margin: 0 0.1vw;
  letter-spacing: 0.069rem;
  font-family: 'Cabin', sans-serif;
  //
  font-size: 1.05rem;
  padding-top: 0.2rem;
  color: ${COLORS.StoneClassyDarkColor};
  //
  &:hover {
    border-bottom: solid 2px ${COLORS.StoneLightWhiteGrey};
  }
`;

export const UserIcon = styled(GrUserFemale)<{
  lightmode: boolean | undefined;
}>`
  width: 30px;
  margin: 0 8px;
  height: 30px;
  display: block;
  cursor: pointer;
  border-color: ${(props) =>
    !props.lightmode ? `${COLORS.mellowYellow}` : "black"};
  border-width: 2px;
  border-style: solid;
  border-radius: 100%;
  padding: 2px;

  path {
    fill: ${(props) =>
      !props.lightmode
        ? `${COLORS.mellowYellow}`
        : `${COLORS.StoneClassyDarkColor}`};
  }
`;

export const AuthorBlurb = styled.div<{
  lightmode: boolean | undefined;
  showing: boolean;
}>`
  border-radius: 0 0 12px 12px;
  background: ${(props) =>
    !props.lightmode
      ? `linear-gradient(rgba(225,255,255,0.02), rgba(225,255,255,0.02)),
         linear-gradient(${COLORS.StoneClassyDarkColor}, ${COLORS.StoneClassyDarkColor});`
      : `${COLORS.StoneLightWhiteGrey}`};
  position: absolute;
  right: 36px;
  top: ${DIMENSIONS.heights.navbar.standard}px;
  z-index: 1;
  opacity: ${(props) => (props.showing ? "1" : "0")};
  transition: opacity 0.5s ease;
  pointer-events: ${(props) => (props.showing ? "all" : "none")};
  width: 210px;
  box-shadow: #00000029 -4px 6px 14px;

  p {
    font-size: 13px;
    text-align: center;
    padding: 20px 0;
    margin: 0;
    color: ${(props) =>
      !props.lightmode
        ? `${COLORS.StoneLightWhiteGrey}`
        : `${COLORS.StoneClassyDarkColor}`};
  }
`;

export const SocialNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem 1rem;

  a {
    padding: 0.3rem 0;
    color: ${COLORS.StoneLightWhiteGrey};

    &:hover {
      text-decoration: none;
    }
  }
`;

export const UserImage = styled.div<{
  src: string;
}>`
  width: 30px;
  margin: 0 8px;
  height: 30px;
  display: block;
  cursor: pointer;
  border-color: ${COLORS.StoneMediumGreyColor};
  border-width: 2px;
  border-style: solid;
  border-radius: 100%;
  padding: 2px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 102%;
  image-rendering: high-quality;
`;

export const NavLinks = styled(Nav)`
  list-style-type: none;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: flex-end;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  letter-spacing: 0.022rem;

  @media screen and (max-width: 967px) {
    flex-direction: column;
    z-index: 1;
  }
`;

export const NavItem = styled.div<{
  contained: boolean;
}>`
  background: ${(props) =>
    props.contained ? `${COLORS.StoneLightWhiteGrey}` : " "};
  padding: calc(${DIMENSIONS.heights.navbar.standard}px / 7) 0.8em;
  border-radius: 5px;
  margin: 0.6rem;
  max-height: ${DIMENSIONS.heights.navbar.standard}px;
  text-transform: uppercase;
  a {
    text-decoration: none;
  }
`;

export const SettingDialIcon = styled(BiShareAlt)<{
  lightmode: boolean | undefined;
}>`
  width: 35px;
  height: 35px;
  color: ${(props) => (!props.lightmode ? `${COLORS.mellowYellow}` : "black")};
  cursor: pointer;

  @media screen and (max-width: ${mobileBreakpoint}) {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
`;

export const StoreLinkIcon = styled(VscGlobe) <{
	lightmode: boolean | undefined;
}>`
  width: 24px;
  height: 24px;
  color: ${(props) => (!props.lightmode ? `${COLORS.StoneLightWhiteGrey}` : "black")};
  cursor: pointer;

  @media screen and (max-width: ${mobileBreakpoint}) {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
`;

export const NavLink = styled(Link)``;
