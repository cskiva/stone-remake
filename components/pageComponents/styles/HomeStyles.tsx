import { Col, Jumbotron, Row } from "react-bootstrap";
import styled, { keyframes } from "styled-components";

import Button from "@material-ui/core/Button";
import { COLORS } from "../../styles/colors";
import DIMENSIONS from "../../styles/GlobalDimensions";
import { FaArrowCircleRight } from "react-icons/fa";
import { animated } from "react-spring";
import stoneGuide from "../../../public/images/GIF/stoneGuide.gif";

const mobileBreakpoint = `${DIMENSIONS.breakPoints.mobile}px`;
const downloadButtonRadius = 8;

const TippleRipple = keyframes`
from{
	width: 0px;
	height: 0px;
	background: #FFFFFF30;
}
to{
	width: 200px;
	height: 200px;
	background: #FFFFFF00;
}
`;

const TransIn = keyframes`
	from{
 visibility: hidden;
	opacity: 0;
	}
	1%{
	visibility: visible;
	opacity: 0;
	}
to{ 
visibility: visible;
	opacity: 1;
}
`;

const TransOut = keyframes`
	from{visibility: visible;
	opacity: 1;
	}
	99%{
	visibility: visible;
	opacity: 0;
	}
to{ 
 visibility: hidden;
	opacity: 0;
}
`;

export const StoneTitleJumbotron = styled(Jumbotron)`
	margin-top: 0.75em;
	padding: 0;
	background: transparent;
	h1 {
	font-family: -apple-system, "system-ui", "“Segoe UI”", Roboto, Helvetica,
		Arial, sans-serif;
	font-size: 53.28px;
	font-weight: 700;
	line-height: 58.608px;
	margin: 0;
	padding: 0;
	}
`;

export const StoneTitleJumbotronFancy = styled(Jumbotron)`
	margin: 0;
	width: 100%;
	padding: 0;
	overflow: hidden;
	background-blend-mode: soft-light, soft-light, normal;
	margin-bottom: 3em;
	background: linear-gradient(
		90deg,
		rgba(255, 134, 183, 1) 1%,
		rgba(94, 68, 99, 1) 100%
		),
		linear-gradient(0deg, rgba(101, 151, 165, 1) 1%, rgba(13, 12, 13, 1) 100%),
		#544466;
	border-radius: 0;
	position: relative;
	.pyramid-thing {
		display: block;
		background: #00d3ff;
		mix-blend-mode: saturation;
		width: 100vw;
		height: 100vw;
		position: absolute;
		top: 18rem;
		left: 20%;
		transform: rotateZ(45deg) scaleY(2.6);

			@media screen and (max-width: ${mobileBreakpoint}) {
				top: 2rem;
		left: 30%;
	}
	}
	.container-within {
	max-width: 66vw;
	margin: 0 auto;
	padding: 5rem 0;

	@media screen and (max-width: ${mobileBreakpoint}) {
			padding: 2rem 0;
	}
	}

	h1 {
	font-family: -apple-system, "system-ui", "“Segoe UI”", Roboto, Helvetica,
		Arial, sans-serif;
	font-size: 53.28px;
	font-weight: 700;
	line-height: 58.608px;
	margin: 0;
	padding: 0;
	color: white;

	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 33.28px;
	}
	}
`;

export const WrapperForFormAndSuccessMessage = styled(animated.div)`
	width: 100%;
	min-height: 360px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const HomeResponseButton = styled.button`
	color: white;
	height: 100%;
	border: solid 1px #ffffffcd;
	border-radius: 6px;
	background: #ffffff10;
	padding: 10px;
	transition: opacity 0.3s ease;
	max-height: 50px;
	h4 {
	text-align: center;
	font-size: 21px;
	margin: 0;
	padding: 0;
	}
`;

export const HomeSubmitButton = styled.input`
	color: white;
	height: 100%;
	border: solid 1px #ffffffcd;
	border-radius: 6px;
	background: #ffffff10;
	padding: 10px;
	transition: opacity 0.3s ease;
	max-height: 50px;
	text-align: center;
	font-size: 21px;
	transition: opacity 0.3s ease, border 0.3s ease;
	margin: 20px 0 0 0;
	:disabled {
	opacity: 0.5;
	border: solid 1px #ffffff20;
	transition: opacity 0.3s ease, border 0.3s ease;
	}
	svg {
	width: 100%;
	height: 100%;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	margin: 0px 0 1em 0;
	}
