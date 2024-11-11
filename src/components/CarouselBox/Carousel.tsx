"use client";
import React, { useState } from "react";
import {
	Box,
	Typography,
	Button,
	Chip,
	Card,
	CardContent,
	Dialog,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Slider from "react-slick";
import Link from "next/link";
import { ServiceCardProps } from "../../../types/carousel";
import RequestForm from "../RequestBox/RequestForm";
import localFont from "next/font/local";
import zIndex from "@mui/material/styles/zIndex";

const spectral = localFont({
	src: "./Spectral-Medium.ttf",
});

// ServiceCard component, modified to trigger a popup for the request form
const ServiceCard: React.FC<ServiceCardProps> = ({
	title,
	description,
	isFree,
}) => {
	const [openDialog, setOpenDialog] = useState(false);

	// Open the dialog to show the request form
	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	// Close the dialog
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	return (
		<>
			<Card
				className="service-card"
				sx={{
					width: 350,
					height: 400,
					borderRadius: 2,
					boxShadow: 3,
					mx: 1,
					overflow: "hidden",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<img
					src="/images/product/fan.png" // Replace with your image URL
					alt={title} // Optional: Alt text for accessibility
					style={{
						width: "100%",
						height: 280,
						objectFit: "cover", // Ensures the image fits well in the container
					}}
					className="p-4"
				/>
				{isFree && (
					<Chip
						label="Free"
						color="error"
						size="small"
						sx={{ position: "absolute", top: 4, left: 8 }}
					/>
				)}

				<CardContent sx={{ textAlign: "center", flex: 1 }}>
					<Typography
						variant="h6"
						color="textPrimary"
						gutterBottom
						className="text-xl font-medium"
					>
						{title}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{description}
					</Typography>
				</CardContent>
				<Box sx={{ textAlign: "center", pb: 2 }}>
					<Button
						variant="contained"
						color="warning"
						startIcon={<ShoppingCartIcon />}
						sx={{ borderRadius: 2, mt: 1 }}
						onClick={handleOpenDialog} // Open dialog on click
					>
						Get Service
					</Button>
				</Box>
			</Card>

			{/* Dialog for the Request Form */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>Request Service</DialogTitle>
				<DialogContent>
					<RequestForm
						onSubmit={function (): void {
							throw new Error("Function not implemented.");
						}}
						onClose={function (): void {
							throw new Error("Function not implemented.");
						}}
					/>{" "}
					{/* Render the request form inside the dialog */}
				</DialogContent>
			</Dialog>
		</>
	);
};

const Carousel = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Box
			className="carousel-container bg-gray-800 "
			sx={{ px: 4, height: "580px", zIndex: 0 }}
		>
			<h2
				className={`text-white ${spectral.className} text-[60px] font-spectral py-4 text-center w-full`}
			>
				Solution to Broken Dreams and Appliances
			</h2>
			<Box
				className=""
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				sx={{ px: 5 }}
			>
				{/* Link to View More Page */}
				{/* <Link href="" passHref>
					<Button
						variant="text"
						color="warning"
						sx={{ cursor: "pointer", textDecoration: "underline" }}
					>
						View more
					</Button>
				</Link> */}
			</Box>

			<Slider {...settings} className="carousel-slider">
				<ServiceCard
					title="Blub Fixing"
					description="We focus on ergonomics and meeting you where you work. It's only a keystroke away."
					isFree={true}
				/>
				<ServiceCard
					title="Another Service"
					description="Description of another service."
					isFree={false}
				/>
				<ServiceCard
					title="Yet Another Service"
					description="More details about this service."
					isFree={true}
				/>
				<ServiceCard
					title="Service 4"
					description="Some description for service 4."
					isFree={false}
				/>
				<ServiceCard
					title="Service 5"
					description="Details for service 5."
					isFree={true}
				/>
			</Slider>
		</Box>
	);
};

export default Carousel;
