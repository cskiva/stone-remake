import {
	ContactButtonStyle,
	DownloadButtonHolder,
	DownloadButtonProper,
	DownloadButtonStyle
} from "../pageComponents/styles/HomeStyles";
import React, { useState } from "react";

import {COLORS} from "../styles/colors";
import {FaWindows} from"react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TrackEvent } from "../../pages/_app";

const downloadButtonClick = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
	TrackEvent("Download Clicked", new Map([]));
};

export const ContactButton = (props: { superFooterStyle: boolean }) => {
	return (
		<a href="mailto:info@writeinstone.com">
			<ContactButtonStyle superFooterStyle={props.superFooterStyle}>
				<MdEmail />
				<span style={{ zIndex: 1 }}>CONTACT US</span>{" "}
				<div className="tipple">
					<div className="tippleCircle" />
				</div>
			</ContactButtonStyle>
		</a>
	);
};

export const DownloadButton = (props: {
	fadeOut: boolean;
	buttonPosition: string;
	height: number;
	collapse: boolean;
}) => {
	const [macUserInput, setMacUserInput] = useState(false);
	// const [email, setEmail] = useState("");

	// const subscribe = async (e: any) => {
	// 	const res = await fetch("./api/subscribe", {
	// 		method: "post",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			email: email,
	// 		}),
	// 	});
	// };

	// useEffect(() => {
	// 	props.collapse && macUserInput && setMacUserInput(false);
	// }, [props.collapse]);

	// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setEmail(e.target.value);
	// };

	const downloadLink = process.env.NEXT_PUBLIC_DOWNLOAD_URL;

	return (
		<DownloadButtonHolder
			buttonPosition={props.buttonPosition}
			macUserInput={macUserInput}
		>
			<DownloadButtonProper>
				<FaWindows style={{margin: "0 0.6em", fontSize: "24px", position: "relative", top: "-2px"}} />
				<a
					style={{
						opacity: props.fadeOut ? 0 : 1,
						transition: "opacity 0.5s ease",
						margin: 0
					}}
					href={downloadLink}
				>
					<DownloadButtonStyle
						height={props.height}
						onClick={(e) => downloadButtonClick(e)}
						buttonPosition={props.buttonPosition}
					>
						<span style={{ zIndex: 1 }}>Download (For PC)</span>
						<div className="tipple">
							<div className="tippleCircle" />
						</div>
						{/* <FaDownload /> */}
					</DownloadButtonStyle>
				</a>
			</DownloadButtonProper>
			{/* <MacDownloadInfoLinkDiv
        buttonPosition={props.buttonPosition}
        macUserInput={macUserInput}
      >
        <div className="a">
          <button onClick={() => setMacUserInput(true)}>
            <FaApple />
            <p className="macUser">Mac User? </p>
          </button>
        </div>
        <div className="b">
          <p className="text">
            Enter your email and we will <br className="d-md-none d-sm-block" />{" "}
            notify you when we release a <br className="d-md-none d-sm-block" />
            Mac version
          </p>
          <form>
            <input type="text" onChange={handleChange} />
            <button onClick={(e) => subscribe(e)}>
              <BiMessageSquareAdd />
            </button>
          </form>
          <p className="textB">
            <GrVirtualMachine style={{ marginRight: "0.4rem" }} />
            Stone will also run on a Virtual Machine (or Bootcamp).
          </p>
        </div>
      </MacDownloadInfoLinkDiv> */}
		</DownloadButtonHolder>
	);
};
