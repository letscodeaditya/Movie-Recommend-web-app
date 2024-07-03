import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import { MovieStore } from "../../../store/Movie-store";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const steps = ["User Detail", "User Profile", "Victory Lap"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Part1 />;
    case 1:
      return <Part2 />;
    case 2:
      return <Part3 />;
    default:
      throw new Error("Unknown step");
  }
}

const SignUp = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { formData, setFormData } = React.useContext(MovieStore);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreateAccount = () => {
    if (formData.password !== formData.confirmPassword) {
      setShowAlert(true);
      setAlertMessage("Passwords do not match.");
      return;
    }

    fetch(`${process.env.API_BASE_URL}/api/user/reg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || "Network response was not ok");
          });
        }
        return res.json();
      })
      .then((data) => {
        setActiveStep(activeStep + 1);
        setShowAlert(true);
        setAlertMessage("Account created successfully!");
        setFormData(null);
      })
      .catch((error) => {
        console.log(formData);
        console.error("Error creating account:", error);
        setShowAlert(true);
        setAlertMessage(
          error.message || "Failed to create account. Please try again."
        );
      });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <>
      <Box sx={{ height: "50px" }}></Box>
      <Container component="main" maxWidth="sm" sx={{ mb: 5 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            borderRadius: "50px",
            bgcolor: "white",
          }}
        >
          <Typography component="h1" variant="h4" align="center">
            Sign-Up
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Successful
              </Typography>
              <Typography variant="subtitle1">
                Your account is created. Please login using your credentials.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1
                      ? handleCreateAccount
                      : handleNext
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Create Account" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="success"
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SignUp;
