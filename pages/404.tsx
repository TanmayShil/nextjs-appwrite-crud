import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import animationData from "@/json/lottie/404.json";
import { Box, Button, Typography } from "@mui/material";

const Lottie = dynamic(() => import("lottie-react"));



const Index = () => (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9fafb",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 400, width: "100%" }}>
        <Lottie
          animationData={animationData}
          loop
          style={{ height: 300, width: 300, margin: "0 auto" }}
        />
      </Box>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        Oops! Page Not Found
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>

      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Back to Home
        </Button>
      </Link>
    </Box>
);

export default Index;