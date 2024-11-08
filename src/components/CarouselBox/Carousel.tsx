import React from 'react';
import { Box, Typography, Button, Chip, Card, CardContent } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Slider from 'react-slick';
import Link from 'next/link'; 
import { ServiceCardProps } from '../../../types/carousel';


// ServiceCard component, modified to receive props
const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, isFree }) => (
  <Card
    className="service-card"
    sx={{
      width: 300,
      height: 400, // Set a fixed height for uniformity
      borderRadius: 2,
      boxShadow: 3,
      mx: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column', // Stack content vertically
    }}
  >
    <Box sx={{ bgcolor: 'orange', height: 100, position: 'relative' }}>
      {isFree && (
        <Chip label="Free" color="error" size="small" sx={{ position: 'absolute', top: 8, left: 8 }} />
      )}
    </Box>
    <CardContent sx={{ textAlign: 'center', flex: 1 }}> {/* Use flex to fill space */}
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
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
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 5, px: 5 }}>
        <Typography variant="h6" color="white">
          Services for you
        </Typography>
        <Link href="/components/DetailBox/viewmore" passHref>
          <Typography variant="body2" color="orange" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
            View more
          </Typography>
        </Link>
      </Box>
      
      <Slider {...settings} className="carousel-slider">
        <ServiceCard title="Blub Fixing" description="We focus on ergonomics and meeting you where you work. It's only a keystroke away." isFree={true} />
        <ServiceCard title="Another Service" description="Description of another service." isFree={false} />
        <ServiceCard title="Yet Another Service" description="More details about this service." isFree={true} />
        <ServiceCard title="Service 4" description="Some description for service 4." isFree={false} />
        <ServiceCard title="Service 5" description="Details for service 5." isFree={true} />
      </Slider>
    </Box>
  );
};

export default Carousel;
