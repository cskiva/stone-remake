import {
	Bumper,
	BusinessCardButton,
	BusinessCardIcon,
	MobileBg,
	OverlayDiv,
	OverlayDivWrapper,
	UserLogoDiv,
} from "./styles/BusinessCardStyles";
import React, { useEffect, useState } from "react";
import { isBusinessCardSelected, showBusinessCard } from "../../state/playlistState";
import {
	isPaused,
	playerInstance,
} from "../../state/videoPlayerState";

import { COLORS } from "../../styles/colors";
import { getIcon } from "../../../helpers/helpers";
import { useAppSelector } from "../../state/hooks";

export default function BusinessCard(props: {
	bookLink: string;
	logoUrl: string;
	patreonLink: string;
	twitterLink: string;
	userId: string;
	widgetMode?: boolean;
	show?: boolean;
}) {
	// REDUX //////////////////////////////////////////////////////////////////////////
	const show = useAppSelector(showBusinessCard);
	const player = useAppSelector(playerInstance);
	const isPlayerPaused = useAppSelector(isPaused);
	const isPlayerBusinessCardSelected = useAppSelector(isBusinessCardSelected);
	//
	// const [videoWidth, setVideoWidth] = useState(1100);
	const [rollover, setRollover] = useState(false);
	// STATE //////////////////////////////

	const userLogoUrl = props.logoUrl;
	const [iconUrl1, setIconUrl1] = useState("");
	const [iconUrl2, setIconUrl2] = useState("");
	const [iconUrl3, setIconUrl3] = useState("");

	const playPauseFunction = () => {
		console.log("click");
		if (isPlayerPaused) {
			player?.play();
		}
		else {
			player?.pause();
		}
	};

	useEffect(() => {
		console.log("Setting icons");
		const getIconAsync = async () => {
			// get the data from the api
			setIconUrl1(await getIcon(props.twitterLink));
			setIconUrl2(await getIcon(props.patreonLink));
			setIconUrl3(await getIcon(props.bookLink));
		};

		getIconAsync();
	}, []);

	const BusinessCardTile = (href: string, imageURL: string) => {
		return (
			<BusinessCardButton
				background={`linear-gradient(315deg,${COLORS.heroGradient})`}
				href={href}
				target="_blank"
			>
				<div className="canvas">
					<BusinessCardIcon background={imageURL ? imageURL : "/images/SVG/book.svg"}>
						<div className="holder">
							<div className="logoItself" /></div>
					</BusinessCardIcon>
				</div>
			</BusinessCardButton>);
	};

	return (
		<OverlayDivWrapper className="BusinessCard" widgetMode={props.widgetMode ?? false} show={props.show ? props.show : !props.widgetMode ? isPlayerBusinessCardSelected : show}>
			<OverlayDiv isPlayerPaused={isPlayerPaused} noLeftLinks={iconUrl1 == "" && iconUrl2 == ""}>
				<div
					className="videoGap"
					onMouseEnter={() => setRollover(true)}
					onMouseLeave={() => setRollover(false)}
					onClick={() => playPauseFunction()}
				></div>
				<div className="leftColumn">
					<div className="gutters">
						{props.twitterLink && (
							BusinessCardTile(props.twitterLink, iconUrl1)
						)}
						{props.patreonLink && (
							BusinessCardTile(props.patreonLink, iconUrl2)
						)}
					</div>
				</div>
				<div className="rightColumn" style={{ width: "100%" }}>
					<div className="gutters">
						<BusinessCardButton
							background={`linear-gradient(45deg,${COLORS.heroGradient})`}
							href={`../store/${props.userId}`}
							target="_blank"
							className="shirts"
						>
							{/* <h5>Merch</h5> */}
							<div className="canvas">
								{userLogoUrl && (
									<UserLogoDiv background={userLogoUrl}>
										<div className="holder">
											<div className="tShirtLogo" >
												<div className="backgroundRainbow">
													<div className="logoItself" />
												</div>
											</div>
										</div>
									</UserLogoDiv>
								)}
							</div>
						</BusinessCardButton>
						{props.bookLink && (
							BusinessCardTile(props.bookLink, iconUrl3)
						)}
					</div>
				</div>
				<MobileBg mobileBackground={userLogoUrl} />
			</OverlayDiv>
			<Bumper
				className="bumper"
				rollover={rollover}
				onMouseEnter={() => setRollover(true)}
			/>
		</OverlayDivWrapper >
	);
}
