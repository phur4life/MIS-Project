"use client";

import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Typography,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
} from "@mui/material";

interface RequestFormProps {
	onSubmit: () => void; // Callback for form submission to trigger the confirmation dialog
	onClose: () => void; // Callback for form close to handle dialog close from parent
	selectedService: {
		title: string;
		description: string;
		id: string;
	};
}

const RequestForm: React.FC<RequestFormProps> = ({
	onSubmit,
	onClose,
	selectedService,
}) => {
	const [blockNumber, setBlockNumber] = useState("HB");
	const [roomNumber, setRoomNumber] = useState("202");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const requestData = {
			serviceId: selectedService.id,
			description: description,
			phoneNumber: phoneNumber,
			blockNumber: blockNumber,
			roomNumber: roomNumber,
		};

		try {
			const response = await fetch("/api/request", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			const result = await response.json();
			console.log(result);

			if (response.ok) {
				console.log("Request submitted successfully:", result);
				onSubmit(); // Trigger the confirmation dialog
			} else {
				console.error("Failed to submit request:", result.error);
			}
		} catch (error) {
			console.error("Error submitting request:", error);
		}
		onSubmit(); // Trigger the confirmation dialog
	};

	//console.log("selected", selectedService);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			bgcolor="background.default"
			p={2}
		>
			<Box
				component="form"
				onSubmit={handleSubmit}
				bgcolor="white"
				p={4}
				borderRadius={2}
				boxShadow={3}
				maxWidth={500}
				width="100%"
			>
				<Typography variant="h5" textAlign="center" fontWeight="bold" mb={4}>
					Request Form
				</Typography>

				<FormControl fullWidth margin="normal" variant="outlined">
					<InputLabel>Block Number</InputLabel>
					<Select
						value={blockNumber}
						onChange={(e) => setBlockNumber(e.target.value)}
						label="Block Number"
					>
						<MenuItem value="HA">Hostel A</MenuItem>
						<MenuItem value="HB">Hostel B</MenuItem>
						<MenuItem value="RK">Hostel RK</MenuItem>
						<MenuItem value="NK">Hostel NK</MenuItem>
						<MenuItem value="HE">Hosel E</MenuItem>
					</Select>
				</FormControl>

				<FormControl fullWidth margin="normal" variant="outlined">
					<InputLabel>Room Number</InputLabel>
					<Select
						value={roomNumber}
						onChange={(e) => setRoomNumber(e.target.value)}
						label="Room Number"
					>
						<MenuItem value="201">201</MenuItem>
						<MenuItem value="202">202</MenuItem>
						<MenuItem value="203">203</MenuItem>
						<MenuItem value="204">204</MenuItem>
						<MenuItem value="205">205</MenuItem>
						<MenuItem value="206">206</MenuItem>
						<MenuItem value="207">207</MenuItem>
						<MenuItem value="208">208</MenuItem>
						<MenuItem value="209">209</MenuItem>
						<MenuItem value="210">210</MenuItem>
					</Select>
				</FormControl>

				<Box display="flex" alignItems="center" mb={3}>
					<FormControl variant="outlined" sx={{ mr: 1, flex: "0 0 100px" }}>
						<Select defaultValue="+370">
							<MenuItem value="+975">+975</MenuItem>
						</Select>
					</FormControl>
					<TextField
						fullWidth
						label="Phone Number"
						variant="outlined"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
						inputProps={{ pattern: "[0-9]*", inputMode: "numeric" }}
					/>
				</Box>

				<TextField
					fullWidth
					label="Description"
					variant="outlined"
					multiline
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					margin="normal"
				/>

				<Box display="flex" justifyContent="space-between" mt={3}>
					<Button
						type="submit"
						variant="contained"
						sx={{ bgcolor: "#FFA500", color: "white" }}
					>
						Submit
					</Button>
					<Button variant="outlined" onClick={onClose}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default RequestForm;
