import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { Box, Typography, Button, Chip, Card, CardContent } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Slider from 'react-slick';

const ServiceCard = () => (
  <Card
    className="service-card"
    sx={{
      width: 280,
      borderRadius: 2,
      boxShadow: 3,
      mx: 1,
      overflow: 'hidden',
    }}
  >
    <Box sx={{ bgcolor: 'orange', height: 100, position: 'relative' }}>
      <Chip label="Free" color="error" size="small" sx={{ position: 'absolute', top: 8, left: 8 }} />
    </Box>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        Blub Fixing
      </Typography>
      <Typography variant="body2" color="textSecondary">
        We focus on ergonomics and meeting you where you work. It's only a keystroke away.
      </Typography>
    </CardContent>
    <Box sx={{ textAlign: 'center', pb: 2 }}>
      <Button variant="contained" color="warning" startIcon={<ShoppingCartIcon />} sx={{ borderRadius: 2, mt: 1 }}>
        Get Service
      </Button>
    </Box>
  </Card>
);

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
    <Box className="carousel-container" sx={{ bgcolor: '#212533', py: 4, px: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2, px: 2 }}>
        <Typography variant="h6" color="white">
          Services for you
        </Typography>
        <Typography variant="body2" color="orange" sx={{ cursor: 'pointer' }}>
          View more
        </Typography>
      </Box>
      
      <Slider {...settings} className="carousel-slider">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </Slider>
    </Box>
  );
};

export default Carousel;
