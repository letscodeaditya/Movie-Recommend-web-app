import React, { useState } from "react";
import {
  Box,
  Avatar,
  Button,
  TextField,
  Typography,
  IconButton,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

const countries = [
  { code: "USA", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "IND", name: "India" },
  { code: "CH", name: "China" },
  { code: "JP", name: "Japan" },
  // Add more countries as needed
];

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    country: "",
    privacy: "",
    oldPassword: "",
    newPassword: "",
    pic: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const isUserLoggedIn = localStorage.getItem("user");
  const user = isUserLoggedIn && JSON.parse(isUserLoggedIn);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkUsernameAvailability = (username) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/check-username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.available) {
          setFormData((prevData) => ({
            ...prevData,
            username: username,
          }));
        }
        setUsernameAvailable(data.available);
      })
      .catch((error) => {
        console.error("Error checking username availability:", error);
      });
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);

    if (value.trim() !== "") {
      checkUsernameAvailability(value.trim());
    } else {
      setUsernameAvailable(null);
    }
  };

  const postDetail = (pic) => {
    setUploadingPic(true);
    if (pic === undefined) {
      setUploadingPic(false);
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dq5bhyeii");
      fetch("https://api.cloudinary.com/v1_1/dq5bhyeii/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            pic: data.url.toString(),
          }));
          setUploadingPic(false);
        })
        .catch((error) => {
          setUploadingPic(false);
        });
    } else {
      setUploadingPic(false);
      return;
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirmed) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.userId }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete account");
      }

      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message || "Failed to delete account");
      setOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.oldPassword) {
      setError("Please enter your old password");
      setOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            userId: user.userId,
            email: user.email,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();
      setLoading(false);
      setSuccess("Profile updated successfully");
      setOpen(true);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      setError(error.message || "Failed to update profile");
      setOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ mt: 14 }}></Box>
      <Box
        sx={{
          ml: { xs: 0, sm: 3, md: "250px" },
          p: 3,
          backgroundColor: "white",
          mr: { xs: 0, sm: 3, md: 5 },
          mb: 5,
          borderRadius: 5,
          minHeight: "85vh",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Avatar
            src={formData.pic || user.pic}
            sx={{ width: 100, height: 100 }}
          />
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) => postDetail(e.target.files[0])}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
        <form onSubmit={handleSubmit}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ mt: 2, justifyContent: "center" }}
            spacing={2}
          >
            <TextField
              label="Email"
              sx={{ width: { xs: "100%", sm: "50%" } }}
              defaultValue={user.email}
              margin="normal"
              disabled
            />
            <TextField
              fullWidth
              label="Change Name"
              name="name"
              defaultValue={user.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              id="username"
              fullWidth
              label="Change Username"
              helperText={
                usernameAvailable === true
                  ? "Username is available"
                  : usernameAvailable === false
                  ? "Username is not available"
                  : "Use a unique username"
              }
              error={usernameAvailable === false}
              autoComplete="off"
              defaultValue={user.username}
              onChange={handleUsernameChange}
              margin="normal"
            />
          </Stack>
          <Stack direction="row" sx={{ mt: 2 }} spacing={2}>
            <FormControl margin="normal" fullWidth>
              <InputLabel id="privacy-label">Change Privacy</InputLabel>
              <Select
                labelId="privacy-label"
                label="Change Privacy"
                name="privacy"
                defaultValue={user.privacy}
                onChange={handleChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                defaultValue={formData.country}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    country: e.target.value,
                  }))
                }
                label="Country"
                margin="normal"
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" sx={{ mt: 5 }} spacing={2}>
            <TextField
              fullWidth
              label="Old Password"
              name="oldPassword"
              type="password"
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="New Password (Enter here if you want to change your old password)"
              name="newPassword"
              type="password"
              onChange={handleChange}
              margin="normal"
            />
          </Stack>
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ mb: { xs: 2, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
              startIcon={<EditOutlinedIcon />}
              disabled={loading || uploadingPic}
            >
              {uploadingPic ? <CircularProgress size={24} /> : "Update"}
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<MdDelete />}
              onClick={handleDelete}
              disabled={loading}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {loading ? <CircularProgress size={24} /> : "Delete Account"}
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={success ? "success" : "error"}
        >
          {success || error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfilePage;
