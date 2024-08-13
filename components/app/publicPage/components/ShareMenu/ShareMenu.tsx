import {
	ClipboardIcon,
	ContentAreaCol,
	ContentAreaRow,
	CopiedTextAlert,
	DocDlIcon,
	EmbedIcon,
	EmbedWidgetDiv,
	GlobeIcon,
	ModalBG,
	QRcodeWrapper,
	SettingsFloatMenu,
	ShareMenuButton,
} from "./ShareMenuStyles";
import React, { useState } from "react";
import {
	isLightMode,
	setIsFloatMenuVisible,
	setIsLightMode,
} from "../../../../state/settingsState";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";

import {COLORS} from "../../../../styles/colors";
import { CgClose } from "react-icons/cg";
import CopyToClipboard from "react-copy-to-clipboard";
import { LightModeSwitch } from "../../styles/PublicPageStyles";
import { NavLogo } from "../../../../global/styles/NavStyles";
import QRCode from "react-qr-code";
import SocialLinks from "./SocialLinks/SocialLinks";
import { projectInfo } from "../../../../../APITypes/ProjectInfo.cs";

export default function ShareMenu(props: {
	pid: string;
	html: string;
	meta: projectInfo;
}) {
	// Redux
	const dispatch = useAppDispatch();
	const lightMode = useAppSelector(isLightMode);
	// State //////////////////////////////
	const [copied, showCopied] = useState(false);
	const [overFloatMenu, setOverFloatMenu] = useState(false);

	const downloadQR = () => {
		const canvas: HTMLCanvasElement = document.getElementById(
			"WriteInStoneResearch"
		) as HTMLCanvasElement;
		console.log(canvas);
		const pngUrl = canvas
			?.toDataURL("image/png")
			?.replace("image/png", "image/octet-stream");
		const downloadLink = document.createElement("a");
		downloadLink.href = pngUrl;
		downloadLink.download = "WriteInStoneResearch.png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const handleFocus = (event: { target: { select: () => void } }) =>
		event.target.select();

	return (
		<ModalBG
			onClick={() => {
				if (!overFloatMenu) {
					dispatch(setIsFloatMenuVisible(false));
				}
			}}
		>
			<SettingsFloatMenu
				onMouseEnter={() => setOverFloatMenu(true)}
				onMouseLeave={() => setOverFloatMenu(false)}
			>
				<ContentAreaRow>
					<div className="header">
						<h1>Share Options</h1>
						<NavLogo className="StoneLogoAI" />
						<button>
							<CgClose
								size="40"
								color={COLORS.StoneLightWhiteGrey}
								onClick={() => dispatch(setIsFloatMenuVisible(false))}
							/>
						</button>
					</div>
				</ContentAreaRow>

				<ContentAreaRow>
					<ContentAreaCol className="leftTitle" md={6}>
						<div className="sectionHeadingDivwithIcon">
							<EmbedIcon title="Copy To Clipboard and Share" />
							<h5>Portal Widget</h5>
						</div>
					</ContentAreaCol>

					<ContentAreaCol className="rightTitle d-none d-md-block" md={6}>
						<div className="sectionHeadingDivwithIcon">
							<GlobeIcon title="Copy To Clipboard and Share" />
							<h5>Public Page</h5>
						</div>
					</ContentAreaCol>
				</ContentAreaRow>

				<ContentAreaRow>
					<ContentAreaCol className="leftCol" md={6}>
						<EmbedWidgetDiv>
							<p onFocus={() => handleFocus}>{props.html}</p>
							{/* Copied Alert */}
							<CopiedTextAlert copied={copied}>
								<h3>Copied!</h3>
							</CopiedTextAlert>
						</EmbedWidgetDiv>
						<ContentAreaCol className="leftButtonMobile d-flex d-md-none">
							<ShareMenuButton>
								<CopyToClipboard
									text={props.html}
									onCopy={() => {
										console.log("copied link");
										showCopied(true);
										setTimeout(() => {
											showCopied(false);
											// Then Hide Menu
											setTimeout(() => {
												setIsFloatMenuVisible(false);
											}, 200);
										}, 3010);
									}}
								>
									<button>
										<ClipboardIcon title="Copy To Clipboard and Share" />{" "}
										<h3>Copy &gt; Embed</h3>
									</button>
								</CopyToClipboard>
							</ShareMenuButton>
						</ContentAreaCol>
					</ContentAreaCol>

					<ContentAreaCol className="rightCol" md={6}>
						<div
							className="sectionHeadingDivwithIcon MobileViewTitle d-flex d-md-none hideforXSMobile"
							style={{ marginBottom: "1rem" }}
						>
							<GlobeIcon title="Copy To Clipboard and Share" />
							<h5>Public Page</h5>
						</div>
						<div>
							<QRcodeWrapper>
								<QRCode
									size={300}
									id="WriteInStoneResearch"
									level={"H"}
									style={{
										display: "inline-block",
										position: "relative",
										margin: "0 auto",
									}}
									fgColor="#050505"
									bgColor="#efe3cd"
									value={`${process.env.NEXT_PUBLIC_BASE_URL}/public/research/${props.pid}`}
								/>
							</QRcodeWrapper>
							<ContentAreaCol className="RightButtonMobile d-flex d-md-none">
								<ShareMenuButton className="hiddenOnXXS">
									<button onClick={downloadQR} title="Download QR Code">
										<DocDlIcon />
										<h3>Save QR code</h3>
									</button>
								</ShareMenuButton>
							</ContentAreaCol>
						</div>
					</ContentAreaCol>
				</ContentAreaRow>

				<ContentAreaRow className="d-none d-md-flex">
					<ContentAreaCol className="leftButton" md={6}>
						<ShareMenuButton>
							<CopyToClipboard
								text={props.html}
								onCopy={() => {
									console.log("copied link");
									showCopied(true);
									setTimeout(() => {
										showCopied(false);
										// Then Hide Menu
										setTimeout(() => {
											setIsFloatMenuVisible(false);
										}, 200);
									}, 3010);
								}}
							>
								<button>
									<ClipboardIcon title="Copy To Clipboard and Share" />{" "}
									<h3>Copy &gt; Embed</h3>
								</button>
							</CopyToClipboard>
						</ShareMenuButton>
					</ContentAreaCol>
					<ContentAreaCol className="RightButton" md={6}>
						<ShareMenuButton>
							<button onClick={downloadQR} title="Download QR Code">
								<DocDlIcon />
								<h3>Save QR code</h3>
							</button>
						</ShareMenuButton>
					</ContentAreaCol>
				</ContentAreaRow>

				<ContentAreaRow className="contentAreaRow settingsRow">
					{/* <ContentAreaCol className="settingsCol" md={6}>
						<h5>Dark Mode:{lightMode ? "Off" : "On"} </h5>
					</ContentAreaCol>
					<ContentAreaCol className="settingsCol" md={6}>
						<LightModeSwitch
							lightmode={lightMode}
							onClick={() => {
								dispatch(setIsLightMode(!lightMode));
							}}
						>
							<div className="circle" />
						</LightModeSwitch>
					</ContentAreaCol> */}
					<SocialLinks meta={props.meta} />
				</ContentAreaRow>
			</SettingsFloatMenu>
		</ModalBG>
	);
}
