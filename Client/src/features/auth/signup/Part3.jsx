import React, { useContext, useState } from "react";
import { MovieStore } from "../../../store/Movie-store";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export default function Part3() {
  const { formData, setFormData } = useContext(MovieStore);
  const handleThemeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      theme: e.target.value,
    }));
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Almost there !!
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            1. do you want your details to be visible to others
          </Typography>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={formData.privacy}
            name="radio-buttons-group"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                privacy: e.target.value,
              }))
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio defaultChecked />}
              label="yes"
            />
            <FormControlLabel control={<Radio />} label="no" value="no" />
          </RadioGroup>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            2. Select the theme
          </Typography>

          <RadioGroup
            aria-label="theme"
            name="theme"
            value={formData.theme}
            onChange={handleThemeChange}
          >
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            <FormControlLabel
              value="light"
              control={<Radio />}
              label="Light (coming soon)"
              disabled
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  );
}
