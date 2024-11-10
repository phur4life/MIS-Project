"use client";
import React from "react";
import { Container, Box, Link, Grid } from "@mui/material";
import FooterComponent from "@/components/Footer/footercomponent";
import ChartFour from "@/components/Charts/ChartFour";
import ChartOne from "@/components/Charts/ChartOne";
import ChartThree from "@/components/Charts/ChartThree";
import ChartTwo from "@/components/Charts/ChartTwo";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import UserHeader from "@/components/Header/UserHeader";

const StatictisPage: React.FC = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <UserHeader/>

            {/* Main Content */}
            <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
    {/* Top Stats Row */}
    <div className="flex flex-col gap-6">
        <div>
          <DataStatsOne />
        </div>
        </div>
    {/* Charts Section */}
    <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6} lg={6}>
            <Box mb={4}>
                <ChartOne /> {/* Inventory Bar Chart */}
            </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6} lg={6}>
            <Box mb={4}>
                <ChartTwo /> {/* Activity Line Chart */}
            </Box>
        </Grid>

        {/* Bottom Left - Donut Chart */}
        <Grid item xs={12} md={6} lg={6}>
            <Box>
                <ChartThree /> {/* Member Distribution Donut Chart */}
            </Box>
        </Grid>

        {/* Bottom Right - Horizontal Bar Chart */}
        <Grid item xs={12} md={6} lg={6}>
            <Box>
                <ChartFour /> {/* Requests by Hostel Block Horizontal Bar Chart */}
            </Box>
        </Grid>
    </Grid>
</Container>

 {/* Footer */}
 <FooterComponent />
        </Box>
    );
};

export default StatictisPage;
