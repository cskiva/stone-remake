import {
	AboutUsP,
	ArticleHolderDiv,
	ArticleIframeDiv,
	ArticleSpan,
	ContinueReadingButton,
	ContinueReadingButtonHolder,
	ExampleHolderDiv,
	GalleryRow,
	InitialSlide,
	MoreInfoButton,
	StoneTitleJumbotron,
	StoneTitleJumbotronFancy,
	ToolTipPortal
} from "./styles/HomeStyles";
import { BsFillClockFill, BsFillPersonFill } from "react-icons/bs";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../state/hooks";

import { COLORS } from "../styles/colors";
import { CgDisplayFullwidth } from "react-icons/cg";
import DIMENSIONS from "../styles/GlobalDimensions";
import FooterStone from "../global/layout/Footer";
import React from "react";
import UserCard from "./UserCard";
import { useSpring } from "react-spring";
import { useState } from "react";

export default function AboutUsComponent() {
	// STATE ///////////////////////////////////////////////////////////////////
	const [transitionActive, setTransitionActive] = useState(false);
	// CONST ///////////////////////////////////////////////////////////////////
	const springLeft = useSpring({
		left: !transitionActive ? "-173px" : "-173px",
		transform: !transitionActive ? "translateY(-124%)" : "translateY(-368%)",
	});
	const springRight = useSpring({
		right: !transitionActive ? "-173px" : "-173px",
		transform: !transitionActive ? "translateY(-415%)" : "translateY(-452%)",
	});
	const springRightApp = useSpring({
		right: !transitionActive ? "-173px" : "-173px",
		bottom: !transitionActive ? "0" : "172px",
		opacity: !transitionActive ? 0 : 1,
	});
	const articleSpinSpring = useSpring({
		transform: transitionActive
			? "rotateX(-60deg) rotateY(5deg) rotateZ(50deg) skewX(1deg) skewY(-1deg) scale(0.6) translateX(-200px) translateY(-500px)"
			: "rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg) skewY(0deg) scale(1) translateX(0px) translateY(0px)",
		opacity: transitionActive ? 0 : 1,
	});

	const ArticlePreview = () => {
		// if (props.featuredPost !== undefined) {
		return (
			<ExampleHolderDiv transitionActive={transitionActive}>
				<img src="./images/stack.png" />
				<MoreInfoButton
					transitionActive={transitionActive}
					onClick={() => setTransitionActive(!transitionActive)}
				>
					{transitionActive ? (
						<p>Back to Article</p>
					) : (
						<p>See How this Works</p>
					)}
				</MoreInfoButton>
				<ToolTipPortal
					backgroundColor={COLORS.purple.rollover}
					className="d-none d-md-block"
					fadeOut={false}
					textColor={COLORS.StoneLightWhiteGrey}
					orientation="right"
					transitionActive={transitionActive}
					style={springRight}
				>
					{!transitionActive ? (
						<p>
							Embed our Portal
							<br />
							to Share Research.
						</p>
					) : (
						<p>
							iframe Portal
							<br />
							Links to Full Research.
						</p>
					)}
				</ToolTipPortal>

				<ToolTipPortal
					backgroundColor={COLORS.mellowYellow}
					className="d-none d-md-block"
					fadeOut={false}
					textColor={COLORS.StoneClassyDarkColor}
					orientation="right"
					transitionActive={transitionActive}
					style={springRightApp}
				>
					<p>
						Stone Windows App
						<br />
						Records Research.
					</p>

					<a href="https://application-downloads.azurewebsites.net/WriteInStoneReleaseInstaller.appinstaller">
						Download
					</a>
				</ToolTipPortal>

				<ToolTipPortal
					backgroundColor={COLORS.purple.rollover}
					style={springLeft}
					className="d-none d-md-block"
					fadeOut={false}
					textColor={COLORS.StoneLightWhiteGrey}
					orientation="left"
					transitionActive={transitionActive}
				>
					{!transitionActive ? (
						<p>
							Your Article
							<br />
							supported by Stone.
						</p>
					) : (
						<p>
							Research Optimized
							<br />
							Web Video Player.
						</p>
					)}
				</ToolTipPortal>

				<ArticleHolderDiv
					transitionActive={transitionActive}
					className="
          flex-column 
          justify-content-md-center
          justify-content-center
          align-items-center
          holdingArticleDiv
          position-relative"
					style={articleSpinSpring}
				>
					<span className="text-left">
						<h3 className="headline">
							Forensic Fact-Check: Israeli Foreign Minister Yair Lapid
						</h3>
						<p>
							<span
								style={{
									marginRight: "0.6em",
									borderRight: "solid 1px grey",
								}}
							>
								<BsFillPersonFill style={{ margin: "0 0.5em" }} />
							</span>
							Scott Stedman,
							<span
								style={{
									marginLeft: "0.6em",
									borderLeft: "solid 1px grey",
								}}
							>
								<BsFillClockFill style={{ margin: "0.5em" }} />
							</span>
							{new Date("2021-11-08T15:00:18").toLocaleDateString(undefined, {
								day: "numeric",
								month: "short",
								year: "numeric",
							})}
						</p>
					</span>

					<ArticleIframeDiv>
						<div
							style={{
								position: "relative",
								paddingBottom: "56.25%",
								width: "100%",
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<iframe
								style={{
									top: 0,
									width: "100%",
									height: "100%",
									position: "absolute",
								}}
								src="https://www.writeinstone.com/widget/published-fdecefaa-7ad9-4414-804b-b97a923ee3c0?lightmode=false?primary=000000?secondary=5a4e70"
								frameBorder="0"
								scrolling="no"
								sandbox="allow-same-origin allow-popups allow-top-navigation allow-scripts allow-autoplay"
								allowFullScreen
							></iframe>
						</div>
					</ArticleIframeDiv>

					<ArticleSpan className="articlespan">
						<p>
							{" "}
							Israel&#8217;s Foreign Minister Yair Lapid recently answered a
							question about NSO Group, an Israeli cyber surveillance firm that
							sells hacking tools and was recently blacklisted by the U.S.
							government. The statement: NSO is a private company, it is not a
							governmental project and therefore even if it is designated, it
						</p>
					</ArticleSpan>
					<ContinueReadingButtonHolder>
						<ContinueReadingButton
							variant="outlined"
							color="primary"
							style={{ margin: "20px auto 0 auto" }}
							// TODO: Make env variable for best disinfectant
							href="https://www.forensicnews.co/largest-u-s-cannabis-company-owes-russian-oligarch-roman-abramovich-millions/"
							endIcon={<CgDisplayFullwidth />}
						>
							See More...
						</ContinueReadingButton>
					</ContinueReadingButtonHolder>
				</ArticleHolderDiv>
			</ExampleHolderDiv>
		);
	};

	return <div style={{ marginTop: `calc(100vh - ${DIMENSIONS.heights.navbar.standard * 2}px)`, paddingTop: "32px" }}>
		<Row>
			<Col>
				<StoneTitleJumbotronFancy>
					<div className="container-within">
						<h1 className="display-4">
							{transitionActive ? "Our Product:" : "Example Story:"}
						</h1>

					</div>	<div className="pyramid-thing" />
				</StoneTitleJumbotronFancy>
				{ArticlePreview()}
			</Col>
		</Row>
		<Row>				<StoneTitleJumbotronFancy>
			<div className="container-within">
				<h1 className="display-4">
					About Us:
				</h1>

			</div>	<div className="pyramid-thing" style={{ left: "-100vw", transform: "rotateZ(66deg) scaleY(2.5)" }} />
		</StoneTitleJumbotronFancy></Row>
		<GalleryRow>
			<InitialSlide style={{ marginBottom: "2em" }}>
				<AboutUsP>
					Stone is a transparency tool for journalists and other
					researchers, which provides a streamlined end-to-end solution for
					capturing, logging, editing, annotating, and sharing research as
					video.
				</AboutUsP>
				<AboutUsP>
					We believe the biggest problems facing journalism and the
					information ecosystem more generally - distrust and disinformation
					- cannot be addressed through control and appeals to institutional
					legacy. The church and state tried that half a millenia ago with
					the printing press and it was a disaster.
				</AboutUsP>
				<AboutUsP>
					Now as then, the solution is not an institution or an individual.
					It’s a process, one that’s open to everyone.
				</AboutUsP>
				<AboutUsP>
					We wanted to build a tool that enables users to turn valuable,
					original research into something they could share. Something that
					would help elevate and sustain quality journalism. Something that
					would earn trust and a bigger audience by telling the story behind
					the story.
				</AboutUsP>

				<StoneTitleJumbotron>
					<h1 className="display-4">The Team:</h1>
				</StoneTitleJumbotron>

				<AboutUsP>
					Our founding team originally met in Cairo in 2011. Austin, Aliya
					and Daniel witnessed a revolution facilitated by the democratising
					power of new information technology. However, they also saw the
					effects of disinformation and deteriorating trust first-hand.
				</AboutUsP>
				<AboutUsP>
					Joined by co-founders John and Sebastian, they initially tried to
					start a publication in order to practice “transparent journalism”,
					but realised that the tool they (and the rest of the industry)
					needed to streamline the process, didn’t exist. So they decided to
					build it.
				</AboutUsP>
				<AboutUsP>
					Fast forward a few years, a few early iterations and a whole lot
					of conversation with journalists, media professionals and
					academics across the world, they connected with Duncan, who has
					helped build the Stone platform, as it exists today.
				</AboutUsP>
			</InitialSlide>
		</GalleryRow>
		<GalleryRow>
			<Col
				md={4}
				className="d-flex flex-column justify-content-md-center justify-content-center align-items-center"
			>
				<UserCard
					userName="Aliya"
					role="Managing Director"
					description=" Egyptian journalist, producer and media entrepreneur."
					linkedIn={null}
				/>
			</Col>

			<Col
				md={4}
				className="d-flex flex-column justify-content-md-center justify-content-center align-items-center"
			>
				<UserCard
					linkedIn="https://www.linkedin.com/in/austingm/"
					userName="Austin"
					role="CEO"
					description="Australian journalist, digital epistemologist and basic income activist."
				/>
			</Col>

			<Col
				md={4}
				className="d-flex flex-column justify-content-md-center justify-content-center align-items-center"
			>
				<UserCard
					linkedIn="https://www.linkedin.com/in/daniel-mackisack-6b318423/"
					userName="Daniel"
					role="CBDO / Product Lead"
					description="New Zealand sociologist, diplomat and celestial commons advocate."
				/>
			</Col>
		</GalleryRow>
		<GalleryRow className="text-center" style={{ marginBottom: "13vh" }}>
			{/* <Col
				md={4}
				className="d-flex flex-column justify-content-md-center justify-content-center align-items-center"
			>
				<UserCard
					userName="John"
					role="COO"
					description="American editor, researcher and aspiring polyglot."
					linkedIn={null}
				/>
			</Col> */}

			<Col
				md={4}
				className="d-flex flex-column justify-content-md-center justify-content-center align-items-center"
			>
				<UserCard
					userName="Duncan"
					role="Lead Engineer"
					description="New Zealand developer, system architect and (video) game theorist."
					linkedIn={null}
				/>
			</Col>

			<Col
				md={4}
				className="d-flex flex-column justify-content-md-center justify-content-center align-items-center"
			>
				<UserCard
					userName="Sebastian"
					role="Lead Designer"
					linkedIn={null}
					description="Australian UI developer, artist and wild technomage"
				/>
			</Col>
		</GalleryRow>
		<Row className="FooterRow">
			<FooterStone mobileVersion={false}></FooterStone>
		</Row>
	</div>;
}
