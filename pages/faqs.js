import { Col, Container, Row } from "react-bootstrap";
import { ContactButton, DownloadButton } from "../components/Buttons/Buttons";
import { FaLinkedin, FaSearch, FaTelegram, FaTwitter } from "react-icons/fa";
import {
	FaqCount,
	FaqLink,
	FaqLinkWrapper,
	FaqList,
	FooterRowStyle,
	MiniSearchBar,
	StoneTitleJumbotron
} from "../components/pageComponents/styles/HomeStyles";
import { React, useEffect, useRef, useState } from "react";
import {
	Link as ScrollLink,
	animateScroll as scroll,
	scroller
} from "react-scroll";

import Autocomplete from "@mui/material/Autocomplete";
import { COLORS } from "../components/styles/colors";
import DIMENSIONS from "../components/styles/GlobalDimensions";
import Head from "next/head";
import NavbarStone from "../components/global/layout/Navbar";
import { RiQuestionnaireFill } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import { TrackEvent } from "./_app";
import marked from "marked";
import { setIsLightMode } from "../components/state/settingsState";
import { useAppDispatch } from "../components/state/hooks";
import useWindowDimensions from "../helpers/GetWindowDimensions";

function Faqs(props) {
	// Redux /////////////////////////
	const dispatch = useAppDispatch();
	// Constants /////////////////////
	const { height, width: windowWidth } = useWindowDimensions();
	const [autoCompleteValue, setAutoCompleteValue] = useState("");
	// Refs //////////////////////////
	const bodyDiv = useRef(null);
	// States ////////////////////////d
	const [lightmode, setLightMode] = useState(true);

	const [allSubheadings, setAllSubheadings] = useState([]);
	const [blurLinks, setBlurLinks] = useState(false);
	const [titleMap, setTitleMap] = useState([]);
	const [titleMapGenerated, setTitleMapGenerated] = useState(false);

	const [footerHeight, setFooterHeight] = useState(
		windowWidth <= DIMENSIONS.breakPoints.mobile
			? DIMENSIONS.heights.footer.mobile
			: DIMENSIONS.heights.footer.standard
	);

	useEffect(() => {
		TrackEvent("FAQ Page View", new Map([]));
		//
		if (typeof window !== "undefined") {
			if (localStorage.getItem("lightmode") === "true") {
				dispatch(setIsLightMode(true));
				console.log("Setting Light Mode FROM LOCAL TRUE");
			}
		}
	}, []);

	useEffect(() => {
		ProcessContent();
	});

	// AutoComplete value computed

	useEffect(() => {
		if (titleMapGenerated) {
			let allLists = titleMap.map((headingObject) => headingObject.subHeadings);
			setAllSubheadings(
				allLists
					.reduce(function (a, b) {
						return a.concat(b);
					}, [])
					.map((subheadingObject) => subheadingObject.subHeading)
			);
		}
	}, [titleMap]);

	useEffect(() => {
		console.log(autoCompleteValue);
		goToScrollSearch(autoCompleteValue);
	}, [autoCompleteValue]);

	function goToScrollSearch(location) {
		scroll.scrollTo(location);
	}

	function ProcessContent() {
		if (titleMapGenerated) {
			return;
		}
		let sectionsMatches = [...props.content.default.split(/^# [^#\r\n]+/gm)];
		let titleMatches = [...props.content.default.matchAll(/^# ([^#\r\n]+)/gm)];

		let jsonObject = [];
		sectionsMatches.forEach((section, i) => {
			if (i === 0) {
				return;
			}
			let subHeadingMatches = [...section.matchAll(/## ([^#\r\n]+)/gm)];
			let contentMatches = [
				...section.matchAll(/##[^#\r\n]+[\r\n\r\n]{2,4}([^#]+)/gm),
			];

			let newElement = { title: titleMatches[i - 1][1], subHeadings: [] };
			if (subHeadingMatches.length !== contentMatches.length) {
				console.error(
					"The markdown file was malformed: ",
					contentMatches.length,
					"/",
					subHeadingMatches.length
				);
				console.log(titleMatches);
				console.log(subHeadingMatches);
				console.log(contentMatches);
				return;
			}
			subHeadingMatches.forEach((subHeading, j) => {
				newElement.subHeadings.push({
					subHeading: subHeading[1],
					bodyText: contentMatches[j][1],
				});
			});
			jsonObject.push(newElement);
		});

		// console.log(titleMap);
		// console.log(oldJson);
		setTitleMap(jsonObject);
		setTitleMapGenerated(true);
	}

	function FaqNav() {
		//
		const [activeNavLink, setActiveNavLink] = useState(false);

		if (!titleMapGenerated) {
			return <></>;
		}
		console.log("Rendering with: ", titleMap);
		return titleMap.map((jsonObject) => (
			<div style={{ filter: blurLinks && "blur(5px)" }} key={`${jsonObject.title}A`}>
				<ScrollLink
					to={jsonObject.title}
					spy={true}

					smooth={true}
					containerId="bodyDiv"
					activeClass="activeGroup"
					hashSpy={false}
					onSetActive={() => setActiveNavLink(true)}
				>
					<FaqLink>
						<div>
							<span className="jsonObjectTitle">
								<RiQuestionnaireFill
									style={{
										position: "relative",
										left: "-2px",
										fill: COLORS.purple.rollover,
										top: "-2px",
										margin: "0 0.28rem",
									}}
									fill={COLORS.StoneClassyDarkColor}
								/>
								{jsonObject.title}
							</span>
						</div>
						<FaqCount className="faqCount">
							{jsonObject.subHeadings.length} Questions
						</FaqCount>
					</FaqLink>

					{jsonObject.subHeadings.map((subHeading) => (
						<ScrollLink
							to={subHeading.subHeading}
							spy={true}
							smooth={true}
							containerId="bodyDiv"
							offset={-10}
							activeClass="activeSubHeading"
							hashSpy={false}
							key={`${subHeading.subHeading}B`}
						>
							<FaqLink className="subHeading">{subHeading.subHeading}</FaqLink>
						</ScrollLink>
					))}
				</ScrollLink>
			</div>
		));
	}

	function BodyRender() {
		if (!titleMapGenerated) {
			return <></>;
		}

		return titleMap.map((jsonObject) => (
			<Container className="mx-auto my-5" key={`${jsonObject.title}C`} style={{maxWidth: "unset"}}>
				<div id="Element" name={jsonObject.title}>
					<h3>{jsonObject.title}</h3>
					{jsonObject.subHeadings.map((subHeading) => (
						<div id="Element" name={subHeading.subHeading} key={`${subHeading.subHeading}D`}>
							<h5>{subHeading.subHeading}</h5>
							<div
								dangerouslySetInnerHTML={{
									__html: marked(subHeading.bodyText),
								}}
							/>
						</div>
					))}
				</div>
			</Container>
		));
	}

	return (
		<div style={{ overflow: "auto" }}>
			<Head>
				<title>Write In Stone - FAQs</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="icon" href="favicon.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<NavbarStone landingPageElement={true} showSettings={false} lightmode={lightmode} checkout={false} />

			<Container
				// onScroll={handleScroll}
				fluid
				id="bodyDiv"
				ref={bodyDiv}
				style={{
					height: `calc(100vh - ${windowWidth <= DIMENSIONS.breakPoints.mobile
						? DIMENSIONS.heights.navbar.standard
						: DIMENSIONS.heights.navbar.standard
						// eslint-disable-next-line indent
						}px + 15px)`,
					overflowY: "scroll",
					padding: "0px 15px",
				}}
			>
				<Row style={{ marginBottom: `${footerHeight}px` }}>
					<Col md={3} lg={3} className="d-none d-md-block">
						<FaqLinkWrapper>
							{/* TODO: Hide on Page Top */}
							<MiniSearchBar>
								<Autocomplete
									onInputChange={(event, value) => {
										setAutoCompleteValue(value);
									}}
									onFocus={() => {
										setBlurLinks(true);
									}}
									onBlur={() => {
										setBlurLinks(false);
									}}
									onChange={(event, value) => {
										scroller.scrollTo(value, {
											containerId: "bodyDiv",
											duration: 800,
											delay: 0,
											smooth: "easeInOutQuart",
										});
										setBlurLinks(false);
									}}
									css={{ background: "white", flex: 0.88 }}
									freeSolo
									id="FAQSearchBar"
									disableClearable
									options={allSubheadings}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Search Questions"
											InputProps={{
												...params.InputProps,
												type: "search",
											}}
										/>
									)}
									renderOption={(props, option) => (
										<p
											style={{
												height: "30px",
												color: "black",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
												overflowX: "hidden",
											}}
											{...props}
										>
											{option}
										</p>
									)}
								/>
								<FaSearch />
							</MiniSearchBar>
							<FaqNav />
						</FaqLinkWrapper>
					</Col>

					<Col>
						<Container className="mx-auto w-100" style={{maxWidth: "unset"}}>
							<StoneTitleJumbotron>
								<h1 className="display-4">FAQ:</h1>
							</StoneTitleJumbotron>
						</Container>
						<FaqList>
							<BodyRender />
						</FaqList>
					</Col>
				</Row>

				<FooterRowStyle
					footerHeight={footerHeight}
				>
					<div style={{ marginRight: "10px" }}>

						{windowWidth > DIMENSIONS.breakPoints.mobile &&
							<DownloadButton
								height={50.72}
								buttonPosition="homePageFooterButton"
							/>
						}
						<span className="d-md-none">
							<ul>
								<li>
									<a href="https://twitter.com/writeinstone" target="_blank" rel="noreferrer">
										<FaTwitter fill={COLORS.StoneClassyDarkColor} size={23} />
									</a>
								</li>
								<li>
									<a href="https://t.me/WriteInStonePublic" target="_blank" rel="noreferrer">
										<FaTelegram fill={COLORS.StoneClassyDarkColor} size={23} />
									</a>
								</li>
								<li>
									<a
										href="https://www.linkedin.com/company/writeinstone/"
										target="_blank" rel="noreferrer"
									>
										<FaLinkedin fill={COLORS.StoneClassyDarkColor} size={23} />
									</a>
								</li>
							</ul>
						</span>
						<ContactButton superFooterStyle />
					</div>
				</FooterRowStyle>

			</Container>
		</div>
	);
}

Faqs.getInitialProps = async (ctx) => {
	// eslint-disable-next-line no-undef
	const content = await require("../components/pageComponents/articles/faq.md");
	return { content: content };
};

export default Faqs;
