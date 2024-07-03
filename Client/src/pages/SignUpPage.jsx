import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import SignUp from "../features/auth/signup/SignUp";

export const SignUpPage = () => {
  return (
    <>
      <Box sx={{ height: "60px" }}></Box>
      <Container>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                backgroundImage: 'url("/image/bat1.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "16px",
                boxShadow: 3,
                border: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <SignUp />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
