import {
  AboutUsP,
  ArticleHolderDiv,
  ArticleIframeDiv,
  ArticleSpan,
  ContinueReadingButton,
  ContinueReadingButtonHolder,
  ExampleHolderDiv,
  GalleryRow,
  InitialSlide,
  MoreInfoButton,
  StoneTitleJumbotron,
  StoneTitleJumbotronFancy,
  ToolTipPortal,
} from "../styles/HomeStyles";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {
  BlogPost,
  BlogPostLinksHolder,
  NavPanelBlog,
  RecentPosts,
} from "../styles/BlogStyles";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { COLORS } from "../../styles/colors";
import { CgSpinnerAlt } from "react-icons/cg";
import DIMENSIONS from "../../styles/GlobalDimensions";
import {LoadingSpinner} from "../../LazyLoad/LazyLoad"

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://www.sebastiangrantcdn.com/stone/graphql", // Replace with your WordPress GraphQL endpoint
  cache: new InMemoryCache(),
});

export default function blogLayout({ posts }) {
  const [recentPosts, setRecentPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [siteData, setSiteData] = useState([]);

  useEffect(() => {
    if (posts.length > 0) {
      setLoading(false);
      console.log(posts);
    }
  }, [posts]);

  useEffect(() => {
    // Fetch recent posts
    if (client) {
      client
        .query({
          query: gql`
            query GetRecentPosts {
              posts(first: 5) {
                nodes {
                  id
                  title
                  excerpt
                  date
                  slug
                }
              }
            }
          `,
        })
        .then((response) => setRecentPosts(response.data.posts.nodes));

      client
        .query({
          query: gql`
            query GetSiteData {
              generalSettings {
                title
                description
              }
            }
          `,
        })
        .then((response) => setSiteData(response.data.generalSettings));

      // Fetch tags
      client
        .query({
          query: gql`
            query GetTags {
              tags {
                nodes {
                  id
                  name
                  count
                }
              }
            }
          `,
        })
        .then((response) => setTags(response.data.tags.nodes));
    }

    // More queries can be added as needed
  }, [client]);

  const LoadingDiv = () => {
    return (
		<LoadingSpinner>
      <div className="lds-ring">
        <div />
      </div></LoadingSpinner>
    );
  };

  const renderRecentPosts = () =>
    !recentPosts.length ? (
      <LoadingDiv />
    ) : (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <h5>Recent Posts</h5>
        <div style={{ position: "relative", overflowY: "auto", flexGrow: 1 }}>
          <RecentPosts>
            {recentPosts.map((post) => (
              <li key={post.id}>
                <div className="titleAndDate">
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/post/${post.id}`}
                    style={{ flex: 1 }}
					className="hover-none"
                  >
                    {post.title}
                  </a>
                  <span>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="excerpt">
                  <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </div>
              </li>
            ))}
          </RecentPosts>
        </div>
      </div>
    );

  const renderTagsCloud = () =>
    !tags.length ? (
      <LoadingDiv />
    ) : (
      <div>
        <h1 className='font-title' style={{fontSize: 18}}>Tags</h1>
        <div className="tag-holder">
          {tags.map((tag) => (
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/tag/${tag.name}`}
            >
              <button
                className="tag-cloud"
                key={tag.id}
                style={{ margin: "5px", fontSize: `${12 + tag.count}px` }}
              >
                # {tag.name}
              </button>
            </a>
          ))}
        </div>
      </div>
    );

  if (loading) return <div>loading</div>;

  return (
    <Container
      fluid
      style={{
        minHeight: `calc(100% - ${DIMENSIONS.heights.navbar.standard}px)`,
        display: "flex",
        width: "100%",
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      <Row
        noGutters
        style={{
          height: "100%",
          width: "100%",
          flex: 1,
          overflowY: "auto",
          margin: 0,
          padding: 0,
          position: "absolute",
        }}
      >
        <Col
          lg={{ span: 4, order: 1 }}
          xs={{ order: 2, span: 12 }}
          style={{ display: "flex", flexDirection: "column"}}
        >
          <NavPanelBlog>
            <BlogPostLinksHolder flex>
              {renderRecentPosts()}
            </BlogPostLinksHolder>
            <BlogPostLinksHolder>{renderTagsCloud()}</BlogPostLinksHolder>
          </NavPanelBlog>
        </Col>
        <Col
          lg={{ span: 8, order: 2 }}
          xs={{ order: 1, span: 12 }}
          className="pt-2"
        >
          <StoneTitleJumbotron style={{ background: "transparent", textAlign: "center" }}>
            {siteData.title ? (
              <a
                style={{ color: "unset" }}
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog`}
              >
                <h1 className="display-4">{siteData.title}</h1>
              </a>
            ) : (
              <h1 style={{ opacity: 0, fontWeight: 600 }}>Loading</h1>
            )}
          </StoneTitleJumbotron>
          {/* Render posts here */}
          {!Array.isArray(posts) || posts.length === 0 ? ( // Check if posts is not an array or if it's empty
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h2>There are no posts yet.</h2>
            </div>
          ) : !Array.isArray(posts) ? (
            <BlogPost>
              <div className="header-region">
                <div className="meta-region">
                  <div>
                    {new Date(posts.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <button className="author">
                    <a href={posts.author.node.url ?? "#"}>
                      by
                      <span className="avatar">
                        <img
                          src={
                            posts.author?.avatar?.url ??
                            posts.author.node.name
                              .toLowerCase()
                              .includes("austin")
                              ? `${process.env.NEXT_PUBLIC_BASE_URL}/images/Austin.jpg`
                              : ""
                          }
                          width={20}
                          height={20}
                          style={{ borderRadius: 9999 }}
                        />
                      </span>
                      {posts.author.node.name}
                    </a>
                  </button>
                </div>
                <a
                  className="post_title"
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/post/${posts.id}`}
                >
                  <h2>{posts.title}</h2>
                </a>
              </div>
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: posts.content }}
              />
            </BlogPost>
          ) : (
            posts.map((post, index) => (
              <BlogPost key={index}>
                <div className="header-region">
                  <div className="meta-region">
                    <div>
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <button className="author">
                      <a href={post.author.node.url ?? "#"}>
                        by 
                        <span className="avatar">
                          <img
                            src={
                              post.author?.avatar?.url ??
                              post.author.node.name
                                .toLowerCase()
                                .includes("austin")
                                ? `/images/Austin.jpg`
                                : ""
                            }
                            width={20}
                            height={20}
                            style={{ borderRadius: 9999 }}
                          />
                        </span>
                        {post.author.node.name}
                      </a>
                    </button>
                  </div>
                  <a
                    className="post_title"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/post/${post.id}`}
                  >
                    <h2>{post.title}</h2>
                  </a>
                </div>
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </BlogPost>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}