`;

export const HomeForm = styled.form`
	margin: 0 auto;
	display: flex;
	border: none;
	align-items: center;
	position: relative;
	justify-content: flex-start;
	background: transparent;
	flex-direction: column;
	width: 100%;
	@media screen and (max-width: ${mobileBreakpoint}) {
	padding: 0 1em;
	}
`;

export const HomeFormLabel = styled.label`
	width: 100%;
	text-align: left;
	font-size: 1.1em;
	margin: 5px 0 6px 4px;
	display: flex;
	flex-direction: column;
	color: white;
	@media screen and (max-width: ${mobileBreakpoint}) {
	font-size: 0.95em;
	margin: 3px 0 7px 2px;
	display: none;
	}
`;

export const IntroText = styled(animated.div)`
	padding: 14px;
	border-radius: 8px;
	color: white;
	margin-bottom: 10px;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	p {
	margin: 0;
	font-size: 17px;
	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 16px;
		margin-right: 20vw;
	}
	}
	h4 {
	font-size: 25px;
	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 19px;
		padding-top: 5px;
		margin-bottom: 0;
	}
	}
`;

export const EmailConfirmMessage = styled.div`
	position: relative;
	.emailAddress {
	font-size: 24px;
	}
	.question {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	}
	padding: 14px;
	border-radius: 8px;
	margin-bottom: 10px;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	p {
	margin: 0;
	font-size: 17px;
	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 16px;
		margin-right: 20vw;
	}
	}
	h4 {
	font-size: 25px;
	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 21px;
	}
	}
`;

export const ResponseText = styled.div`
	padding: 14px;
	border-radius: 8px;
	margin-bottom: 10px;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	p {
	margin: 0;
	font-size: 17px;
	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 16px;
		margin-right: 20vw;
	}
	}
	h4 {
	font-size: 25px;
	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 21px;
	}
	}
`;

export const SendingMessage = styled(animated.div)`
	width: 100%;
	padding: 20px 0;
	position: absolute;
	height: 100%;
	z-index: 1;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;

	.frame {
	display: flex;
	align-items: center;
	background: ${COLORS.purple.rollover};
	padding: 2em;
	border-radius: 10px;
	box-shadow: 0px 0px 10px #00000090;
	svg {
		width: 20px;
		height: 20px;
		margin: 0 10px;
	}
	p {
		margin: 0;
		padding: 0;
		text-align: center;
		color: white;
		font-size: 23px;
	}
	h4 {
		font-size: 25px;
		@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 21px;
		}
	}
	}
`;

export const HomeInput = styled.input<{ theme: string | null }>`
	width: 100%;
	background: ${(props) =>
		props.theme === "light"
			? "hsla(211, 211%, 211%, 20%)"
			: "hsla(211, 22%, 8%, 20%)"};
	border: none;
	border-radius: 8px;
	padding: 10px;
	font-size: 19px;
	color: ${(props) => (props.theme === "light" ? "black" : "white")};
	margin: 0 0 12px 0;
	outline-style: ${(props) => (props.theme !== "light" ? "dotted" : "solid")};
	outline-color: ${(props) =>
		props.theme !== "light" ? "#ffffff01" : COLORS.purple.rollover};
	outline-width: 2px;
	outline-offset: ${(props) => (props.theme !== "light" ? "4px" : "0px")};
	transition: outline-offset 0.3s ease;
	&:-webkit-autofill {
	outline-style: solid;
	outline-color: ${COLORS.mellowYellow};
	outline-width: 2px;
	outline-offset: 1px;
	transition: outline 0.3s ease, background 0.3s ease;
	}
	&:focus {
	outline-style: dotted;
	outline-color: ${COLORS.NiceGreen};
	outline-width: 2px;
	outline-offset: 1px;
	transition: outline-offset 0.3s ease, background 0.3s ease;
	background: hsla(211, 22%, 8%, 30%);
	}
	&::placeholder {
	color: ${(props) => (props.theme === "light" ? "#00000050" : "#ffffff9f")};
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	font-size: 18px;
	}
