import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { MovieStore } from "../../../store/Movie-store";
import { MdDelete } from "react-icons/md";

export default function Part2() {
  const [loading, setLoading] = useState(false);
  const { formData, setFormData } = useContext(MovieStore);
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  useEffect(() => {
    const savedFile = localStorage.getItem("uploadedFile");
    const savedFileUrl = localStorage.getItem("uploadedFileUrl");
    if (savedFile && savedFileUrl) {
      setFormData({ ...formData, file: savedFile, pic: savedFileUrl });
    }
  }, []);

  const postDetail = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      setLoading(false);
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
          localStorage.setItem("uploadedFileUrl", data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      return;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    setFormData((prevData) => ({
      ...prevData,
      file: fileUrl,
    }));
    localStorage.setItem("uploadedFile", fileUrl);
    postDetail(file);
  };

  const clearImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      file: null,
      pic: null,
    }));
    localStorage.removeItem("uploadedFile");
    localStorage.removeItem("uploadedFileUrl");
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

    setFormData((prevData) => ({
      ...prevData,
      username: value,
    }));

    if (value.trim() !== "") {
      checkUsernameAvailability(value.trim());
    } else {
      setUsernameAvailable(null);
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        User Profile
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="username"
            fullWidth
            label="Create a Username"
            helperText={
              usernameAvailable === true
                ? "Username is available"
                : usernameAvailable === false
                ? "Username is not available"
                : "Use a unique username"
            }
            error={usernameAvailable === false}
            autoComplete="off"
            value={formData.username}
            onChange={handleUsernameChange}
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant="h6">Upload Profile Pic</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            type="file"
            id="img"
            label=""
            fullWidth
            disabled={loading}
            onChange={handleFileChange}
            helperText="You can skip this and do it later"
          />
          {loading && <CircularProgress size={24} />}
        </Grid>

        <Grid item xs={12} md={6}>
          {formData.pic && (
            <div>
              <img
                src={formData.pic}
                alt="Uploaded"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <Button
                color="error"
                onClick={clearImage}
                sx={{ marginTop: "10px", margin: "10px", fontSize: "30px" }}
              >
                <MdDelete />
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
