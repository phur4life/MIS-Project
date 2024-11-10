"use client";
import React from "react";
import RequestForm from "@/components/RequestBox/RequestForm";
import { Container, Box, Link } from "@mui/material";
import FooterComponent from "@/components/Footer/footercomponent";
import UserHeader from "@/components/Header/UserHeader";
import RequestTable from "@/components/Tables/user/requestTable";


const RequestPage: React.FC = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <UserHeader/>

            {/* Main Content */}
            <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
                    <div className="col-span-20 xl:col-span-10">
                        <RequestTable/>
                    </div>
                </div>
            </Container>

            {/* Footer */}
            <FooterComponent />
        </Box>
    );
};

export default RequestPage;