`;

export const HomeSelect = styled.select`
	width: 100%;
	background: hsla(211, 211%, 211%, 20%);
	border: none;
	border-radius: 8px;
	padding: 10px;
	font-size: 19px;
	color: black;
	margin: 0 0 12px 0;
	outline-style: solid;
	outline-color: ${COLORS.purple.rollover};
	outline-width: 2px;
	outline-offset: 0px;
	transition: outline-offset 0.3s ease;
`;

export const SignUpPopupWrapper = styled(animated.div) <{
	mailingListOpen: boolean;
}>`
	opacity: 0;
	overflow: hidden;
	position: fixed;
	width: 480px;
	right: 20px;
	margin: 0;
	z-index: 9999;
	border-radius: 2px;
	box-shadow: 0px 0px 10px #000000cd;
	@media screen and (max-width: ${mobileBreakpoint}) {
	display: none;
	}
`;

export const SignUpPopupChrome = styled.div`
	height: 50px;
	background: ${COLORS.StoneClassyDarkColor};
	display: flex;
	width: 100%;
	border-radius: 2px 2px 0 0;
	color: ${COLORS.StoneLightWhiteGrey};
	align-items: center;
	justify-content: flex-end;
	button {
	all: unset;
	margin: 0 10px;
	cursor: pointer;
	&:hover {
		background: #ffffff10;
	}
	svg {
		width: 30px;
		height: 30px;
	}
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	}
`;

export const SuccessMessage = styled(animated.div)`
	width: 100%;
	padding: 20px 0;
	position: absolute;
	height: 100%;
	z-index: 1;
	pointer-events: none;
	display: flex;
	font-size: 23px;
	align-items: center;
	justify-content: center;
	background: ${COLORS.purple.rollover};
	p {
	margin: 0;
	padding: 0;
	text-align: center;
	color: white;
	font-size: 23px;
	}
`;

export const SignUpMobile = styled(animated.div) <{
	mailingListOpen: boolean;
}>`
	position: absolute;
	bottom: 0;
	width: 100%;
	@media screen and (min-width: ${mobileBreakpoint}) {
	display: none;
	}
`;

export const SignUpPopup = styled.div`
	border-radius: 0 0 2px 2px;
	background: url("./images/SVG/stoneFlag.svg") center center no-repeat,
	${COLORS.purple.rollover};
	height: 100%;
	color: white;
	padding: 20px;
	background-size: 150%;
	background-blend-mode: soft-light;

	@media screen and (max-width: ${mobileBreakpoint}){
		padding: 0 20px;
	}
	
`;

export const GifBackground = styled.div<{ scrollLimitReached: boolean }>`
	top: ${DIMENSIONS.heights.navbar.standard}px;
	left: 0;
	right: 0;
	overflow-y: scroll;
	overflow-x: hidden;
	bottom: ${DIMENSIONS.heights.navbar.standard}px;
	position: absolute;

	/* ===== Scrollbar CSS ===== */
	/* Firefox */
	& {
	scrollbar-width: auto;
	scrollbar-color: ${COLORS.purple.rollover} #d9d9d9;
	}

	/* Chrome, Edge, and Safari */
	&::-webkit-scrollbar {
	width: 20px;
	}

	&::-webkit-scrollbar-track {
	background: ${(props) => (!props.scrollLimitReached ? "#ececec" : "white")};
	}

	&::-webkit-scrollbar-thumb {
	background-color: ${(props) =>
		!props.scrollLimitReached ? `${COLORS.purple.rollover}` : "#CDCDCD"};
	border-radius: 0px;
	border: 0px groove #ffffff;
	}

	@media screen and (max-width: ${mobileBreakpoint}) {
	top: ${DIMENSIONS.heights.navbar.mobile}px;
	bottom:0;
	}
	.bg {
	background: url("${stoneGuide}") center center no-repeat, #fafafa;
	background-size: contain;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-attachment: fixed;
	@media screen and (max-width: ${mobileBreakpoint}) {
		background-position: center ${DIMENSIONS.heights.navbar.mobile}px;
		background-size: 300%;
	}
	}
