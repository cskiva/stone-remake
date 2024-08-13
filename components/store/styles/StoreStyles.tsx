import { Card, Col, Container, Row } from "react-bootstrap";
import styled, { css, keyframes } from "styled-components";

import Box from "@mui/material/Box";
import { COLORS } from "../../styles/colors";
import DIMENSIONS from "../../styles/GlobalDimensions";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import { animated } from "react-spring";

const mobileBreakpoint = `${DIMENSIONS.breakPoints.mobile}px`;

export const StoreContainer = styled(Container) <{ productGroupList: boolean }>`
  height: calc(100vh - ${DIMENSIONS.heights.navbar.standard}px);
  padding: 0px 15px;
  display: ${(props) => (props.productGroupList ? "block" : "flex")};

  @media screen and (max-width: ${mobileBreakpoint}) {
    height: calc(100vh - ${DIMENSIONS.heights.navbar.mobile}px);
  }
`;

const blockerHeight = 12;

export const MobileViewItemSelect = styled.div<{ showing: boolean }>`
display: ${(props) => (props.showing ? "flex" : "none")};
height: calc(100% - ${DIMENSIONS.heights.navbar.mobile}px);
width: 100%;
background: white;
position: fixed;
top: ${DIMENSIONS.heights.navbar.mobile - 1}px;
z-index: 1;

.closeButtonWrapper{
	margin: 0 11px;		z-index: 2;
	.closeButton{
		position: absolute;
		right: 10px;
		color: black;
		background: none;border: none;padding: 6px;
		font-size: 39px;
	}
}
`;

export const ItemCol = styled(Col)`
position: relative;
min-width: 25%;
  .blocker{
	position: absolute;
	top: 0;
	left: 0;
	right: 40px;
	height: ${blockerHeight}px;
	background: white;
	z-index: 1;
	position: relative;

	&:after{
		content: "";
		position: absolute;
		bottom: -20px;
		width: 100%;
		height: 20px;
		background: linear-gradient(177.5deg, #00000051, #00000001 40%);
	}
  }

  .wrapper{
	  overflow-y: scroll;
  max-height: calc(100vh - ${DIMENSIONS.heights.navbar.standard}px - ${blockerHeight}px);
  overflow-x: hidden;
  position: relative;
  padding: 0 0 25px 2.5px; 

  @media screen and (max-width: ${mobileBreakpoint}) {
	  max-height: calc(100vh - ${DIMENSIONS.heights.navbar.mobile}px);
  }
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
  }

`;

export const SwatchCircleDiv = styled.div<{
	background: string;
	index: number;
	length: number;
}>`
  display: flex;
  position: relative;
  flex: 1;
  height: 20px;
  align-items: center;
  justify-content: center;
  .circleSwatch {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    position: absolute;
	overflow: hidden;
    box-shadow: 1px 2px 3px #00000050;
    /* left: ${(props) => props.index && `${props.index * 10 * -1}px`}; */
    background: ${(props) => props.background && props.background};
  }
`;

export const ItemTitle = styled.h1`
  font-family: -apple-system, "system-ui", "“Segoe UI”", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 45px;
  letter-spacing: -0.05em;
  font-weight: 700;
  margin: 30px 0;
  padding: 0;

  @media screen and (max-width: ${mobileBreakpoint}) {
	  font-size: 38px;
  letter-spacing: -0.055em;
  }
`;

export const ItemSubTitle = styled.h2`
  font-family: -apple-system, "system-ui", "“Segoe UI”", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 35px;
  letter-spacing: -0.05em;
  font-weight: 700;
  margin: 0;
  padding: 0;
    @media screen and (max-width: ${mobileBreakpoint}) {
  font-size: 28px;
  letter-spacing: -0.05em;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FormGroupCheckout = styled(animated.fieldset)`
  margin: 0;
  padding: 0;
@media screen and (max-width: ${mobileBreakpoint}) {  
h3{
	font-size: 18px;
	font-weight: bold;
  }
  }

`;

export const FooterFormWrapper = styled.div``;

export const CheckoutFormStyle = styled.form`
  margin: 0 auto;
  display: flex;
  flex: 1;
  max-width: 860px;
  align-items: stretch;
  justify-content: flex-start;
  background: transparent;
  flex-direction: column;
  width: 100%;
  @media screen and (max-width: ${mobileBreakpoint}) {
    padding: 0 1em;
  }
