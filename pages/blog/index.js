import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {
  BlogPost,
  BlogPostLinksHolder,
} from "../../components/pageComponents/styles/BlogStyles";
import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import BlogLayout from "../../components/pageComponents/blog/blogLayout";
import { COLORS } from "../../components/styles/colors";
import DIMENSIONS from "../../components/styles/GlobalDimensions";
import Head from "next/head";
import NavbarStone from "../../components/global/layout/Navbar";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://www.sebastiangrantcdn.com/stone/graphql", // Replace with your WordPress GraphQL endpoint
  cache: new InMemoryCache(),
});

export default function BlogPage({ posts }) {

  return (
    <>
      <Head>
        <title>Write In Stone - Blog</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavbarStone landingPage />
		<BlogLayout posts={posts}/>
    </>
  );
}

export async function getStaticProps() {
  // GraphQL query to fetch posts
  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            title
            content
            date
            slug
            author {
              node {
                id
                name
                avatar {
                  url
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              nodes {
                name
              }
            }
            tags {
              nodes {
                name
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.posts.nodes,
    },
  };
}
