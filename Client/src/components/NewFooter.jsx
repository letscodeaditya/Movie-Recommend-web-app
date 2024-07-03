import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";

const logoStyle = {
  width: "140px",
  height: "auto",
};

export default function NewFooter() {
  return (
    <Box
      sx={{
        bgcolor: "red",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 5, sm: 1 },
        textAlign: { sm: "center", md: "left" },
        bottom: 0, // Align the footer to the bottom
        left: 0, // Ensure the footer starts from the left edge
        zIndex: 1000, // Adjust zIndex as needed to ensure visibility over other content
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "90%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Button display="inline" sx={{ mr: "10px", color: "black" }} href="/">
            Home
          </Button>
          <Button
            display="inline"
            sx={{ mr: "10px", color: "black" }}
            href="/about"
          >
            About us
          </Button>
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text",
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/letscodeaditya"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            color="inherit"
            href="https://www.linkedin.com/in/aditya-ayush-a76a81271"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