`;

export const FooterContent = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: height 0.5s ease-in-out;
	@media screen and (min-width: ${mobileBreakpoint}) {
	height: ${DIMENSIONS.heights.navbar.standard}px;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	display: none;
	}
	.border {
	border: none !important;
	background: none !important;
	border-radius: ${downloadButtonRadius}px;
	}
`;

export const HomeH1 = styled.h1`
	display: flex;
	flex-direction: column;
	//
	line-height: 1.2em;
	font-family: cairo, sans-serif;
	font-weight: 700;
	font-style: normal;
	letter-spacing: -0.02em;
	margin: 0.3em;
	@media screen and (min-width: 1440px) {
	font-size: 2.4rem;
	padding: 1em 0;
	margin: 1rem 0;
	}
	@media screen and (max-width: 1439px) {
	font-size: 2.1rem;
	padding: 1em 0;
	margin: 1rem 0;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	font-size: 1.44em;
	padding: 1em 0;
	margin: 1rem 0;
	}
`;

export const HomeP = styled.p`
	font-size: 0.9em;
	margin: 0;
	display: flex;
	flex-direction: column;
	@media screen and (min-width: 1440px) {
	font-size: 1.57rem;
	}
	@media screen and (max-width: 1439px) {
	font-size: 2.1rem;
	}
	@media screen and (max-width: ${DIMENSIONS.breakPoints.mobile}px) {
	font-size: 12px;
	}
	span.br {
	margin: 0 0 1em 0;
	}
`;

export const AboutUsP = styled.p`
	font-size: 0.9em;
	margin: 0 0 1em 0;
	display: flex;
	flex-direction: column;
	text-align: justify;
	@media screen and (min-width: 1440px) {
	font-size: 1.37rem;
	}
	@media screen and (max-width: 1439px) {
	font-size: 1.57rem;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	font-size: 1.6em;
	margin: 0 0.3em 1em 0.3em;
	text-align: left;
	}
	span.br {
	margin: 0 0 1em 0;
	}
`;

export const MiniSearchBar = styled.ul`
	margin: 15px 0 0 -15px;
	transition: height 0.3s ease;
	display: flex;
	flex-direction: row;
	width: inherit;
	justify-content: space-between;
	align-items: center;
`;

export const FaqList = styled.div`
	// Headings Style
	h3 {
	font-size: 2.3rem;
	font-weight: bold;
	letter-spacing: 0.05rem;
	font-family: Cairo, Sans-serif;
	margin: 0;
	padding: 0;
	}
	// SubHeadings style
	h5 {
	font-size: 1.6rem;
	font-weight: bold;
	padding: 3rem 0 1.5rem 0;
	margin: 0 0 1.5rem 0;
	border-bottom: solid 1px ${COLORS.purple.rollover};
	}
	// Body style
	p,
	ul,
	li {
	font-size: 1.4rem;
	}
	li {
	padding: 0.5rem 0 1.5rem 0;
	}
	@media (max-width: ${mobileBreakpoint}) {
	h3 {
		font-size: 1.8rem;
		font-weight: bold;
		letter-spacing: 0.05rem;
		font-family: Cairo, Sans-serif;
	}
	// SubHeadings style
	h5 {
		font-size: 1.3rem;
		font-weight: bold;
		padding: 1.5rem 0 0.75rem 0;
		margin: 0 0 0.75rem 0;
		border-bottom: solid 1px ${COLORS.purple.rollover};
	}
	// Body style
	p,
	ul,
	li {
		font-size: 1rem;
	}
	//
	li {
		padding: 0.2rem 0 0.5rem 0;
	}
	}
`;

