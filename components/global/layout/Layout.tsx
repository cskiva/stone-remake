import React from "react";

export default function Layout(props: { children: JSX.Element }) {
	return (
		<>
			<main style={{ width: "100%" }}>{props.children}</main>
		</>
	);
}
