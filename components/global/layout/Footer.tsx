import * as React from "react";

import { Col, Container, Nav, Row } from "react-bootstrap";
import { ContactButton, DownloadButton } from "../../Buttons/Buttons";

import {COLORS} from "../../styles/colors";
import DIMENSIONS from "../../styles/GlobalDimensions";
import { FooterContainer } from "../styles/FooterStyles";
import { ImTwitter } from "react-icons/im";
import styled from "styled-components";

const mobileBreakpoint = DIMENSIONS.breakPoints.mobile;

const FooterLink = styled(Nav.Link)`
  margin: 0.33rem 0;
  color: ${COLORS.purple.cadenceLavender};
  &:hover {
    text-decoration: none;
    color: ${COLORS.purple.rollover};
  }
  .icon {
    margin-right: 1rem;
  }
  .subLink {
    opacity: 0.5;
  }
`;

const FooterRow = styled(Row)`

@media screen and (max-width: ${mobileBreakpoint}px){

}

`;

const FooterCol = styled(Col)`
justify-content: ${(props) => props.leftCol ? "flex-start" : "center"};
align-items: ${(props) => props.leftCol ? "flex-start" : "flex-end"};

@media screen and (max-width: ${mobileBreakpoint}px){
  justify-content: center;
align-items: center;
}
`;

interface Props {
	mobileVersion: boolean;
}

const FooterStone: React.FC<Props> = ({ mobileVersion }) => {
	return (
		<FooterContainer
			fluid
		>
			<Container>
				<FooterRow>
					<FooterCol leftCol className="p-3 d-flex flex-column" xs={12} sm={6}>
						<Nav defaultActiveKey="/home" className="flex-column">
							<FooterLink href="https://twitter.com/WriteInStone">
								<ImTwitter
									className="icon"
									size={23}
									color={COLORS.StoneLightWhiteGrey}
								/>
								Stone on Twitter
							</FooterLink>
						</Nav>
					</FooterCol>

					<FooterCol
						xs={12} sm={6}
						className="d-flex flex-column justify-content-center"
					>
						<div className="my-3">
							<ContactButton superFooterStyle={false} />
						</div>
						<DownloadButton height={50.72} fadeOut={false} buttonPosition="pageFooterButton" collapse={false} />
						{/* Render Custom Footer Content */}
					</FooterCol>
				</FooterRow>
			</Container>
		</FooterContainer>
	);
};

export default FooterStone;