export const FaqLinkWrapper = styled.ul`
	list-style: none;
	cursor: pointer;
	padding: 0;
	margin: 0;
	left: 0;
	display: block;
	position: fixed;
	top: calc(${DIMENSIONS.heights.navbar.standard}px * 1);
	border-radius: 0;
	padding: 0 30px 30px 0;
	border-right: 1px solid #00000020;
	font-size: 1.24em;
	max-width: inherit;
	max-height: calc(100vh - ${DIMENSIONS.heights.navbar.standard}px);
	overflow-y: auto;
	height: calc(100vh - ${DIMENSIONS.heights.navbar.standard}px);
	a {
	.jsonObjectTitle {
		color: ${COLORS.purple.rollover};
		padding: 0.3em 0.34em;
	}
	&:not([href]):not([class]) {
		.jsonObjectTitle {
		color: ${COLORS.purple.rollover}CD;
		background: transparent;
		}
	}
	.subHeading {
		color: grey;
		&:hover {
		color: ${COLORS.StoneClassyDarkColor};
		}
	}
	}
	a.activeGroup {
	&:hover {
		text-decoration: none;
	}
	.subHeading {
		height: 26px;
		transition: height 0.1s ease;
		padding-left: 6px;
		position: relative;
		left: -6px;
	}
	.faqCount {
		display: none;
	}
	}
	a.activeSubHeading {
	// FaqLink Active style
	position: relative;
	left: -5px;
	border-left: solid transparent 5px;
	//
	&:hover {
		text-decoration: none;
	}
	li {
		border-left: solid ${COLORS.purple.rollover} 5px;
		transition: border, color, 0.3s ease;
		color: ${COLORS.StoneClassyDarkColor};
		/* background: ${COLORS.purple.rollover}; */
	}
	}
`;

export const FaqCount = styled.li`
	border-radius: 10px;
	display: block;
	position: relative;
	top: 40px;
	opacity: 0.8;
	margin-left: 1em;
`;

export const FaqLink = styled.li`
	margin: 1em 0;
	padding: 1em;
	line-height: 0;
	font-weight: bold;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	border: solid transparent 1px;
	transition: border 0.3s ease;
	.jsonObjectTitle {
	text-transform: uppercase;
	position: relative;
	white-space: nowrap;
	//
	top: 1px;
	left: 1px;
	}
	&.subHeading {
	font-weight: normal;
	margin-left: 1em;
	overflow: hidden;
	height: 0px;
	display: block;
	margin: 0 0 0 2em;
	padding: 0;
	transition: height 0.145s ease;
	line-height: 26px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: inherit;
	}
`;

export const MobileScrollContent = styled.div`
	// Hide on Desktop
	display: none;
	overflow-x: none;
	// Styles main:
	@media screen and (max-width: ${mobileBreakpoint}) {
	display: flex;
	flex-direction: column;
	background: red;
	min-height: 100vh;
	}
`;

export const FooterRowStyle = styled.div<{ footerHeight: number }>`
	height: ${(props) => props.footerHeight && `${props.footerHeight}px`};
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	div {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 100%;
	}
	a {
	height: 100%;
	&:hover {
		text-decoration: none;
	}
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	box-shadow: 0px 5px 10px #7c6c6c30 inset;
	height: ${DIMENSIONS.heights.footer.mobile}px;
	background: ${COLORS.StoneLightWhiteGrey};
	}
	ul {
	list-style-type: none;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	margin: 0;
	padding: 0;
	li {
		margin: 0;
		padding: 0;
	}
	}
`;

export const ScrollableContent = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: ${DIMENSIONS.heights.navbar.standard}px;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: scroll;
	@media screen and (max-width: ${mobileBreakpoint}) {
	right: -10px;
	}
`;

export const GalleryRow = styled(Row)`
	max-width: 66vw;
	margin: 0 auto;
	text-align: justify;
	@media screen and (max-width: 768px) {
	max-width: unset;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	text-align: left;
	}
`;

export const InitialSlide = styled.div`
	display: flex;
	padding: 4.2em 1.5em 0 1.5em;
	flex-direction: column;
	justify-content: space-around;
	overflow-x: hidden;
	overflow-y: auto;
	@media screen and (max-width: ${mobileBreakpoint}) {
	min-height: unset;
	padding: 0 0 1.2em 0;
	margin-bottom: -1.2em;
	}
`;

export const ColAnimated = styled(Col)`
	transition: left, top, 0.5s ease;
	/* position: ${(props) => props.animated && "absolute"};
	top: ${(props) => props.animated && "13vh"};
	left: ${(props) => props.animated && "3vw"}; */
	z-index: 1;
`;

export const ArticleColAnimated = styled(Col)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: ${DIMENSIONS.widths.johnsWidth}px) 
		and (max-height: ${DIMENSIONS.heights.johnsHeight}px) {
	bottom: 40px;
	left: 20px;
	}
	@media screen 
		and (max-width: 812px) 
		and (orientation: landscape) {
	overflow-y: scroll;
	overflow-x: hidden;
	height: 100%;
	top: ${DIMENSIONS.heights.navbar.mobile}px;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	display: none;
	}
`;