`;

export const ShoppingCartPreview = styled.div`
  border-radius: 8px;
  width: calc(100% - 2em);
  margin: 1em 0;
  padding: 0.8em;
  padding-top: 30px;
  border: solid 1px #DCDCDC;

  .shoppingCartPreviewFooter {
    display: flex;
    justify-content: flex-end;
  }
`;

export const ShippingFormControl = styled(FormControl) <{ onlyOne: boolean }>`
  div:first-child {
    border-radius: ${(props) => (props.onlyOne ? "10px" : "10px 10px 0 0")};
    border-bottom: ${(props) => !props.onlyOne && "none"};
  }

  div:last-child {
    border-radius: ${(props) => !props.onlyOne && "0 0 10px 10px"};
  }
`;

export const ShippingRadioButton = styled.div<{ selected: boolean }>`
  background: ${(props) =>
		props.selected ? `${COLORS.mellowYellow}` : "white"};
  color: ${(props) =>
		!props.selected ? "grey" : `${COLORS.StoneClassyDarkColor}`};
  border: ${(props) =>
		props.selected ? `solid 1px ${COLORS.purple.rollover}` : "solid 1px black"};
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  margin: 0 0.5rem 0 0;
  padding: 1rem 0 0.5rem 1rem;
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 1.4em;
    height: 1.4em;
    cursor: pointer;
    + .radio-label {
      &:before {
        content: "";
        background: white;
        border-radius: 100%;
        border: 1px solid #00000080;
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        position: relative;
        top: -0.2em;
        margin-right: 1em;
        vertical-align: top;
        pointer-events: none;

        text-align: center;
        transition: all 250ms ease;
        z-index: 1;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: ${COLORS.purple.rollover};
          box-shadow: inset 0 0 0 4px white;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: 1px solid #000000cd;
        }
      }
    }
    &:disabled {
      + .radio-label {
        &:before {
          box-shadow: inset 0 0 0 4px grey;
          background: grey;
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
`;

export const CheckoutSubTotal = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 490px;
  margin: 0 auto;
  font-family: "Cabin", sans-serif;

  .items {
    width: 100%;
    border-radius: 10px;
  }
`;

export const ButtonFooter = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  .footerInner {
    padding: 10px;
    margin-bottom: 50px;
    width: 100%;

    button:not(.backbButton) {
      float: right;
    }

    button.backButton {
      float: left;
    }
  }
`;

export const ReceiptPaper = styled(Paper)``;

export const YourDetails = styled.div`
  margin-bottom: 1em;
  p {
    font-family: "Cabin", sans-serif;
  }
  border: solid 1px ${COLORS.StoneLightWhiteGrey};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 0.5em;

  .section {
    padding: 0.5em 0;
    display: flex;
    flex-direction: row;
    width: 100%;

    &.top {
      border-bottom: solid 1px ${COLORS.StoneLightWhiteGrey};
    }
  }

  .subtitle {
    p {
      font-family: "Cabin", sans-serif;
      font-weight: bold;
    }
    flex: 0 1 6em;
    border-right: 1px soilid ${COLORS.StoneLightWhiteGrey};
    height: 100%;
  }

  .info {
    flex: 1;
    &.inline {
      p {
        display: inline-flex;
      }
    }
    p {
      margin: 0;
      padding: 0;
    }
  }

  .changeDiv {
    flex: 0 1 6em;
    padding-left: 0.5em;
    height: 100%;

    p {
      color: orange;
      cursor: pointer;
    }
  }
`;

export const ShippingOptionsDiv = styled.div`
  p {
    font-family: "Cabin", sans-serif;
  }
  border: solid 1px ${COLORS.StoneLightWhiteGrey};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 0.5em;

  .section {
    padding: 0.5em 0;
    display: flex;
    flex-direction: row;
    width: 100%;

    &.top {
      border-bottom: solid 1px ${COLORS.StoneLightWhiteGrey};
    }
  }

  .subtitle {
    p {
      font-family: "Cabin", sans-serif;
      font-weight: bold;
    }
    flex: 0 1 6em;
    border-right: 1px soilid ${COLORS.StoneLightWhiteGrey};
    height: 100%;
  }

  .info {
    flex: 1;
    &.inline {
      p {
        display: inline-flex;
      }
    }
    p {
      margin: 0;
      padding: 0;
    }
  }

  .changeDiv {
    flex: 0 1 6em;
    padding-left: 0.5em;
    height: 100%;

    p {
      color: orange;
      cursor: pointer;
    }
  }
`;

export const CheckoutPreview = styled.div<{ inCart: boolean }>`
  border-bottom: solid 1px ${COLORS.StoneLightWhiteGrey};
  padding-bottom: 1em;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: ${(props) => !props.inCart && "2em 0"};

  p.price {
    margin-left: 8px;
    font-weight: 600;
		  font-size: 0.95rem;
  }

  .productInCartInfo {
    flex: 1;

    p {
      font-family: "Cabin", sans-serif;
      text-align: left;
      padding-left: 1.5em;
	  font-size: 0.93rem;
    }
  }

  .productInCartImage {
    width: 60px;
    border: solid 1px ${COLORS.StoneLightWhiteGrey};
    border-radius: 8px;
  }

  .quantitybadge {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${COLORS.StoneClassyDarkColor};
    color: white;
    font-weight: bold;
    top: -10px;
    right: -10px;
    border-radius: 100%;
    z-index: 2;
    width: 21px;
    height: 21px;
    box-shadow: 0px 1px 2px 1px #00000050;
  }
`;

export const ShirtPageRow = styled(Row)`
	max-height: calc(100vh - ${DIMENSIONS.heights.navbar.standard}px);

	.wrapperShirtPageRow{
	@media screen and (max-width: ${mobileBreakpoint}) {
		width: 100%;
		padding-right: 20px;
	}
	}

	@media screen and (max-width: ${mobileBreakpoint}) {
		overflow-y: scroll;
	}
`;

export const CheckoutCol = styled(Col)`
  position: relative;
  padding-top: 30px;
  padding-right: 100px;
  &:before {
    content: "";
    height: calc(100vh - ${DIMENSIONS.heights.navbar.standard}px - 50px);
    position: absolute;
    background: ${COLORS.StoneLightWhiteGrey};
    width: 5px;
    left: -15px;
    top: 0;
    border-radius: 3px;
    display: block;
    @media screen and (max-width: ${mobileBreakpoint}) {
      display: none;
    }
  }
  @media screen and (max-width: ${mobileBreakpoint}) {
    padding-right: 15px;
	padding-top: 5px;
  }
`;

export const SubTotalAndShippingDisplay = styled.div`
  .totalRow {
    border-top: solid 1px ${COLORS.StoneLightWhiteGrey};
    padding-top: 1.3em;
    margin-top: 1.3em;
  }

  h2 {
    font-size: 25px;
    font-family: "Cabin", sans-serif;
    font-weight: bolder;
  }

  h5 {
    font-size: 16px;
    font-family: "Cabin", sans-serif;
  }

  p {
    font-size: 13px;
    position: relative;
    top: -15px;
    font-family: "Cabin", sans-serif;
  }
`;

export const FormRow = styled.div`
  display: flex;
  margin-bottom: 1em;
  gap: 14px;
`;

export const PaymentStatusDiv = styled.div<{ error: boolean }>`
  display: flex;

  justify-content: flex-end;
  .inner {
    border-radius: 5px;
    width: 100%;
    display: ${(props) => props.error && "none"};
    color: ${(props) => props.error && "white"};
    h2 {
      font-size: 18px;
      margin: 0;
      padding: 0;
    }
  }
`;

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

export const ShirtCard = styled(Card) <{ cart: boolean | null, pageVersion: boolean | null }>`
  border: none;
  display: flex;
  flex-direction: column;
  padding: 1.8em;
  background: #00000024;
  border-radius: 16px;
  margin-bottom: 30px;
  min-height:  ${(props) => (props.pageVersion ? `calc(100vh - ${DIMENSIONS.heights.navbar.standard}px - 33px)` : "")};
  justify-content:  ${(props) => (props.pageVersion ? "center" : "")};

  @media screen and (max-width: ${mobileBreakpoint}){
    min-height:  ${(props) => (props.pageVersion ? "0px" : "")};
  }

  .card-img {
    border: none;
    cursor: ${(props) => !props.cart && "pointer"};
  }
  .card-title {
    color: ${COLORS.StoneClassyDarkColorDarkened};
    font-size: 1.7em;
    text-align: ${(props) => (!props.cart ? "center" : "left")};
    font-family: "Cabin", sans-serif;
    margin: 0 0;
    padding-top: 0.7em;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: ${mobileBreakpoint}) {
      font-size: 1.3em;
    }
  }
  .card-body {
    color: ${COLORS.StoneClassyDarkColorDarkened};
    font-size: 1.5em;
    position: relative;
    text-align: ${(props) => (!props.cart ? "center" : "left")};
    .card-text {
      &.cart {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .price {
      font-weight: bold;
      font-size: 24px;
      margin-top: -10px;
      color: ${COLORS.StoneClassyDarkColorDarkened};
    }
  }
  .cartFooter {
    text-align: right;
    .price {
      font-size: 19px;
      margin: 0 0.3em -0.3em 0;
    }
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    margin-top: 33px;
    margin-bottom: 0;
  }
`;

export const ShirtCardButton = styled(animated(Card)) <{ cart: boolean | null }>`
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 1.8em;
  background: ${COLORS.purple.default};
  border-radius: 16px;
  margin-bottom: 30px;
  color: white;
  position: relative;

  &:hover {
    border: 1px solid ${COLORS.purple.rollover};
  }
  .card-img {
    border: none;
    cursor: ${(props) => !props.cart && "pointer"};
  }
  .card-title {
    color: ${COLORS.StoneClassyDarkColorDarkened};
    font-size: 1.7em;
    text-align: ${(props) => (!props.cart ? "center" : "left")};
    font-family: "Cabin", sans-serif;
    margin: 0 0;
    padding-top: 0.7em;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: ${mobileBreakpoint}) {
      font-size: 1.3em;
    }
  }
  .card-body {
    font-size: 1.5em;
    position: relative;
    text-align: ${(props) => (!props.cart ? "center" : "left")};
    .card-text {
      &.cart {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .price {
      font-weight: bold;
      font-size: 24px;
      margin-top: -10px;
    }
  }
  .cartFooter {
    text-align: right;
    .price {
      font-size: 19px;
      margin: 0 0.3em -0.3em 0;
    }
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    margin-top: 33px;
    margin-bottom: 0;
  }
`;

export const SwatchDiv = styled.div`
  padding: 10px;
  background: linear-gradient(#ffffffab, #a397a23d 95%);
  border-radius: 8px;
  box-shadow: 0px 3px 3px #00000050;
  display: flex;
  justify-content: space-between;
`;

export const ShirtButton = styled.button<{
	invert: boolean;
}>`
  display: flex;
  padding: 0;
  border-radius: 0 6px 6px 0;
  justify-content: space-between;
  background: ${(props) =>
		props.invert ? "white" : `${COLORS.purple.rollover}`};
  border: solid 1px ${COLORS.purple.rollover};
  color: ${(props) => (!props.invert ? "white" : `${COLORS.purple.rollover}`)};
  align-items: center;
  height: ${DIMENSIONS.heights.shoppingCart.footer.standard}px;
  transition: box-shadow 0.3s ease, opacity 0.3s ease;

  &:disabled {
    opacity: 0.5;
    filter: saturate(0);

    &:hover {
      box-shadow: none;
    }
  }

  &:hover {
    box-shadow: 0px 0px 10px #00000070;
  }

  .shirtButtonTextBox {
    border: none;
    //
    background: ${(props) =>
		!props.invert ? "white" : `${COLORS.purple.rollover}`};
    flex: 1;
    color: ${(props) => (props.invert ? "white" : `${COLORS.purple.rollover}`)};
    align-items: center;
    display: flex;
    text-shadow: 0 0px 0px #00000010, 0 -1px 2px #ffffff50;
    border-radius: 0 6px 6px 0;
    padding: 0 1em;
    font-family: -apple - system, BlinkMacSystemFont, “Segoe UI”, Roboto,
      Helvetica, Arial, sans-serif;
    position: relative;
    top: 0;
    font-size: 20px;
    box-shadow: 2px 2px 6px #00000000;
    font-weight: normal;
    height: 100%;
    span {
      margin: 0 auto;
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
    @media screen and (max-width: ${mobileBreakpoint}) {
      padding: 0 0.8em;
      font-size: 20px;
    }
  }
`;

export const MobileCheckoutCollapser = styled.div`
font-size: 16px;
padding: 10px;
`;

export const CheckoutItemsDiv = styled.div<{ open: boolean }>`
	border: none;
	padding: 0;
@media screen and (max-width: ${mobileBreakpoint}){
	padding: 0 2em;
	border: solid 1px black;
	height: ${(props) => !props.open ? 0 : "auto"};
	overflow: ${(props) => !props.open ? "hidden" : "auto"};
}
`;

export const LogoImg = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  transform: translateX(-1%);
`;

export const StepperBox = styled(Box)`
  margin: 2em auto;
  width: 60%;

  display: block;
 
  @media screen and (max-width: ${mobileBreakpoint}) {
    margin: 0 0 0.5em 0 !important;
    width: 100% !important;   justify-content: center;  display: flex;  align-items: center;
  }
`;

export const LightBox = styled.div<{ src: string; showing: boolean }>`
  background: ${(props) => (props.showing ? "#00000080" : "#00000001")};
  visibility: ${(props) => (!props.showing ? "hidden" : "visible")};
  transition: background 0.3s ease;
  z-index: 100;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${(props) => (!props.showing ? "none" : "auto")};

  .box {
    margin: 0 30.125%;
    width: 100%;
    height: 90%;
    background: white;
    display: flex;
    border-radius: 18px;
    box-shadow: inset 1px 1px 15px black;
    pointer-events: auto;
    position: relative;

    @media screen and (max-width: ${mobileBreakpoint}) {
      margin: 0;
      width: 100vw;
      height: 100%;
    }

    .closeButton {
      background: black;
      z-index: 1;
      border-radius: 5px;
      padding: 0.3em;
      margin: 2.4em;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      pointer-events: auto;
    }
  }
`;

export const Titles = styled.div`
  z-index: 1;
  display: flex;
  position: relative;
  width: 100%;

  h3 {
    color: ${COLORS.purple.rollover};
    display: block;
    padding: 0 0 0.5em 16px;
    margin: 0;
    padding-right: 47px;
  }

  p {
    color: ${COLORS.purple.rollover};
    display: block;
    margin: 0;
    padding: 0 0 0 8px;
  }
`;

const heartBeat = keyframes`
	0% {
	  transform: scale(0.95);
	}
	5% {
	  transform: scale(1.1);
	}
	39% {
	  transform: scale(0.85);
	}
	45% {
	  transform: scale(1);
	}
	60% {
	  transform: scale(0.95);
	}
	100% {
	  transform: scale(0.9);
	}
`;

export const CardFieldElement = styled.div`
  @media screen and (max-width: ${mobileBreakpoint}) {
    max-width: 320px;
  }
`;

export const HeartLoader = styled.div<{ fixed: boolean }>`
  position: ${(props) => props.fixed && "fixed"};
  top: ${(props) => props.fixed && "50%"};
  left: ${(props) => props.fixed && "50%"};
  transform: ${(props) => props.fixed && "translateX(-50%) translateY(-50%)"};

  .lds-heart {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    transform: rotate(45deg);
    transform-origin: 40px 40px;
  }
  .lds-heart div {
    top: 32px;
    left: 32px;
    position: absolute;
    width: 32px;
    height: 32px;
    background: ${COLORS.purple.rollover};
    animation: ${heartBeat} 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .lds-heart div:after,
  .lds-heart div:before {
    content: " ";
    position: absolute;
    display: block;
    width: 32px;
    height: 32px;
    background: ${COLORS.purple.rollover};
  }
  .lds-heart div:before {
    left: -24px;
    border-radius: 50% 0 0 50%;
  }
  .lds-heart div:after {
    top: -24px;
    border-radius: 50% 50% 0 0;
  }
`;

export const ShoppingCartHolder = styled(animated.div) <{
	multipleItems: boolean;
}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  width: ${DIMENSIONS.widths.shoppingCart.standard}px;
  background: white;
  top: ${DIMENSIONS.heights.navbar.standard}px;
  bottom: 0;
  height: calc(100% - ${DIMENSIONS.heights.navbar.standard}px);
  z-index: 99;
  box-shadow: -5px 10px 10px 2px #00000020;

  @media screen and (max-width: ${mobileBreakpoint}) {
	  height: calc(100% - ${DIMENSIONS.heights.navbar.mobile}px);
	  width: ${DIMENSIONS.widths.shoppingCart.mobile}px;
  }
  ///////////////////////////
  .closeButton {
    width: 90px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    z-index: 2;

    @media screen and (max-width: ${mobileBreakpoint}) {
      width: 60px;
    }
  }
  .proceedToCheckout {
	color: ${COLORS.purple.rollover};
	font-family: 'Cabin',sans-serif;
    font-size: 1.19rem;
	padding: 5px;
  }
  .footer {
    background: white;
    right: 0;
    height: ${DIMENSIONS.heights.shoppingCart.footer.standard}px;
    width: ${DIMENSIONS.widths.shoppingCart.standard}px;
    display: flex;
    flex-direction: column;
    background: white;
    @media screen and (max-width: ${mobileBreakpoint}) {
      height: 60px;
    }
    &::after {
      position: absolute;
      content: "";
      background: linear-gradient(#00000001, #00000020);
      width: ${DIMENSIONS.widths.shoppingCart.standard}px;
      right: 0;
      height: 6px;
      bottom: ${DIMENSIONS.heights.shoppingCart.footer.standard}px;
      filter: blur(1px);
      pointer-events: none;
      z-index: 2;
    }
  }
  .holder {
    margin-left: 10%;
    flex: 1;
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: white;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${COLORS.StoneLightWhiteGrey};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    @media screen and (max-width: 967px) {
      margin-left: 20%;
    }
    @media screen and (max-width: ${mobileBreakpoint}) {
      margin-left: 8%;
    }
  }
  //////////////////////////
  @media screen and (max-width: 768px) {
    width: 100vw;
    top: ${DIMENSIONS.heights.navbar.mobile}px;
  }
  @media screen and (max-width: ${mobileBreakpoint}) {
    height: calc(100% - ${DIMENSIONS.heights.navbar.mobile}px);
  }
`;

export const DeleteButton = styled.button`
  border: 0;
  margin: 0 0 0 20px !important;
  padding: 0;
  color: ${COLORS.StoneClassyDarkColor};
  font-size: 24px;
  background: transparent;
`;

export const QuantityDiv = styled.div`
  display: flex;
  padding: 0.4em;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  border-radius: 0 0 5px 5px;
  color: ${COLORS.purple.default};

  button {
    border: none;
    background: none;
    margin: 0 3px;

    svg {
      fill: ${COLORS.purple.default};
    }
  }
`;

export const ShirtColorSelect = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;

  div {
    flex: 1;
    height: 33px;
    display: flex;
    justify-content: center;

    button {
      width: 100%;
      max-width: 33px;
      border: none;
      margin: 0;
      padding: 0;
      border-radius: 4px;
    }
  }
`;

export const ShirtColorOption = styled.li<{
	colorFill: string | undefined;
	inline: boolean;
}>`
  display: inline-block;
  border-radius: 2px;
  overflow: hidden;
  border: solid 1px #00000030;
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
  filter: saturate(0.8);
  background: ${(props) => props.colorFill};
  ${(props) =>
		props.inline &&
		`position: relative;
	cursor: pointer;
    top: 5px;
    left: 5px;`}
`;

export const CartOptionsPopupDiv = styled(animated.div)`
  &:before {
    content: "";
    width: 100%;
    position: absolute;
    background: linear-gradient(#ffffff01, #ffffff);
    height: 20px;
    top: -19px;
    left: 0;
    right: 0;
  }
  position: absolute;
  background: white;
  padding: 19px;
  width: 319px;
  border-radius: 10px;
  top: 27px;
  left: -80px;
  z-index: 10;
  box-shadow: 1px 3px 7px #00000060;
`;
