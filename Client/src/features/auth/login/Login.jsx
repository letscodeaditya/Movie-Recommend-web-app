import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { MovieStore } from "../../../store/Movie-store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

const Login = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const { setUserData, setUserLogged } = React.useContext(MovieStore);
  const nav = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/auth/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      setAlertMessage("Login successful!");
      setAlertSeverity("success");
      setAlertOpen(true);
      setUserLogged(true);
      localStorage.setItem("user", JSON.stringify(data.user));
      setOpen(false);
      nav("/home/profile");
    } catch (error) {
      setAlertMessage(error.message);
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Login</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              type="email"
              label="Email"
              fullWidth
              margin="normal"
              required
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>
          </form>
          <hr />
          <Typography variant="h8" gutterBottom>
            don't have a account?
          </Typography>
          <Button
            type="submit"
            color="error"
            onClick={() => {
              nav("/signup");
              handleClose();
            }}
          >
            create account!!
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Login;