export const CorporateSlideDiv = styled.div<{ alternativeColor: boolean }>`
	max-width: 850px;
	margin: 0 auto;
	//
	background: ${(props) =>
		!props.alternativeColor ? "transparent" : `${COLORS.StoneClassyDarkColor}`};
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${(props) =>
		props.alternativeColor ? "white" : `${COLORS.StoneClassyDarkColor}`};
	font-size: 1.618em;
	border-radius: 1px;
	padding: 1em;
	transition: 0.2s ease;
	.imageCartoonHolder {
	position: relative;
	width: 100%;
	display: block;
	.imageCartoonImg {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 600px;
		margin: 0 auto;
		aspect-ratio: 16 / 9;
	}
	.imageCartoonImg2 {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	}
	@media screen and (min-width: 1440px) {
	margin: 0 auto 1rem auto;
	}
	p {
	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 0.89em;
	}
	}
`;

export const DownloadButtonStyle = styled.button<{
	buttonPosition: string | undefined;
	height: number | undefined;
}>`
	border: none;
	//
	width: ${(props) =>
		props.buttonPosition === "homePageFooterButton" && "263px"};
	color: white;
	text-shadow: 0 2px 2px #00000090, 0 -1px 2px #ffffff50;
	background: ${COLORS.purple.rollover};
	padding: 0 1em;
	font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, Roboto, Helvetica,
	Arial, sans-serif;
	position: relative;
	top: 0;
	font-size: 20px;
	box-shadow: 2px 2px 6px #00000000;
	transition: box-shadow 0.2s ease;
	font-weight: normal;
	height: ${DIMENSIONS.heights.navbar.standard}px;
	svg {
	margin: 0 0.5rem;
	width: 20px;
	height: 20px;
	position: relative;
	top: -1px;
	}
	&:hover {
	box-shadow: 1px 3px 6px #00000060;
	transition: box-shadow 0.2s ease;
	}
	.tippleCircle {
	background: #ffffff20;
	height: 0px;
	width: 0px;
	display: block;
	margin: -50px auto 0 auto;
	border-radius: 100%;
	}
	&:focus {
	.tippleCircle {
		animation: ${TippleRipple} 1.3s forwards;
	}
	}
	.tipple {
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	overflow: hidden;
	position: absolute;
	border-radius: inherit;
	pointer-events: none;
	display: block;
	}
	&:hover {
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	display: none;
	}
`;

const handleButtonPosition = (buttonPosition: string) => {
	switch (buttonPosition) {
		case "pageFooterButton":
			return "column";
		case "homePageFooterButton":
			return "row";
		default:
			return "column";
	}
};

export const DownloadButtonHolder = styled.div<{
	buttonPosition: string;
	macUserInput: boolean;
}>`
	display: flex;
	background: ${COLORS.StoneClassyDarkColor};
	justify-content: center;
	align-items: ${(props) =>
		props.buttonPosition === "pageFooterButton" && props.macUserInput
			? "end"
			: "center"};
	flex-direction: ${(props) => handleButtonPosition(props.buttonPosition)};
	@media screen and (max-width: ${mobileBreakpoint}) {
	display: none;
	}
`;

export const DownloadButtonProper = styled.div`
	color: white;
	background: ${COLORS.StoneClassyDarkColor};
`;

export const ContactButtonStyle = styled.button<{ superFooterStyle: boolean }>`
	background: ${(props) => (props.superFooterStyle ? "white" : "transparent")};
	border: 2px solid transparent;
	display: block;
	margin: 0 0.1vw;
	letter-spacing: 0.069rem;
	letter-spacing: 0.069rem;
	font-family: "Cabin", sans-serif;
	font-size: 1.05rem;
	height: 100%;
	padding-top: 0.2rem;
	color: ${(props) =>
		props.superFooterStyle
			? COLORS.StoneClassyDarkColor
			: COLORS.StoneLightWhiteGrey};
	@media screen and (max-width: ${mobileBreakpoint}) {
	background: ${(props) => props.superFooterStyle && "transparent"};
	color: ${(props) =>
		props.superFooterStyle && `${COLORS.StoneCadenceGreen}`};
	top: ${(props) => props.superFooterStyle && "1px"};
	}
	svg {
	margin: 0 0.5rem;
	width: 20px;
	height: 20px;
	position: relative;
	top: -1px;
	}
	.tippleCircle {
	background: #ffffff20;
	height: 0px;
	width: 0px;
	display: block;
	margin: -50px auto 0 auto;
	border-radius: 100%;
	}
	&:focus {
	.tippleCircle {
		animation: ${TippleRipple} 1.3s forwards;
	}
	}
	.tipple {
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	overflow: hidden;
	position: absolute;
	border-radius: inherit;
	pointer-events: none;
	display: block;
	}
`;

