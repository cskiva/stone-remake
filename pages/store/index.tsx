import React, { useEffect } from "react";

import { COLORS } from "../../components/styles/colors";
import { Col } from "react-bootstrap";
import Head from "next/head";
import NavbarStone from "../../components/global/layout/Navbar";
import ShoppingCart from "../../components/store/ShoppingCart";
import { StoreContainer } from "../../components/store/styles/StoreStyles";
import { useRouter } from "next/router";

export default function Store404() {

	const router = useRouter();

	useEffect(() => {
		const redirect = process.env.NEXT_PUBLIC_IS_STAGING == "true" || process.env.NEXT_PUBLIC_DEV == "true"
			? "/store/a7028f93-6165-4583-bdcf-0adc90827ab1"
			: "/store/fc9a9895-be05-4360-9324-240c777e1cdd";
		console.log(redirect);
		router.push(redirect);
	}, []);

	return (
		<div>
			{/* <Head>
				<title>Write In Stone - Store</title>
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

			<NavbarStone
				storeTitle={"Store Not Found"}
			/>
			<ShoppingCart />
			<StoreContainer
				productGroupList={true}
				fluid
			>
				<Col
					className="d-flex"
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<section className="text-center">
						<h1
							style={{
								fontWeight: "bold",
								letterSpacing: "-0.06em",
								color: COLORS.purple.default,
							}}
							className="my-5"
						>
							No Items.
						</h1>
						<img
							style={{ filter: "saturate(0.5)" }}
							src="./../images/PNG/EmptyProject.png"
							width="300px"
						/>
						<h5 className="my-5">No ID.</h5>
						<section
							style={{
								color: "yellow",
								background: "#666400",
								borderRadius: "10px",
								padding: "10px",
							}}
						>
							{" "}
							<p style={{ margin: 0, padding: 0 }}>Debug Data:</p>
							<p style={{ margin: 0, padding: 0 }}>
								<span style={{ opacity: 0.6 }}>User Id: </span>
								none.
							</p>
						</section>
					</section>
				</Col>
			</StoreContainer> */}
		</div>
	);
}

