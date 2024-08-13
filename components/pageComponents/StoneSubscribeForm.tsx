import {
	EmailConfirmMessage,
	HomeForm,
	HomeResponseButton,
	IntroText,
	ResponseText,
	SendingMessage,
	SuccessMessage,
	WrapperForFormAndSuccessMessage
} from "./styles/HomeStyles";
import React, { useEffect, useState } from "react";
import {
	setIsMailingListVisible,
	setStoneSubscribeFormStatus,
	stoneSubscribeFormStatus
} from "../state/settingsState";
import { useAppDispatch, useAppSelector } from "../state/hooks";

import DIMENSIONS from "../styles/GlobalDimensions";
import { FaPaperPlane } from "react-icons/fa";
import InputField from "../store/InputField";
import { TiThumbsUp } from "react-icons/ti";
import { useSpring } from "react-spring";
import useWindowDimensions from "../../helpers/GetWindowDimensions";

export default function StoneSubscribeForm(props: {
	mailingListOpen: boolean | null;
	status: string | null;
	message: string | Error | null;
	onValidated: (e: {
		EMAIL: string;
		MERGE1: string;
		MERGE2: string;
	}) => unknown;
}) {
	const [sentEmail, setSentEmail] = useState("");
	// REDUX //////////////////////////////	
	const dispatch = useAppDispatch();
	const currentStoneSubscribeFormStatus = useAppSelector(stoneSubscribeFormStatus);
	// STATE //////////////////////////////
	const { height, width: windowWidth } = useWindowDimensions();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const dev = false;
	// hello

	const clearFields = () => {
		setName("");
		setEmail("");
	};

	useEffect(() => {

		if (props.status === "sending") {
			dispatch(setStoneSubscribeFormStatus(1));
		}
		if (props.status === "success") {
			const timer1 = setTimeout(() => dispatch(setStoneSubscribeFormStatus(3)), 1500);
			return () => {
				clearTimeout(timer1);
			};
		}
		if (props.status === "error") {
			dispatch(setStoneSubscribeFormStatus(2));
		}

	}, [props.status]);

	const clickYesAnimation = useSpring({
		config: { tension: 46, friction: 9, velocity: 0 },
		from: { opacity: 0, paddingBottom: "100px" },
		to: {
			opacity: currentStoneSubscribeFormStatus === 4 ? 1 : 0,
			paddingBottom: currentStoneSubscribeFormStatus === 4 ? "0" : "100px",
		},
	});

	const clickSubmitAnimation = useSpring({
		config: { tension: 46, friction: 9, velocity: 0 },
		from: { opacity: 1, maxHeight: "300px" },
		to: {
			opacity: currentStoneSubscribeFormStatus === 1 ? 0 : 1,
			maxHeight: currentStoneSubscribeFormStatus === 1 ? "40px" : "300px",
		},
	});

	// CLICK SUBMIT _______
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(setStoneSubscribeFormStatus(1));
		email &&
			name &&
			email.indexOf("@") > -1 &&
			props.onValidated({
				EMAIL: email,
				MERGE1: name.split(" ").slice(0, -1).join(" "),
				MERGE2: name.split(" ").slice(-1).join(" "),
			});
		email && email.indexOf("@") > -1 && setSentEmail(email);
	};

	// CLICK YES _______
	function clickYes() {
		dispatch(setStoneSubscribeFormStatus(4));
		setTimeout(() => {
			dispatch(setIsMailingListVisible(false));
		}, 2000);
		setTimeout(() => {
			if (windowWidth && windowWidth < DIMENSIONS.breakPoints.mobile) {
				dispatch(setStoneSubscribeFormStatus(4));
			}
			else {
				dispatch(setStoneSubscribeFormStatus(0));
			}
			clearFields();
		}, 3000);
	}

	// CLICK CONTINUE _______
	function clickContinue() {

		if (windowWidth && windowWidth < DIMENSIONS.breakPoints.mobile) {
			dispatch(setStoneSubscribeFormStatus(4));
			setTimeout(function () {
				dispatch(setStoneSubscribeFormStatus(0));
			}, 3000);
		}
		else {
			dispatch(setIsMailingListVisible(false));
			dispatch(setStoneSubscribeFormStatus(0));
		}
	}

	return (
		<WrapperForFormAndSuccessMessage>
			<SuccessMessage style={clickYesAnimation}>
				<p>
					Thankyou for supporting
					<br />
					Research Transparency
				</p>
				<TiThumbsUp size={55} style={{ marginLeft: "10px" }} />
			</SuccessMessage>
			<HomeForm
				onSubmit={(e) => handleSubmit(e)}
				style={{
					opacity: currentStoneSubscribeFormStatus === 4 ? 0 : 1,
					transition: "opacity 0.3s ease",
				}}
			>
				{(currentStoneSubscribeFormStatus === 0 || currentStoneSubscribeFormStatus === 1 || dev) && (
					<IntroText style={clickSubmitAnimation}>
						<p> Stone is only available on windows 10 and 11.</p>
						<h4>
							Sign Up to receive our Newsletter and updates on new versions
						</h4>
					</IntroText>
				)}

				{(currentStoneSubscribeFormStatus === 1 || dev) && (
					<SendingMessage>
						<div className="frame"><FaPaperPlane />	<p>Signing Up...</p></div>

					</SendingMessage>
				)}
				{(currentStoneSubscribeFormStatus === 2 || dev) && (
					<ResponseText
						style={{
							backgroundColor: "#FFBABA",
							color: "#D8000C",
							border: "solid 1px #D8000C",
						}}
						dangerouslySetInnerHTML={{
							__html: dev ? "<p>Error.</p>" : props.message ? `<p>${props.message.toString()}</p>` : "",
						}}
					/>
				)}
				{(currentStoneSubscribeFormStatus === 0 || currentStoneSubscribeFormStatus === 1 || currentStoneSubscribeFormStatus === 2 || dev) &&
					<InputField
						onChangeHandler={setName}
						type="text"
						value={name}
						placeholder="Your name"
						name="Your name"
						label="Your name:"
						isRequired
						disabledOverride={false}
						formValues={null}
					/>}
				{(currentStoneSubscribeFormStatus === 0 || currentStoneSubscribeFormStatus === 1 || currentStoneSubscribeFormStatus === 2 || dev) &&
					<InputField
						onChangeHandler={setEmail}
						type="email"
						value={email}
						label="Your email:"
						placeholder="you@email.com"
						name="Your email"
						isRequired
						formValues={null}
						disabledOverride={false}
					/>}
				<br />
				{(currentStoneSubscribeFormStatus === 3 || dev) && (
					<>
						<EmailConfirmMessage>
							<p>We&apos;ve sent an email to: <br /> <span className="emailAddress">{dev ? "email@myemail.com" : sentEmail}</span>
							</p>
							<div className="question"><p>Did you receive it?<br />(Emails may take up to 15 minutes to arrive)</p></div>
						</EmailConfirmMessage>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "stretch",
								width: "100%",
								marginTop: "10px",
							}}
						>
							<HomeResponseButton
								style={{
									flex: 1,
									marginRight: "10px",
									color: "#DFF2BF",
									background: "#4F8A10",
								}}
								onClick={() => clickYes()}
							>
								<h4>Yes</h4>
							</HomeResponseButton>
							<HomeResponseButton
								style={{ flex: 1, marginLeft: "10px" }}
								onClick={() => clickContinue()}
							>
								<h4>Continue</h4>
							</HomeResponseButton>
						</div>
					</>
				)}
				{(currentStoneSubscribeFormStatus === 0 || currentStoneSubscribeFormStatus === 1 || currentStoneSubscribeFormStatus === 2 || dev) && (
					<InputField
						type="submit"
						name="Submit"
						placeholder="Submit"
						label="Submit"
						value="Submit"
						formValues={[email, name]}
						disabledOverride={currentStoneSubscribeFormStatus === 1}
						isRequired={true}
						onChangeHandler={null}
					/>
				)}
			</HomeForm>
		</WrapperForFormAndSuccessMessage>
	);
}
