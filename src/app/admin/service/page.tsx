"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Cart from "@/components/Cart/Cart";

const Service = () => {
  const [services, setServices] = useState([]);

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

  return (
    <DefaultLayout>
      <div>
        <Cart services={services} />
      </div>
    </DefaultLayout>
  );
};

export default Service;
