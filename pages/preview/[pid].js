/* eslint-disable no-undef */

import { Col, Container, Row } from "react-bootstrap";
import { ImEnlarge2, ImShrink2 } from "react-icons/im";
import React, { useEffect, useState } from "react";

import { BiReset } from "react-icons/bi";
import { COLORS } from "../../components/styles/colors";
import DIMENSIONS from "../../components/styles/GlobalDimensions";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import NavbarStone from "../../components/global/layout/Navbar";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { useRouter } from "next/router";

const HolderforSlider = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  left: 0;
  right: 0;
  padding: 0 8em;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: ${COLORS.StoneLightWhiteGrey};
`;
const useStyles = makeStyles({
	root: {
		width: "100%",
	},
});

const Preview = (props) => {
	const router = useRouter();
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	const [publicURL, setURL] = useState("");
	const [standardEmbedURL, setStandardEmbed] = useState({
		showWidget: false,
		url: "",
		previewUrl: "",
	});

	// Button Logic that Sets playlist Number - ACTUAL
	const [project_ID, setProject_ID] = useState(props.pid);

	// Project Title
	const [project_Title, setProject_Title] = useState(props?.info?.title);

	// URL Public (QR Code and Direct Link)
	const [publicUrl, setPublicURL] = useState("http://www.writeinstone.com");
	// Compact Mode
	const [compact, setCompact] = useState(false);
	// Set String
	const [compactParam, setCompactParam] = useState("false");
	// Light Mode
	const [lightmode, setLightMode] = useState(false);
	// Set String
	const [lightModeParam, setLightModeParam] = useState("false");
	// copied text
	const [copied, showCopied] = useState(false);
	// Width Slider

	const widthMultiplier = 800;
	const [value, setValue] = useState(1);
	const [sliderValue, setSliderValue] = useState(value);
	const [widgetWidth, setWidgetWidth] = useState(widthMultiplier);

	// URL Widget
	const [previewUrl, setPreviewURL] = useState(
		`${baseUrl}/widget/${encodeURIComponent(
			project_ID
		)}?playlist=${encodeURIComponent(
			project_ID
		)}&video=1&compact=${compact}&lightmode=${lightmode}`
	);

	useEffect(() => {
		console.log(props.source + "source");
		if (typeof window !== "undefined") {
			if (localStorage.getItem("widgetWidth") == null) {
				localStorage.setItem("widgetWidth", widgetWidth);
			}
			else {
				const widgetWidthLocal = localStorage.getItem("widgetWidth");
				setWidgetWidth(widgetWidthLocal);
				setSliderValue(widgetWidthLocal / widthMultiplier);
				setValue(widgetWidthLocal / widthMultiplier);
			}
		}
	}, []);

	const handleReset = () => {
		setWidgetWidth(widthMultiplier);
		setSliderValue(1);
		setValue(1);
		localStorage.setItem("widgetWidth", widthMultiplier);
	};

	const handleChange = (event, newValue) => {
		if (newValue !== null) {
			setSliderValue(newValue);
			setWidgetWidth(newValue * widthMultiplier);
		}
	};

	const handleChangeCommitted = (event, newValue) => {
		if (newValue !== null) {
			localStorage.setItem("widgetWidth", widgetWidth);
		}
	};

	useEffect(() => {
		if (value !== null) {
			setValue(sliderValue);
		}
	}, [sliderValue]);

	// Params from Form Set on Change [array shows state changing]

	useEffect(() => {
		if (compact === true) {
			setCompactParam("true");
		}
		else {
			setCompactParam("false");
		}
	}, [compact]);

	const ContinuousSlider = () => {
		const classes = useStyles();
		if (value !== null) {
			return (
				<HolderforSlider className={classes.root}>
					<Typography id="continuous-slider" gutterBottom>
						<strong style={{ whiteSpace: "nowrap", paddingRight: "2em" }}>
							Width of Widget:
						</strong>
					</Typography>
					<Grid container spacing={2}>
						<Grid item>
							<ImShrink2 size={32} />
						</Grid>
						<Grid item xs>
							<Slider
								value={sliderValue}
								min={0.4}
								max={1.9}
								step={0.01}
								onChange={handleChange}
								onChangeCommitted={handleChangeCommitted}
								aria-labelledby="continuous-slider"
							/>
						</Grid>
						<Grid item>
							<ImEnlarge2 size={32} />
							<BiReset
								size={42}
								onClick={() => handleReset()}
								style={{ margin: "0 2rem", cursor: "pointer" }}
							/>
						</Grid>
					</Grid>
				</HolderforSlider>
			);
		}
		else {
			return null;
		}
	};

	// Just Editing to Match intended format with replace
	let html2 = props.html
		? props.html.replace(
			"https://chalk.writeinstone.com",
			process.env.NEXT_PUBLIC_BASE_URL
		)
		: null;

	html2 = html2.replace(
		"https://www.writeinstone.com",
		process.env.NEXT_PUBLIC_BASE_URL
	);

	html2 = html2.replace(
		"picture-in-picture'",
		"picture-in-picture\" allowtransparency='true' "
	);

	return (
		<>
			<Head>
				<title>Write In Stone - Widget Embed</title>
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
					content="width=device-width, initial-scale=1.0"
				></meta>
			</Head>
			<NavbarStone showCart={false}
				lightmode={lightmode}
				showSettings
				meta={props.info}
				landingPageElement={false}
				ProjectTitle={`${project_Title} - Portal Test`}
				checkout={false}
			></NavbarStone>
			{/* <NavBarExamples selected={2} /> */}
			<Container
				style={{
					background: COLORS.StoneClassyDarkColorBG,
					color: COLORS.purple.rollover,
					height: `calc(100vh - ${DIMENSIONS.heights.navbar.standard}px)`,
				}}
				fluid
			>
				{ContinuousSlider()}
				<Row
					noGutters
					style={{
						height: `calc(100vh - ${DIMENSIONS.heights.navbar.standard}px - 100px)`,
					}}
				>
					<Col
						xs={12}
						className="d-flex align-items-center justify-content-center flex-column"
					>
						<div style={{ paddingBottom: "60px", display: "flex" }}>
							<div
								style={{
									flex: 1,
									width: `calc(${widgetWidth / 2}px - 50px)`,
									borderTop: `solid 1px ${COLORS.StoneLightWhiteGrey}`,
									borderLeft: `solid 1px ${COLORS.StoneLightWhiteGrey}`,
									display: "block",
									height: "21px",
									borderRadius: "2px",
									justifyContent: "center"
								}}
							/>
							<p
								style={{
									width: "100px",
									fontSize: "18px",
									margin: 0,
									position: "relative",
									top: "-15px",
									padding: 0,
									textAlign: "center",
									color: COLORS.StoneLightWhiteGrey,
								}}
							>
								{Math.floor(widgetWidth)}px
							</p>
							<div
								style={{
									flex: 1,
									width: `calc(${widgetWidth / 2}px - 50px)`,
									borderTop: `solid 1px ${COLORS.StoneLightWhiteGrey}`,
									borderRight: `solid 1px ${COLORS.StoneLightWhiteGrey}`,
									display: "block",
									height: "21px",
									borderRadius: "2px"
								}}
							/>
						</div>

						{html2 !== null ? (
							<div
								style={{
									marginTop: "-50px",
									width: `${widgetWidth}px`,
								}}
								className="holdingDiv"
								dangerouslySetInnerHTML={{ __html: html2 }}
							/>
						) : (
							<div>Loading</div>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Preview;

export const getServerSideProps = async (context) => {
	const mediaApiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL;
	const pid = context.params.pid;
	const result = await fetch(`${mediaApiUrl}/stream/info/${pid}`).catch(
		(error) => {
			console.log(error);
		}
	);
	const info = await result?.json().catch((err) => {
		console.error(err);
		return null;
	});

	const result2 = await fetch(
		`${process.env.NEXT_PUBLIC_MEDIA_API_URL}/stream/${pid}/html`
	);
	const html = await result2?.json().catch((err) => {
		console.error(err);
		return null;
	});
	return {
		props: {
			info: info,
			pid: pid,
			html: html.html,
		},
	};
};
