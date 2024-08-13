import {
	FaLinkedinStyled,
	FaTelegramStyled,
	FaTwitterStyled,
	HomeMenu,
	MerchLogoHolder,
	NavBarToggle,
	NavButton,
	NavLink,
	NavLogo,
	NavLogoText,
	NavLogoWrapper,
	NavWrapper,
	ProjectTitle,
	RightNav,
	SettingDialIcon,
	ShoppingCartNavWrapper,
	ShoppingCartNumber,
	SocialLinksInNav,
	StoreLinkIcon,
	StoreLinkInNav
} from "../styles/NavStyles";
import { FaLock, FaShoppingCart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
	isLightMode,
	setIsFloatMenuVisible
} from "../../state/settingsState";
import {
	productCount,
	setShoppingCartOpen,
	shoppingCartOpen
} from "../../state/cartState";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

import { COLORS } from "../../styles/colors";
import DIMENSIONS from "../../styles/GlobalDimensions";
import Link from "next/link";
import MerchLogo from "../../../public/images/SVG/merch.svg";
import { Navbar } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { isBusinessCardSelected } from "../../state/playlistState";
import { projectInfo } from "../../../APITypes/ProjectInfo.cs";
import { useMeasure } from "react-use";
import { useSpring } from "react-spring";
import useWindowDimensions from "../../../helpers/GetWindowDimensions";

interface NavProps {
	landingPage?: boolean;
	showCart?: boolean;
	ProjectTitle?: string;
	showSettings?: boolean;
	checkout?: boolean;
	storeTitle?: string;
	meta?: projectInfo;
}