export const FaArrowCircleRightStyled = styled(FaArrowCircleRight)`
	@media screen and (max-width: 414px) {
	opacity: 0;
	width: 0px;
	overflow: hidden;
	}
`;
export const ArticleSpan = styled.span`
	p {
	font-size: 1.06rem;
	line-height: 1.79rem;
	text-align: justify;
	margin: 1rem 0 0 0;
	@media screen and (max-width: ${DIMENSIONS.widths.johnsWidth}px) 
		and (max-height: ${DIMENSIONS.heights.johnsHeight}px) {
		font-size: 1rem;
	}
	@media screen and (max-width: ${DIMENSIONS.breakPoints.mobile}) {
		font-size: 0.7rem;
	}
	}
`;

export const ContinueReadingButtonHolder = styled.div`
	background: linear-gradient(0deg, white 31%, #ffffff00 100%);
	position: relative;
	width: 100%;
	display: block;
	top: -56px;
	display: flex;
	align-items: start;
	justify-content: center;
	margin: 1rem 0 -2rem 0;
`;

export const ContinueReadingButton = styled(Button)`
	background: ${COLORS.StoneLightWhiteGrey} !important;
	&:hover {
	color: unset !important;
	}
`;

export const ArticleIframeDiv = styled.div`
	width: 100%;
	min-width: 267px;
	position: relative;
	@media screen 
	and (max-width: ${DIMENSIONS.widths.johnsWidth}px) 
	and (min-width: ${DIMENSIONS.widths.johnsWidth - 10}px) 
	and (max-height: ${DIMENSIONS.heights.johnsHeight}px) 
	and (min-height: ${DIMENSIONS.heights.johnsHeight - 10}px) {
	padding: 0 60px;
	}
	iframe {
	@media screen and (max-width: 567px) {
		margin: 0.3rem;
	}
	}
`;
const pStylesforTips = `width: 100%;
padding: 1.669rem;
line-height: 1.35rem;
margin: 0;
font-size: 1.15rem;
font-family: 'Cabin', sans-serif;
text-align: center;`;

export const MoreInfoButton = styled.button<{ transitionActive: boolean }>`
	background: white;
	position: absolute;
	top: 34px;
	left: -173px;
	width: 200px;
	z-index: 1;
	/* border: cyan; */
	-webkit-transition: opacity 0.3s ease;
	transition: opacity 0.3s ease, border-width 0.3s ease;
	border-radius: 16px;
	P {
	${pStylesforTips}
	transition: margin-top, 0.1s ease;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	display: none;
	}
	/* &:hover {
	border-width: 4px;
	transition: border-width, 0.1s ease;
	p {
		margin-top: -2px;
		transition: margin-top, 0.1s ease;
	}
	} */
`;

