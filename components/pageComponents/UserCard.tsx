import { COLORS } from "../styles/colors";
import { Card } from "react-bootstrap";
import DIMENSIONS from "../styles/GlobalDimensions";
import { ImLinkedin } from "react-icons/im";
import React from "react";
import styled from "styled-components";

const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 5rem;
  .icon {
    color: black;
  }
`;

const UserCardStyle = styled(Card)`
  //
  border-left: 0;
  border-right: 0;
  border-top: 0;
  margin-bottom: 1em;
  box-shadow: 1px 1px 1px #00000010;
  //////////////////////////
  @media screen and (max-width: ${DIMENSIONS.breakPoints.mobile}px) {
    margin-bottom: 1em;
  }
  //
  .card-title {
    font-size: 1.58em;
    text-align: center;
    @media screen and (max-width: ${DIMENSIONS.breakPoints.mobile}px) {
      font-size: 1.38em;
    }
  }
  .card-text {
    font-size: 1.38em;
    min-height: 5.2rem;
    margin: 2rem 0;
    text-align: center;
    @media screen and (max-width: ${DIMENSIONS.breakPoints.mobile}px) {
      font-size: 1.4em;
      min-height: 3.7rem;
    }
  }
  .nameProper {
    background: ${COLORS.purple.rollover};
    padding: 0.3em;
    color: white;
  }
`;

const UserCard = (props: {
	userName: string;
	role: string;
	description: string;
	linkedIn: string | null;
}) => {
	return (
		<UserCardStyle style={{ width: "100%" }}>
			<Card.Img
				variant="top"
				style={{
					borderRadius: "100%",
					margin: "auto auto",
					maxWidth: "230px",
				}}
				src={`images/${props.userName}.jpg`}
			/>
			<Card.Body>
				<Card.Title style={{ whiteSpace: "nowrap" }}>
					<span className="nameProper">{props.userName}</span>
					<span> - {props.role}</span>
				</Card.Title>
				<Card.Text>{props.description}</Card.Text>
				{/* <Button variant="primary">Go somewhere</Button> */}
				{/* <SocialLinks>
          {props.facebook && <ImFacebook className="icon" size={23} />}
          {props.twitter && <ImTwitter className="icon" size={23} />}
          {props.email && <GrContact className="icon" size={23} />}
        </SocialLinks> */}

				{props.linkedIn && (
					<SocialLinks>
						<a href={props.linkedIn}>
							<ImLinkedin className="icon" size={23} />
						</a>
					</SocialLinks>
				)}
			</Card.Body>
		</UserCardStyle>
	);
};

export default UserCard;