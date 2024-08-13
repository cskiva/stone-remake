import { FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa";
import {
	FooterContent,
	GifBackground,
	SignUpMobile,
	SignUpPopup,
	SignUpPopupChrome,
	SignUpPopupWrapper
} from "../components/pageComponents/styles/HomeStyles";
import MailchimpSubscribe, { EmailFormFields } from "react-mailchimp-subscribe";
import React, { useEffect, useState } from "react";
import {
	isMailingListVisible,
	setIsMailingListVisible,
	setStoneSubscribeFormStatus,
	stoneSubscribeFormStatus
} from "../components/state/settingsState";
import { useAppDispatch, useAppSelector } from "../components/state/hooks";

import AboutUsComponent from "../components/pageComponents/AboutUsComponent";
import { BsSlashCircle } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { Container } from "react-bootstrap";
import DIMENSIONS from "../components/styles/GlobalDimensions";
import { DownloadButton } from "../components/Buttons/Buttons";
import Head from "next/head";
import Link from "next/link";
import NavbarStone from "../components/global/layout/Navbar";
import { RiMailCheckLine } from "react-icons/ri";
import StoneSubscribeForm from "../components/pageComponents/StoneSubscribeForm";
import { TrackEvent } from "./_app";
import {isMobile} from "react-device-detect";
import { useSpring } from "react-spring";

export default function home() {
	// Redux
	const dispatch = useAppDispatch();
	const mailingListVisible = useAppSelector(isMailingListVisible);
	const currentStoneSubscribeFormStatus = useAppSelector(
		stoneSubscribeFormStatus
	);
	//
	const aboutUsComponent = React.useRef<HTMLDivElement>(null);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	//
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const [resetForm, setResetForm] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollLimitReached, setScrollLimitReached] = useState(false);

	useEffect(() => {
		TrackEvent("Landing Page View", new Map([]));
		console.log(baseUrl);
		dispatch(setIsMailingListVisible(true));
		dispatch(setStoneSubscribeFormStatus(0));
	}, []);

	useEffect(() => {
		if (mailingListVisible) {
			dispatch(setIsMailingListVisible(false));
		}
		if (!scrollLimitReached) {
			dispatch(setIsMailingListVisible(true));
		}
	}, [scrollLimitReached]);

	const mailChimpUrl = `https://writeinstone.us4.list-manage.com/subscribe/post?u=${process.env.MAILCHIMP_U}&id=${process.env.MAILCHIMP_ID}`;

	const springUp = useSpring({
		config: { tension: isMobile ? 59 : 46, friction: isMobile ?  14 : 9, velocity: 0 },
		from: { opacity: 0, bottom: "-600px" },
		to: {
			opacity: mailingListVisible ? 1 : 0,
			bottom: mailingListVisible
				? isMobile ? "0px" : `${DIMENSIONS.heights.navbar.standard}px`
				: "-600px",
		},
	});

	return (
		<>
			<div style={{ overflow: "auto" }}>
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
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>

				<NavbarStone
					landingPage={true}
				/>

				<Container fluid>
					<GifBackground
						scrollLimitReached={scrollLimitReached}
						ref={wrapperRef}
						onScroll={() => {
							if (
								aboutUsComponent.current !== null &&
								wrapperRef.current !== null
							) {
								const aboutUsHeight = aboutUsComponent.current.scrollHeight;
								const wrapperRefHeight = wrapperRef.current.scrollHeight;
								const scrollHeight = wrapperRefHeight - aboutUsHeight;
								const { scrollTop } = wrapperRef.current;
								setScrollPosition(scrollTop);
								setScrollLimitReached(
									(scrollPosition * 2) > scrollHeight ? true : false
								);
							}
						}}
					>
						<Link href="/aboutUs">
							<div className="bg" />
						</Link>

						<SignUpPopupWrapper
							style={springUp}
							mailingListOpen={mailingListVisible}
						>
							<SignUpPopupChrome>
								{currentStoneSubscribeFormStatus === 0 ||
									currentStoneSubscribeFormStatus === 2 ?

									<button>
										<CgClose
											onClick={() => {
												dispatch(setIsMailingListVisible(!mailingListVisible));
												dispatch(setStoneSubscribeFormStatus(0));
											}}
										/>
									</button>

									: currentStoneSubscribeFormStatus === 3 ||
										currentStoneSubscribeFormStatus === 4 ?

										<button>
											<RiMailCheckLine style={{ opacity: 0.3 }} />
										</button>
										:
										<button>
											<BsSlashCircle style={{ opacity: 0.3 }} />
										</button>

								}
							</SignUpPopupChrome>
							<SignUpPopup>
								<MailchimpSubscribe
									url={mailChimpUrl}
									render={({ subscribe, status, message }) => (
										<StoneSubscribeForm
											mailingListOpen={mailingListVisible}
											status={status}
											message={message}
											onValidated={(formData: EmailFormFields) =>
												subscribe(formData)
											}
										/>
									)}
								/>
							</SignUpPopup>
						</SignUpPopupWrapper>
						<div ref={aboutUsComponent}>
							<AboutUsComponent />
						</div>
					</GifBackground>
				</Container>
				<FooterContent>
					<div className="border">
						<DownloadButton
							height={80}
							fadeOut={false}
							collapse={false}
							buttonPosition=""
						/>
						{!mailingListVisible ? (
							<button
								onClick={() => dispatch(setIsMailingListVisible(true))}
								style={{
									cursor: mailingListVisible ? "default !important" : "pointer",
									position: "fixed",
									right: 0,
									bottom: "5px",
									background: "transparent",
									border: 0,
								}}
							>
								<FaRegEnvelope
									style={{
										width: "22px",
										height: "22px",
										margin: "10px",
									}}
								/>
							</button>
						) : (
							<button
								onClick={() =>
									currentStoneSubscribeFormStatus === 0 ||
									(currentStoneSubscribeFormStatus === 2 &&
										dispatch(setIsMailingListVisible(false)))
								}
								style={{
									position: "fixed",
									right: 0,
									bottom: "7px",
									background: "transparent",
									border: 0,
									cursor: mailingListVisible ? "auto" : "pointer",
								}}
							>
								<FaRegEnvelopeOpen
									style={{
										opacity: 0.5,
										width: "22px",
										height: "22px",
										margin: "10px",
									}}
								/>
							</button>
						)}
					</div>
				</FooterContent>
			</div>

			<SignUpMobile mailingListOpen={mailingListVisible} style={springUp}>
				<SignUpPopupChrome>
					<button style={{ pointerEvents: "none", position: "absolute", left: 0, marginLeft: "20px" }}>
						<FaRegEnvelope />
					</button>
					<button style={{ position: "absolute", right: 0, marginRight: "20px" }}>
						<CgClose
							onClick={() => {
								dispatch(setIsMailingListVisible(!mailingListVisible));
								dispatch(setStoneSubscribeFormStatus(0));
							}}
						/>
					</button>
				</SignUpPopupChrome>
				<SignUpPopup>
					<MailchimpSubscribe
						url={mailChimpUrl}
						render={({ subscribe, status, message }) => (
							<StoneSubscribeForm
								mailingListOpen={mailingListVisible}
								status={status}
								message={message}
								onValidated={(formData: EmailFormFields) => subscribe(formData)}
							/>
						)}
					/>
				</SignUpPopup>
			</SignUpMobile>
		</>
	);
}
