import { COLORS } from "../../styles/colors";
import DIMENSIONS from "../../styles/GlobalDimensions";
import styled from "styled-components";

export const BlogPost = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 0 3rem;	 
  
  @media screen and (max-width: 768px) {
		padding: 0.3em 0;
	  }

  @media (min-width: ${DIMENSIONS.breakPoints.laptopL}px) {
    padding: 0 10rem;
  }

  a {
    &.post_title {
      border-bottom: 2px solid ${COLORS.StoneLightWhiteGrey};
      width: 100%;
      color: unset;
      display: flex !important;
      align-items: center; /* This should vertically align your items */
      justify-content: start;
      padding: 1em 0;



      h2 {
        line-height: 1;
        margin: 0;
        padding: 0; /* If your h2 has a default margin, it might affect the alignment. Try setting it to 0. */
      }
    }
  }

  .blog-post-content {
    margin-bottom: 20px;
    max-width: 1;
    width: 100%;

    padding: 1em;
    margin: 0 auto;

    p {
      font-size: 1.2em;
    }

    img {
      width: 100%;
    }
  }

  .author {
    background-color: transparent;

    a {
      color: unset;
      text-transform: capitalize;
    }

    border: 0;
    gap: 0.5em;
    padding: 10px;

    .avatar {
      margin: 0 0.4em;
    }
  }

  .header-region {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;

    .meta-region {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      border-bottom: ${COLORS.StoneCadenceGreen} 1px solid;

      & > div,
      & > button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        // :first-child {
        // 	border-right: 1px solid ${COLORS.purple.DeepPurple};
        // }
      }
    }

    h2 {
      letter-spacing: -0.01em;
      font-size: 1.6rem;
      font-family: "Cabin", serif;
      font-weight: 600;
      margin: 0;
      margin-bottom: 1em;
      width: 100%;
      text-align: center;
      padding-top: 10px;
    }

    padding: 0;
  }
`;

export const BlogPostLinksHolder = styled.div<{ flex: boolean | null }>`
  flex: ${(props: any) => (props.flex ? "1" : "0")};
  padding: 10px;
  margin-bottom: ${(props: any) => (!props.flex ? "0" : "10px")};

  .tag-holder {
    padding: 10px;
    margin: 0;
    padding-left: 0;
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.5em;
    /* max-height: 100px; */
    overflow: hidden;
  }

  .tag-cloud {
    background: ${COLORS.purple.default};
    color: ${COLORS.StoneLightWhiteGrey};
    font-family: "Cabin", sans-serif !important;
    font-weight: 600;
    padding: 10px;
    border-radius: 9999px;
    border: 0;
    min-height: unset !important;
    margin: unset !important;
    height: unset !important;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  h5 {
    border-bottom: ${COLORS.purple.DeepPurple} 1px solid;
    padding-bottom: 5px;
    font-family: "Cabin", sans-serif;
    font-size: 1.1rem;
  }
`;

export const NavPanelBlog = styled.div`
  flex-direction: column;
  display: flex;
  padding: 10px;
  border-right: 1px solid ${COLORS.purple.DeepPurple};

  justify-content: space-between;

  height: calc(100vh - ${DIMENSIONS.heights.navbar.standard}px);
  position: sticky;
  top: 10px;

  @media (min-width: ${DIMENSIONS.breakPoints.laptopL}px) {
    padding: 4rem;
    top: 4rem;
  }
`;

export const RecentPosts = styled.ul`
  gap: 0.5em;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;

  li {
    .titleAndDate {
      display: flex;
      font-weight: 600;
      padding: 0.2rem 0.3rem;
      border-bottom: 1px solid ${COLORS.StoneLightWhiteGrey};
    }

    .excerpt {
      position: relative;
      padding: 0.5em 0.3em;
      overflow: hidden;

      @media (max-width: ${DIMENSIONS.breakPoints.laptopL}px) {
        max-height: 100px;
      }
    }

    &:hover {
      .excerpt::after {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
      }
    }

    .excerpt::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px; /* Adjust this value to change the height of the gradient */
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
    }

    padding: 10px 5px;

    &:hover {
      background: #ffffff;
    }
  }
`;
