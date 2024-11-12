"use client";
import { useEffect, useState } from "react";
import axios from "axios";
// import DefaultLayout from "@/components/Layout/DefaultLayout";
import Layout from "@/components/Layout1/Layout";
import Cart from "@/components/Cart/Cart";
import AddForm from "@/components/Cart/AddForm";

interface serviceData {
	_id: string;
	serviceName: string;
	description: string;
	image: string;
}

const Service = () => {
	const [services, setServices] = useState<serviceData[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);

	// Data fetching (read)
	useEffect(() => {
		const fetchServices = async () => {
			try {
				const res = await axios.get("/api/services"); // Adjust endpoint as needed
				setServices(res.data.services || []); // Ensure services is an array
			} catch (error) {
				console.error("Error fetching services:", error);
			}
		};

		fetchServices();
	}, []);

	const handleItemAdd = async (newItem: serviceData) => {
		try {
			const res = await fetch("/api/services", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newItem),
			});

			if (res.ok) {
				// Update the service list by refetching or manually updating
				setServices((prevServices) => [...prevServices, newItem]);
				setIsModalOpen(false); // Close the modal on success
			}
		} catch (err) {
			console.error("Error:", err);
		}
	};

	const handleDelete = async (id: string) => {
		//console.log(id);
		try {
			const res = await fetch(`/api/services/${id}`, {
				method: "DELETE",
			});

			if (res.ok) {
				const updatedServices = services.filter(
					(service) => service._id !== id
				);
				setServices(updatedServices);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleSaveEdit = async (updateditem: serviceData) => {
		console.log(updateditem);
		try {
			const res = await fetch(`/api/services/${updateditem._id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updateditem),
			});

			if (res.ok) {
				const editedData = await res.json();
				const updatedServices = services.map((service) =>
					service._id === updateditem._id ? editedData.updatedService : service
				);
				console.log(editedData);
				setServices(updatedServices);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Layout>
			<div>
				<div className="flex justify-end mb-3">
				</div>
				<div>
					<Cart
						services={services}
						onDelete={handleDelete}
						onSaveEdit={handleSaveEdit}
					/>
				</div>
				{isModalOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<AddForm
							handleItemAdd={handleItemAdd}
							closeModal={() => setIsModalOpen(false)}
						/>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Service;
