import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import BlogLayout from "../../../components/pageComponents/blog/blogLayout";
import Head from "next/head";
import NavbarStone from "../../../components/global/layout/Navbar";
import { useRouter } from 'next/router';

const client = new ApolloClient({
		uri: 'https://www.sebastiangrantcdn.com/stone/graphql', // Replace with your WordPress GraphQL endpoint
		cache: new InMemoryCache(),
});

const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
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
`;

function PostByIdPage({ post }) {
		if (!post) return <p>Loading...</p>;

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
				<BlogLayout posts={post}/>
		</>
	);
};

export async function getStaticPaths() {
	const { data } = await client.query({
		query: gql`
			query GetAllPostIds {
				posts {
					nodes {
						id
					}
				}
			}
		`,
	});

	const paths = data.posts.nodes.map((node) => ({
		params: { id: node.id },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
		const { id } = params;

		const { data } = await client.query({
		query: GET_POST_BY_ID,
		variables: { id },
	});

		return {
				props: {
						post: data.post,
				},
		};
}

export default PostByIdPage;