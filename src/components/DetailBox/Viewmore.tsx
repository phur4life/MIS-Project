"use client";
import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import RequestForm from "../RequestBox/RequestForm";

// Type for InfoCard component props
interface InfoCardProps {
  title: string;
  content: string;
  date: string;
  onRequestService: () => void; // Ensure this is part of the props
}

// Sample data for cards
const cardData = [
  { title: "Fixing Bulb", content: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.", date: "22 April 2021", isFree: true },
  { title: "Fixing Fan", content: "Enhance productivity by optimizing workspace setup. Comfort is just a step away.", date: "15 March 2021", isFree: false },
  { title: "Service 3", content: "Providing smart solutions tailored to your needs, efficiently and effectively.", date: "10 February 2021", isFree: true },
  { title: "Service 4", content: "Solutions that adapt to your unique work habits, giving you the freedom to excel.", date: "5 January 2021", isFree: false },
  { title: "Service 5", content: "Tools designed for modern workflows, keeping you at the forefront of innovation.", date: "12 December 2020", isFree: true },
  { title: "Service 6", content: "Maximize output while reducing stress with our ergonomic tools.", date: "1 November 2020", isFree: false }
];

// InfoCard component
const InfoCard: React.FC<InfoCardProps> = ({ title, content, date, onRequestService }) => (
  <Card
    sx={{
      width: 300,
      height: 400,
      borderRadius: 2,
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}

    
  >
    <Box sx={{ bgcolor: 'orange', height: 100 }} />
    <CardContent sx={{ textAlign: 'center', flex: 1 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {content}
      </Typography>
    </CardContent>
    <Button
      variant="contained"
      color="warning"
      sx={{ borderRadius: 2, m: 2 }}
      startIcon={<ArrowForwardIcon />}
      onClick={onRequestService} // Open request form on click
    >
      Get Service
    </Button>
    <IconButton
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'orange',
      }}
    >
      <CloseIcon />
    </IconButton>
  </Card>
);

// Main CardGrid component with a container card and dialog for request form
const CardGrid = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Open and close dialog handlers
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ bgcolor: '#F5F5F5', py: 4 }}>
      <Card sx={{ p: 4, maxWidth: 1000, mx: 'auto', boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Available Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item key={index}>
              <InfoCard
                title={card.title}
                content={card.content}
                date={card.date}
                onRequestService={handleOpenDialog} // Pass dialog open handler
              />
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Dialog for Request Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Request Service</DialogTitle>
        <DialogContent>
          <RequestForm onSubmit={handleCloseDialog} onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CardGrid;
