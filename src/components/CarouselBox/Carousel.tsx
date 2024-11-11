"use client";
import React, { useState, useEffect } from "react";
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
import axios from "axios";

// Load local font
const spectral = localFont({
  src: "./Spectral-Medium.ttf",
});

// ServiceCard component with independent dialog state
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  isFree,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  // Open and close dialog functions
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

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
          alt={title} // Alt text for accessibility
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
            className={`text-xl font-medium ${spectral.className}`}
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
            onSubmit={() => {
              // Add your form submission logic here
              handleCloseDialog();
            }}
            onClose={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

interface Service {
  id: string;
  title: string;
  description: string;
  isFree: boolean;
}

const Carousel = () => {
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch inventory data
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/services"); // Adjust this endpoint as needed
        setServiceData(response.data.services || []); // Ensure we are setting an empty array if no data
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

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
      className="carousel-container"
      sx={{ bgcolor: "#212533", py: 4, px: 4 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 5, px: 5 }}
      >
        <Typography variant="h6" color="white" className={spectral.className}>
          Services for you
        </Typography>

        {/* Link to View More Page */}
        <Link href="/more-services" passHref>
          <Button
            variant="text"
            color="warning"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            View more
          </Button>
        </Link>
      </Box>

      {/* Show loading, error, or carousel data */}
      {loading ? (
        <Typography color="white" textAlign="center">
          Loading services...
        </Typography>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <Slider {...settings} className="carousel-slider">
          {serviceData.map((data) => (
            <ServiceCard
              key={data.id}
              title={data.title}
              description={data.description}
              isFree={data.isFree}
            />
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default Carousel;
