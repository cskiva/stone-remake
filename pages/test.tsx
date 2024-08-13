import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import React from "react";

export default function test2(props: { featuredPost: FeaturedPostInterface }) {

	// console.log(props.featuredPost.uri);

	return (
		<div />
	);
}

// TODO: Make env variable for best disinfectant

interface FeaturedPostInterface {
	uri: string,
	id: string,
	date: string,
	title: string,
	slug: string,
	content: string,
	excerpt: string,
	author: {
		node: {
			name: string
		}
	}
}

export async function getStaticProps() {
	const client = new ApolloClient({
		uri: "https://thebestdisinfectant.com/graphql",
		cache: new InMemoryCache()
	});

	try {
		const response = await client.query({
			query: gql`
      query MyQuery {
        posts {
          edges {
            node {
              uri
              id
              date
              title
              slug
              content
              excerpt
              author {
                node {
                  name
                }
              }
            }
          }
        }
      }
    `,
		});

		const featuredPost = response.data.posts.edges[0].node as FeaturedPostInterface;
		return {
			props: { featuredPost },
			revalidate: 600,
		};
	}
	catch {
		return {
			props: {},
		};
	}
}