export const ToolTipPortal = styled(animated.div) <{
	fadeOut: boolean;
	backgroundColor: string;
	textColor: string;
	orientation: string;
	transitionActive: boolean;
}>`
	background-color: ${(props) => props.backgroundColor};
	width: 200px;
	position: absolute;
	bottom: 0;
	border-radius: 16px;
	z-index: 99;
	box-shadow: 3px 3px 15px #00000030;
	transition: box-shadow 0.3s ease;
	&:hover {
	box-shadow: 0px 3px 17px #00000050;
	transition: box-shadow 0.3s ease;
	}
	////////////////////////////////
	&:before {
	content: "";
	display: block;
	top: 50%;
	transform: translateY(-50%);
	${(props) =>
		props.orientation === "right"
			? `
	 left: -20px;
	 border-color: transparent ${props.backgroundColor} transparent transparent;
	`
			: `
	right: -20px;
	border-color: transparent transparent transparent ${props.backgroundColor};
	`};
	position: absolute;
	z-index: 100;
	border-width: 10px;
	border-style: solid;
	background: transparent;
	}
	p {
	pointer-events: none;
	}
	a {
	border: solid 1px ${(props) => props.textColor};
	padding: 0.931em !important;
	border-radius: 16px;
	background: ${COLORS.StoneClassyDarkColor};
	margin: 3px;
	display: block;
	margin: 0 auto;
	border: solid ${(props) => props.backgroundColor} 7px;
	color: ${(props) => props.backgroundColor} !important;
	}
	p,
	a {
	${pStylesforTips}
	color: ${(props) => props.textColor};
	@media screen and (max-width: ${DIMENSIONS.widths.johnsWidth}px) 
		and (max-height: ${DIMENSIONS.heights.johnsHeight}px) {
		font-size: 1em;
	}
	}
	@media screen and (max-width: 1024px) {
	${(props) =>
		props.orientation === "right" ? "right: -38%" : "left: -38%"};
	}
	@media screen and (max-width: ${DIMENSIONS.widths.johnsWidth}px) 
		and (max-height: ${DIMENSIONS.heights.johnsHeight}px) {
	bottom: 60px;
	right: -30%;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	display: none;
	}
`;

export const ExampleHolderDiv = styled.div<{ transitionActive: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 800px;
	margin: 0 auto;
	height: 830px;
	@media screen and (max-width: ${mobileBreakpoint}) {
	width: 100%;
	height: unset;
	}
	img {
	position: absolute;
	height: 100%;
	${(props) => !props.transitionActive && "filter:blur(20px)"};
	transition: filter ease 1.4s;
	top: 0;
	bottom: 0;
	@media screen and (max-width: ${mobileBreakpoint}) {
		display: none;
	}
	}
`;

export const ArticleHolderDiv = styled(animated.div) <{
	transitionActive: boolean;
}>`
	padding: 1em 4em;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 15px;
	box-shadow: 3px 20px 35px #00000060;
	background-color: white;
	margin: 1em;
	/* max-width: 780px; */
	display: flex;
	align-items: center;
	justify-content: center;
	// ANIMATION
	pointer-events: ${(props) => props.transitionActive && "none"};
	@media screen and (max-width: 1400px) {
	}
	@media screen and (max-width: 967px) {
	padding: 1em 2em;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
	width: 100%;
	margin: -2em auto 1em auto;
	min-width: 98vw;
	}
	//
	.headline {
	margin-top: 1rem;
	margin-left: -0.3em;
	font-family: ivypresto-headline, serif;
	font-weight: 700;
	font-style: normal;
	font-size: 2.2em;
	letter-spacing: -0.01em;
	@media screen and (max-width: ${DIMENSIONS.widths.johnsWidth}px) 
		and (max-height: ${DIMENSIONS.heights.johnsHeight}px) {
		font-size: 1.66em;
	}
	}
	p {
	@media screen and (max-width: ${mobileBreakpoint}) {
		font-size: 1em;
	}
	}
	.exampleHeader {
	color: ${COLORS.StoneLightWhiteGrey};
	padding: 0.8em;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 16px;
	box-shadow: 3px 3px 15px #00000030;
	background: ${COLORS.StoneLightWhiteGrey};
	p {
		width: 100%;
		color: ${COLORS.StoneClassyDarkColor};
		margin: 0;
		padding: 0.2 0.3em;
		font-size: 1.11em;
		font-family: "Cabin", sans-serif;
		pointer-events: none;
		text-align: center;
	}
	@media screen and (max-width: ${mobileBreakpoint}) {
		top: -45px;
		left: 7px;
	}
	@media screen and (max-width: ${DIMENSIONS.widths.johnsWidth}px) 
		and (max-height: ${DIMENSIONS.heights.johnsHeight}px) {
		top: -36px;
		left: -7px;
		p {
		width: 100%;
		color: ${COLORS.StoneClassyDarkColor};
		margin: 0;
		padding: 0.2 0.3em;
		font-size: 1em;
		font-family: "Cabin", sans-serif;
		pointer-events: none;
		text-align: center;
		}
	}
	}
`;
