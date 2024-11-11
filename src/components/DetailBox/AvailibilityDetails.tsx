"use client";
import React, { useEffect, useState } from "react";
import MemberRegistrationButton from "./button";
import Modal from "@/components/Modal/Modal";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useSession } from "next-auth/react";
import socket from "../../../socket";

import localFont from "next/font/local";

// Load fonts using next/font/local with a relative path
const spectral = localFont({
  src: "./Spectral-Regular.ttf",
  display: "swap",
});
const spectral2 = localFont({
  src: "./Spectral-Regular.ttf",
  display: "swap",
});

const MaintenanceClubComponent = () => {
  const { data: session } = useSession();
  const [status, setStatus] = useState(
    session?.user?.membership_request_status
  );
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (session) {
      setStatus(session.user.membership_request_status);
    }
  }, [session]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const applyForMembership = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/membership/apply", { method: "POST" });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      setStatus("pending");
      const notification = "Application submitted and pending approval.";
      alert(notification);
      setNotifications((prev) => [...prev, notification]);

      socket.emit("applyForMembership", {
        id: session?.user?.id,
        username: session?.user.name,
      });
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#f5f5f5"
      padding={4}
    >
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        className={`${spectral2.className} text-[60px] mb-8`}
      >
        We are available everyday from
      </Typography>

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
          <Typography
            variant="h5"
            color="orange"
            fontWeight="bold"
            gutterBottom
          >
            Maintenance Club
          </Typography>
          <Typography variant="body2" color="textSecondary">
            We are a team comprising electrical students offering services to
            students and the college, handling electrical fittings, new
            installations, and maintenance of older fittings.
          </Typography>
          <div className="flex justify-start items-end mt-5 m-3">
            <MemberRegistrationButton click={handleOpenModal} />
          </div>
        </CardContent>

        <CardMedia
          component="img"
          sx={{
            width: 240,
            height: 240,
            borderRadius: "4px",
            marginRight: 2,
          }}
          image="/images/service/electrical.jpg"
          alt="Maintenance Club Group"
        />
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={applyForMembership}
      />
    </Box>
  );
};

export default MaintenanceClubComponent;