const NavbarStone: React.FC<NavProps> = ({
	landingPage,
	showCart,
	ProjectTitle: ProjectTitleProp,
	showSettings,
	checkout,
	storeTitle,
	meta
}) => {
	// REDUX //////////////////////////////////////////////////////////////////////////
	const dispatch = useAppDispatch();
	const isPlayerBusinessCardSelected = useAppSelector(isBusinessCardSelected);
	//const floatMenuIsVisible = useAppSelector(isFloatMenuVisible);
	const lightMode: boolean = useAppSelector(isLightMode);
	// MerchStore REDUX //////////////////////////////////
	const currentTotalProducts = useAppSelector(productCount);
	//const currentCartValue = useAppSelector(getTotalValue);
	const shoppingCartNowOpen = useAppSelector(shoppingCartOpen);
	const [rightNav, { width }] = useMeasure<HTMLDivElement>();

	const { height: windowHeight, width: windowWidth } = useWindowDimensions();
	const [rightNavWidth, setRightNavWidth] = useState(0);

	useEffect(() => {
		setRightNavWidth(width);
		console.log("rightNavWidth" + rightNavWidth);
	}, [width]);

	useEffect(() => {
		// console.log(JSON.stringify(meta));
	});

	const openNotificationAnimation = useSpring({
		config: { tension: 82, friction: 10, velocity: 0 },
		from: { transform: "scale(0)" },
		to: {
			transform: currentTotalProducts === 0 ? "scale(0)" : "scale(1)",
		},
	});

	return (
		<NavWrapper
			expand="lg"
			lightmode={lightMode}
			landingPageElement={landingPage ?? false}
			checkout={checkout}
		>
			<NavLink href="/">
				<NavLogoWrapper>
					{/* <LogoSwap/> */}
					<NavLogo className="StoneLogoAI" />
					<NavLogoText
						checkout={checkout}
						storeTitle={storeTitle}
						lightmode={lightMode}
						landingPageElement={landingPage}
					/>
					{showCart && 	
					<MerchLogoHolder>
						<MerchLogo width={60} />
					</MerchLogoHolder>
					}
					{checkout &&
						<MerchLogoHolder>
							<MerchLogo width={60} />
						</MerchLogoHolder>
					}
				</NavLogoWrapper>
			</NavLink>
			<noscript>
				<span style={{ fontSize: "14px", fontFamily: "sans-serif", padding: "4px", borderRadius: "5px", background: "pink", color: "red", display: "block", position: "relative", left: "180px" }}>
					To use the full functionality of this page, you need to enable javascript
				</span>
			</noscript>
			{
				showCart && (
					<ShoppingCartNavWrapper
						className="d-block d-md-none"
						disabled={currentTotalProducts < 1}
						onClick={() =>
							currentTotalProducts >= 1 &&
							dispatch(setShoppingCartOpen(!shoppingCartNowOpen))
						}
					>
						<FaShoppingCart size={24} />

						<ShoppingCartNumber
							style={openNotificationAnimation}
							checkout={checkout ?? false}
						>
							<div className="number">
								{!checkout ? (
									<span>{currentTotalProducts}</span>
								) : (
									<FaLock
										size={7}
										style={{ position: "relative", top: "-1px" }}
									/>
								)}
							</div>
						</ShoppingCartNumber>
					</ShoppingCartNavWrapper>
				)
			}
			<NavBarToggle
				className="toggle"
				aria-controls="stone-rightNavbar-nav"
				style={{ display: !landingPage ? "none" : "" }}
			/>
			{
				!landingPage ? (
					<ProjectTitle landingPageElement={landingPage ?? false} lightmode={lightMode} rightNavWidth={rightNavWidth}>
						<input
							readOnly={true}
							type="text"
							onClick={(e) => {
								const element = e.currentTarget as HTMLInputElement;
								element.select();
								// console.log("Project Title Selected");
							}}
							value={ProjectTitleProp}
						/>
					</ProjectTitle>
				) :
					<ProjectTitle style={{ marginLeft: (storeTitle ? "150px !important" : "") }} landingPageElement={landingPage ?? false} lightmode={lightMode} rightNavWidth={rightNavWidth} >
						<h3 className="d-none d-md-block" style={{ margin: "0px", padding: "0px" }}>{storeTitle}</h3>
					</ProjectTitle>

			}
			<Navbar.Collapse id="stone-rightNavbar-nav" style={{ flexGrow: 0, border: 0 }}>
				{showSettings && (<RightNav ref={rightNav}>

					{!isPlayerBusinessCardSelected && <StoreLinkInNav href={`/store/${meta?.authorId}`}>
						{/* <img src={props?.meta?.logoUrl} height={30} /> */}
						<p>{meta?.authorName} - Store</p>
						<StoreLinkIcon
							data-tip="Share Project"
							lightmode={lightMode}
							className="SettingDialIcon"
							onClick={() => dispatch(setIsFloatMenuVisible(true))}
						/>
					</StoreLinkInNav>}

					<div data-tip="Share Now" data-for="tool2">
						<SettingDialIcon
							data-tip="Share Project"
							lightmode={lightMode}
							className="SettingDialIcon"
							onClick={() => dispatch(setIsFloatMenuVisible(true))}
						/>

						<ReactTooltip
							className="reactTooltipStyle"
							id="tool2"
							backgroundColor={COLORS.StoneClassyDarkColor}
							place="left"
							effect="solid"
							textColor="#ffffff"
						/>
					</div>
				</RightNav>)}

				{landingPage && (
					<HomeMenu>
						{landingPage && (
							<SocialLinksInNav>
								<ul>
									<li>
										<a
											href="https://twitter.com/writeinstone"
											target="_blank"
											rel="noreferrer"
										>
											<FaTwitterStyled invertColors={null} />
										</a>
									</li>
									<li>
										<a
											href="https://t.me/WriteInStonePublic"
											target="_blank"
											rel="noreferrer"
										>
											<FaTelegramStyled invertColors={null} />
										</a>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/company/writeinstone/"
											target="_blank"
											rel="noreferrer"
										>
											<FaLinkedinStyled invertColors={null} />
										</a>
									</li>
								</ul>
							</SocialLinksInNav>
						)}

						<Link href="/aboutUs">
							<NavButton>About Us</NavButton>
						</Link>
						<Link href="/blog">
							<NavButton>Blog</NavButton>
						</Link>
						<Link href="/faqs">
							<NavButton>Help / FAQ</NavButton>
						</Link>
						<Link href="/learnMore">
							<NavButton>Learn More</NavButton>
						</Link>
						{showCart && (
							<ShoppingCartNavWrapper
								className="d-none d-md-block"
								disabled={currentTotalProducts < 1}
								onClick={() =>
									currentTotalProducts >= 1 &&
									dispatch(setShoppingCartOpen(!shoppingCartNowOpen))
								}
							>
								<FaShoppingCart size={24} />

								<ShoppingCartNumber
									style={openNotificationAnimation}
									checkout={checkout ?? false}
								>
									<div className="number">
										{!checkout ? (
											<span>{currentTotalProducts}</span>
										) : (
											<FaLock
												size={7}
												style={{ position: "relative", top: "-1px" }}
											/>
										)}
									</div>
								</ShoppingCartNumber>
							</ShoppingCartNavWrapper>
						)}
						{(windowWidth ?? 0) < DIMENSIONS.breakPoints.mobile && (
							<Link href="mailto:info@writeinstone.com">
								<NavButton>Contact Us</NavButton>
							</Link>
						)}
					</HomeMenu>
				)}
			</Navbar.Collapse>
		</NavWrapper >
	);
};

export default NavbarStone;
