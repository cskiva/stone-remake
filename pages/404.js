import { Container } from "react-bootstrap";
// 404.js
import Link from "next/link";
import React from "react";

export default function FourOhFour() {
	return (
		<Container
			fluid
			className="h-100 d-flex flex-column justify-content-center align-items-center"
			style={{ minHeight: "100vh", overflow: "hidden" }}
		>
			<h1>404</h1>
			<Link href="/">
				<a>Home</a>
			</Link>
		</Container>
	);
}
