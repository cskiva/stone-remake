import { Col, Container, Row } from "react-bootstrap";
import { ContactButton, DownloadButton } from "../components/Buttons/Buttons";
import {
	CorporateSlideDiv,
	FooterRowStyle,
	HomeH1,
	HomeP,
	InitialSlide,
	ScrollableContent,
	StoneTitleJumbotron
} from "../components/pageComponents/styles/HomeStyles";
import { FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { isLightMode, setIsLightMode } from "../components/state/settingsState";
import { useAppDispatch, useAppSelector } from "../components/state/hooks";

import { COLORS } from "../components/styles/colors";
import DIMENSIONS from "../components/styles/GlobalDimensions";
import FooterStone from "../components/global/layout/Footer";
import Head from "next/head";
import { HiChevronDoubleDown } from "react-icons/hi";
import Logo from "../public/images/SVG/logo.svg";
import NavbarStone from "../components/global/layout/Navbar";
import { TrackEvent } from "./_app";
import useWindowDimensions from "../helpers/GetWindowDimensions";

export default function learnMore() {
	// Redux 
	const dispatch = useAppDispatch();
	const lightMode = useAppSelector(isLightMode);
	// Refs
	const bodyDiv = useRef<HTMLDivElement>(null);
	const scrollableContent = useRef<HTMLDivElement>(null);
	const middleSlide = useRef<HTMLDivElement>(null);
	// States
	const [middleSlideHeight, setMiddleSlideHeight] = useState(0);
	const [bodyDivHeight, setBodyDivHeight] = useState(0);
	const [scrollHeight, setScrollHeight] = useState(0);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [footerHide, setFooterHide] = useState(false);
	//
	const { height, width } = useWindowDimensions();

	const [footerHeight, setFooterHeight] = useState(
		width ?? 0 <= DIMENSIONS.breakPoints.mobile
			? DIMENSIONS.heights.footer.mobile
			: DIMENSIONS.heights.footer.standard
	);

	const handleScroll = () => {
		const position = scrollableContent?.current?.scrollTop ?? 0;
		const height = scrollableContent?.current?.scrollHeight ?? 0;
		setScrollPosition(position);
		setScrollHeight(height);
		console.log(scrollPosition, "___", scrollHeight, "___", footerHide);
	};

	useEffect(() => {
		setFooterHide(
			width ?? 0 >= DIMENSIONS.breakPoints.mobile
				? scrollPosition >= scrollHeight - 610 - 210
				: // Mobile footer Hide:
				scrollPosition >= scrollHeight - 610 - 100
		);
	}, [scrollPosition]);

	useEffect(() => {
		TrackEvent("Landing Page View", new Map([]));
		if (typeof window !== "undefined") {
			if (localStorage.getItem("lightmode") === "true") {
				dispatch(setIsLightMode(true));
				console.log("Setting Light Mode FROM LOCAL TRUE");
			}
		}
	}, []);

	useEffect(() => {
		setBodyDivHeight(bodyDiv?.current?.scrollHeight ?? 0);
		setMiddleSlideHeight(middleSlide?.current?.scrollHeight ?? 0);
	});

	function setFooterHeightOnChange() {
		if (width ?? 0 < DIMENSIONS.breakPoints.mobile) {
			setFooterHeight(DIMENSIONS.heights.footer.mobile);
		}
		else {
			setFooterHeight(DIMENSIONS.heights.footer.standard);
		}
	}

	useEffect(() => {
		setFooterHeightOnChange();
	}, []);

	useEffect(() => {
		setFooterHeightOnChange();
	}, [width]);

	const BlurbContent = () => {
		return (
			<>
				<CorporateSlideDiv
					style={{ marginBottom: "0px", paddingBottom: "0px" }}
					alternativeColor={false}
				>
					{width ?? 0 >= DIMENSIONS.breakPoints.mobile ? (
						<HomeP style={{ marginBottom: ((width ?? 0) > 450 ? "2em" : "") }}>
							<span className="br">
								<strong> Simply download and install the application </strong>
							</span>
							<span className="br">
								(currently available in beta for Windows 10).
							</span>
						</HomeP>
					) : (
						<HomeP>
							<span className="br">
								Glad to see you&apos;re checking out Stone on Mobile.
							</span>
							<span className="br">
								<strong>
									Stone is exclusive to Windows 10 Desktop systems.
								</strong>
							</span>
						</HomeP>
					)}
					{/* Main Download Button */}
					{(width ?? 0) >= DIMENSIONS.breakPoints.mobile ? (
						<DownloadButton
							height={80}
							fadeOut={false}
							collapse={scrollPosition < 5}
							buttonPosition={""}
						/>
					) : (
						<HomeP>
							Visit our website on your desktop browser to download our
							software.
						</HomeP>
					)}
				</CorporateSlideDiv>
				<CorporateSlideDiv
					ref={middleSlide}
					alternativeColor={false}
				// animated={
				// 	scrollPosition > bodyDivHeight * multiplier &&
				// 	scrollPosition < bodyDivHeight * multiplier + middleSlideHeight
				// }
				>
					{(width ?? 0) >= DIMENSIONS.breakPoints.mobile && (
						<HomeP
							style={{
								marginTop: ((width ?? 0) < 450 ? "0px !important" : ""),
							}}
						>
							<span className="br">
								On first launch you will be prompted to create an account using
								your email address.
							</span>
							<span className="br">
								<strong>Stone will also ask you to create a video bio.</strong>
							</span>
							<span className="br">
								This is a short clip that goes at the end of all published
								Projects so your audience can get to know (and support) you.
							</span>
						</HomeP>
					)}
					<HomeH1>Capture Your Work...</HomeH1>

					<HomeP>
						At the desk, using screen capture or by uploading external media
						recorded in the field.
					</HomeP>
					{/* 
          <div className="imageCartoonHolder">
            <div className="imageCartoonImg2">
              <Slide2 pid="published-32d0463b-330a-48a2-b35d-e8dca0cbc6a8" />
            </div>
          </div> */}

					<HomeH1>...And Highlight Key Moments</HomeH1>
					<HomeP>
						By using your webcam while you work, or selecting important sections
						of external media.
					</HomeP>
				</CorporateSlideDiv>
				<CorporateSlideDiv alternativeColor={false}>
					<HomeH1>Review Your Work</HomeH1>

					{/* <div className="imageCartoonHolder my-5 d-md-block d-none">
            <div className="imageCartoonImg">
              <Slide1 pid="published-32d0463b-330a-48a2-b35d-e8dca0cbc6a8" />
            </div>
          </div> */}

					<HomeP>
						<span className="br">
							Stone is a “Linear Video Editor”, meaning most of the work is done
							as you go.
						</span>{" "}
						<span className="br">
							However, if you have used external media, you can add highlights
							to that. And of course, Stone enables you to permanently remove
							any sensitive personal information using the redact feature.
						</span>
						<span className="br">
							Fortunately, reviewing content is made easy by the fact that your
							work is played back at 24x regular speed.
						</span>
						<span className="br">
							Always be sure to review your research and make sure you are happy
							with it before publishing.
						</span>
					</HomeP>
				</CorporateSlideDiv>
				<CorporateSlideDiv key="Slide4" alternativeColor={false}>
					<StoneTitleJumbotron>
						<h1 className="display-4">Share Your Work With the World.</h1>
					</StoneTitleJumbotron>
					{/* Share Image */}

					{/* <div className="imageCartoonHolder">
            <div className="imageCartoonImg2">
              <Slide3 pid="published-32d0463b-330a-48a2-b35d-e8dca0cbc6a8" />
            </div>
          </div> */}

					<div style={{ marginBottom: "10vh" }}>
						<HomeH1>
							<span className="br">
								Once you’ve finished and clicked Publish,
							</span>
							<span className="br">You will be able to: </span>
						</HomeH1>
						<ul
							style={{
								fontSize: "0.88em",
								textAlign: "left",
								margin: "0 auto 0 auto",
							}}
						>
							<li>
								Share a public-facing{" "}
								<strong>
									{" "}
									<i>Project Page</i>
								</strong>
								<br /> with a complete video timeline of your research.
							</li>
							<li>
								Embed a{" "}
								<strong>
									<i>Research Portal</i>
								</strong>{" "}
								in your article,
								<br /> which plays highlights and links to the{" "}
								<strong>
									<i>Project Page</i>
								</strong>
								.
							</li>
							<li>
								Copy a QR code for paper documents that links to your{" "}
								<strong>
									{" "}
									<i>Project Page</i>
								</strong>
								.
							</li>
						</ul>
					</div>
				</CorporateSlideDiv>
			</>
		);
	};

	return (
		<>
			<Head>
				<title>Write In Stone</title>
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

			<NavbarStone />

			<Container
				fluid
				ref={bodyDiv}
				style={{
					// top: `calc(100vh - ${(width ?? 0) >= DIMENSIONS.breakPoints.mobile
					// 	? DIMENSIONS.paddingTop.navbar.standard
					// 	: DIMENSIONS.paddingTop.navbar.mobile}`,
					height: `calc(100vh - ${(width ?? 0) >= DIMENSIONS.breakPoints.mobile
						? DIMENSIONS.heights.navbar.standard
						: DIMENSIONS.heights.navbar.mobile
						// eslint-disable-next-line indent
						} px - ${!footerHide ? `${footerHeight}px` : "0px"})`,
					flexDirection: "column",
					overflow: ((width ?? 0) >= DIMENSIONS.breakPoints.mobile ? "hidden" : ""),
				}}
			>
				{/* Content */}         <ScrollableContent ref={scrollableContent} onScroll={handleScroll}>

					<Row className="ContentRow text-center h-100">
						<Col>

							<InitialSlide>
								{/* Mobile logo */}
								<div className="d-block d-md-none">
									<Logo width="20%" style={{ margin: "4rem auto 0 auto" }} />
								</div>
								<StoneTitleJumbotron>
									<h1 className="display-4">
										Research is valuable.
										<br />
										Make it visible.
									</h1>
								</StoneTitleJumbotron>
								{/* Desktop Header Text */}
								<div className="d-none d-md-block">
									<CorporateSlideDiv alternativeColor={false}>
										<HomeP>
											<span className="br">
												<strong>Stone creates video bibliographies.</strong>
											</span>
											<span className="br">
												Capture evidence with our free desktop software.
												<br />
												Share your research process with the world.
											</span>
										</HomeP>
									</CorporateSlideDiv>
								</div>
							</InitialSlide>
							{BlurbContent()}
							<div style={{ height: "190px" }} className="d-md-none d-block">
								<FooterStone mobileVersion />
							</div>

						</Col>
					</Row>      </ScrollableContent>
			</Container>
			{/* Footer */}

			<FooterRowStyle
				footerHeight={footerHeight}
				style={{
					maxHeight: footerHide ? "0px" : "unset",
					overflow: "hidden",
				}}
			>
				<div style={{ marginRight: "10px" }}>
					{/* Show this one on scroll past */}
					{scrollPosition <= scrollHeight / 14 && (
						<div
							style={{
								padding: 0,
								margin: "0 33.33vw 0 0",
							}}
							className="d-none d-md-flex"
						>
							<HiChevronDoubleDown size={20} />
						</div>
					)}
					{(width ?? 0) > DIMENSIONS.breakPoints.mobile &&
						scrollPosition >= scrollHeight / 6 &&
						<DownloadButton
							height={50.72}
							buttonPosition="homePageFooterButton"
							fadeOut={false}
							collapse={false}
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
		</>
	);
}
