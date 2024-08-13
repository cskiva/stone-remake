import React, { useState } from "react";
import styled, {keyframes} from "styled-components";

import { Card } from "react-bootstrap";

const placeHolder =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const Image = styled(Card.Img)`
transition: opacity 1s ease;
height: 100%;
width: 100%;
  // Add a smooth animation on loading
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  // I use utilitary classes instead of props to avoid style regenerating
  &.loaded:not(.has-error) {
    animation: loaded 1500ms ease-in-out;
  }
  &.has-error {
    // fallback to placeholder image on error
    content: url(${placeHolder});
  }
`;

const ldsRing = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

export const LoadingSpinner = styled.div`
	transition: opacity 1s ease;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
	display: flex;
	justify-content: center;
	align-items: center; 

	.lds-ring {
  display: inline-block;
  position: relative;
  width: 55px;
  height: 55px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 44px;
  height: 44px;
  margin: 4px;
  border: 4px solid #ffffff10;
  border-radius: 50%;
  animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #ffffff10 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
  `;

const LazyImage = (props: { src: string, alt: string }) => {
	const [imgLoaded, setImgLoaded] = useState(false);

	const onLoad = (event: { target: { classList: { add: (arg0: string) => void; }; }; }) => {
		event.target.classList.add("loaded");
		setImgLoaded(true);
	};

	const onError = (event: { target: { classList: { add: (arg0: string) => void; }; }; }) => {
		event.target.classList.add("has-error");
	};

	return (
		<>
			<LoadingSpinner style={{ opacity: !imgLoaded ? 1 : 0 }}> 
				<div className="lds-ring"> 
					<div/>
				</div>
			</LoadingSpinner>
			<Image
				className="poster"
				src={props.src}
				alt={props.alt}
				variant="top"
				onLoad={onLoad}
				onError={onError}
				style={{ opacity: imgLoaded ? 1 : 0 }}
			/>
		</>
	);
};

export default LazyImage;
