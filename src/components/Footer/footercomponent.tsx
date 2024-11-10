// FooterComponent.tsx
import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';

const FooterComponent = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: 'black', color: 'white', py: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* College Information */}
        <Grid item xs={12} sm={4} textAlign="center">
          <Image
            src="/images/user/default_user.png" // Replace with your actual logo path
            alt="College logo"
            width={80}
            height={80}
          />
          <Typography variant="h6">College of Science and Technology</Typography>
          <Typography>Phuentsholing, Bhutan</Typography>
          <Typography display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ mr: 1 }} /> info.cst@rub.edu.bt
          </Typography>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', display: { xs: 'none', sm: 'block' } }} />

        {/* Maintenance Club */}
        <Grid item xs={12} sm={3} textAlign="center">
          <Typography variant="h6">Maintenance Club</Typography>
          <Typography display="flex" alignItems="center" justifyContent="center" mt={1}>
            <PhoneIcon sx={{ mr: 1 }} /> 17860605
          </Typography>
          <Typography display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ mr: 1 }} /> 02190076.cst@rub.edu.bt
          </Typography>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', display: { xs: 'none', sm: 'block' } }} />

        {/* Vocational Club */}
        <Grid item xs={12} sm={3} textAlign="center">
          <Typography variant="h6">Vocational Club</Typography>
          <Typography display="flex" alignItems="center" justifyContent="center" mt={1}>
            <PhoneIcon sx={{ mr: 1 }} /> 77243012
          </Typography>
          <Typography display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ mr: 1 }} /> 02190124.cst@rub.edu.bt
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterComponent;
