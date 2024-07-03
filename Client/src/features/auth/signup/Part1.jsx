import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import { MovieStore } from "../../../store/Movie-store";

const countries = [
  { code: "USA", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "IND", name: "India" },
  { code: "CH", name: "China" },
  { code: "JP", name: "Japan" },
  // Add more countries as needed
];

export default function Part1() {
  const [country, setCountry] = useState("");
  const { formData, setFormData } = useContext(MovieStore);

  const handleChange = (event) => {
    setCountry(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };
  return (
    <FormControl>
      <Typography variant="h6" gutterBottom>
        User Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            value={formData.name}
            autoComplete="given-name"
            variant="standard"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Email"
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            rounded
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="password"
            id="password"
            name="password"
            label="password"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={formData.password}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            label="Confirm Password"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                confirmPassword: e.target.value,
              }))
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabel id="radio-button">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            value={formData.gender}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                gender: e.target.value,
              }))
            }
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.country}
              label="Country"
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  country: e.target.value,
                }))
              }
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </FormControl>
  );
}
