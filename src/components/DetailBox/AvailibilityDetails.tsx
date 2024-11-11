import React from "react";
import MemberRegistrationButton from "./button";
import {
	Box,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Grid,
} from "@mui/material";

const MaintenanceClubComponent = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			bgcolor="#f5f5f5"
			padding={4}
		>
			{/* Availability Text */}
			<Typography
				variant="body1"
				align="center"
				color="textSecondary"
				className={`${spectral2.className} text-[60px] mb-8`}
			>
				We are available everyday from
			</Typography>

			{/* Time and Days */}
			<Typography
				variant="h4"
				align="center"
				fontWeight="bold"
				gutterBottom
				className={`${spectral.className} text-[80px] text-orange-600`}
			>
				8 PM - 10 PM
			</Typography>
			<Typography
				variant="body1"
				align="center"
				color="textSecondary"
				className={`${spectral2.className} text-[70px]`}
			>
				Mon - Sat
			</Typography>

			{/* Card Section */}
			<Card
				sx={{
					display: "flex",
					alignItems: "center",
					bgcolor: "#ffffff",
					borderRadius: 4,
					maxWidth: 800,
					marginTop: 4,
				}}
			>
				<CardContent sx={{ flex: 1, padding: 3 }}>
					{/* Maintenance Club Text */}
					<Typography
						variant="h5"
						color="orange"
						fontWeight="bold"
						gutterBottom
					>
						Maintenance Club
					</Typography>
					<Typography variant="body2" color="textSecondary">
						we are a team comprising of electrical students functioning as a
						club that offer services to students and college by dealing with the
						problems related to electrical fittings, newer installations and
						maintenance of the older fittings
					</Typography>
					<div className="flex justify-end items-end mt-5 m-3">
						<MemberRegistrationButton />
					</div>
				</CardContent>

				{/* Image Section */}
				<CardMedia
					component="img"
					sx={{
						width: 240,
						height: 240,
						borderRadius: "4px",
						marginRight: 2,
					}}
					image="images/logo/logo.png" // Replace with the actual image path
					alt="Maintenance Club Group"
				/>
			</Card>
		</Box>
	);
};

export default MaintenanceClubComponent;
