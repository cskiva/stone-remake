import {
	FaFacebook,
	FaLinkedin,
	FaReddit,
	FaTelegram,
	FaTwitter,
} from "react-icons/fa";
import {
	FacebookShareButton,
	FacebookShareCount,
	LinkedinShareButton,
	RedditShareButton,
	RedditShareCount,
	TelegramShareButton,
	TwitterShareButton,
} from "react-share";

import {COLORS} from "../../../../../styles/colors";
import React from "react";
import { projectInfo } from "../../../../../../APITypes/ProjectInfo.cs";
import router from "next/router";
import styled from "styled-components";
import urljoin from "url-join";

const SocialLinksStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  color: ${COLORS.StoneLightWhiteGrey};

  button {
    margin: 0 6px;
  }

  & > div {
    margin: 5px 15px;
    cursor: pointer;
  }
`;

const ShareCount = styled.div`
  text-align: center;
`;

function SocialLinks(props: {
	meta: projectInfo 
	}) {
	const iconSize = 33;
	const filter = (count: number) => (count > 0 ? count : "");
	const renderShareCount = (count: number) => (
		<ShareCount>{filter(count)}</ShareCount>
	);

	const title = props.meta.title;
	const description = props.meta.description !== undefined ? props.meta.description : "Research Transparency System.";
	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL !== undefined
			? process.env.NEXT_PUBLIC_BASE_URL
			: "http://www.writeinstone.com";
	const linkUrl = urljoin(baseUrl, router.asPath);
	console.log(linkUrl);

	const hashtags = ["writeinstone", "researchtransparency"];

	return (
		<SocialLinksStyle>
			<RedditShareButton url={linkUrl} title={title}>
				<FaReddit size={iconSize} />
				<RedditShareCount url={linkUrl}>
					{(count) => renderShareCount(count)}
				</RedditShareCount>
			</RedditShareButton>
			<TwitterShareButton url={linkUrl} title={title} hashtags={hashtags}>
				<FaTwitter size={iconSize} />
			</TwitterShareButton>
			<FacebookShareButton url={linkUrl} quote={description}>
				<FaFacebook size={iconSize} />
				<FacebookShareCount url={linkUrl}>
					{(count) => renderShareCount(count)}
				</FacebookShareCount>
			</FacebookShareButton>
			<LinkedinShareButton
				url={linkUrl}
				title={title}
				summary={description}
			>
				<FaLinkedin size={iconSize} />
			</LinkedinShareButton>
			<TelegramShareButton url={linkUrl}>
				<FaTelegram size={iconSize} />
			</TelegramShareButton>
		</SocialLinksStyle>
	);
}

export default SocialLinks;
