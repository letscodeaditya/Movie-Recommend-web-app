import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
  FaCode,
  FaReact,
  FaNodeJs,
  FaGithubSquare,
  FaLinkedin,
} from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { BiLogoMongodb } from "react-icons/bi";
import { SiExpress } from "react-icons/si";

const images = [
  {
    url: "/image/project.png",
    title: "Projects",
    width: "35%",
    link: "https://github.com/letscodeaditya?tab=repositories",
  },
  {
    url: "/image/network.jpeg",
    title: "Contact",
    width: "30%",
    link: "https://www.linkedin.com/in/aditya-ayush-a76a81271",
  },
  {
    url: "/image/resume.jpg",
    title: "Resume",
    width: "35%",
    link: "https://drive.google.com/drive/folders/158EM-HmtuhpjNCv-0B-dLjp8yibSyXy7?usp=sharing",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const AboutUs = () => {
  const [openA, setOpenA] = useState(true);
  const [openB, setOpenB] = useState(false);

  const handleClick = () => {
    setOpenA(!openA);
  };
  const handleClick2 = () => {
    setOpenB(!openB);
  };

  return (
    <Container>
      <Box sx={{ height: "15vh" }}></Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            ABOUT&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: "red",
              }}
            >
              ME
            </Typography>
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            height: { xs: "30vh", sm: "40vh", md: "50vh" }, // Responsive height based on breakpoints
            width: { xs: "90vw", sm: "50vw", md: "25vw" }, // Responsive width based on breakpoints
            backgroundColor: "#232526",
            border: "solid black 5px",
            borderRadius: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Center the Avatar vertically
            marginBottom: { xs: "20px", md: "0" }, // Adjust margin for responsiveness
            marginRight: { xs: "0", md: "20px" }, // Adjust margin for responsiveness
          }}
        >
          <Stack alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src="/image/newimage.jpg"
              sx={{
                width: { xs: "50px", sm: "100px", md: "150px" },
                height: { xs: "50px", sm: "100px", md: "150px" },
              }} // Responsive size of the Avatar based on breakpoints
            />
            <Stack
              sx={{ display: "flex", flexDirection: "row", marginTop: "5px" }}
            >
              <IconButton
                aria-label="github"
                size="large"
                color="inherit"
                onClick={() => {
                  window.location.href =
                    "https://github.com/letscodeaditya/Movie-Recommend-web-app";
                }}
              >
                <FaGithubSquare color="white" style={{ fontSize: "40px" }} />
              </IconButton>
              <IconButton
                aria-label="linkedin"
                size="large"
                color="primary"
                onClick={() => {
                  window.location.href =
                    "https://www.linkedin.com/in/aditya-ayush-a76a81271";
                }}
              >
                <FaLinkedin color="primary" style={{ fontSize: "40px" }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            height: { xs: "auto", sm: "auto", md: "70vh" }, // Responsive height based on breakpoints
            width: { xs: "90vw", sm: "90vw", md: "70vw" }, // Responsive width based on breakpoints
            backgroundColor: "#232526",
            border: "solid black 5px",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Center the content vertically
            textAlign: "center", // Center text horizontally
            padding: "10px",
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              textDecorationColor: "white",
              textAlign: "center", // Center text horizontally within the Stack
            }}
          >
            <Typography
              variant="body1"
              paragraph
              sx={{
                color: "white",
                fontSize: { xs: "1rem", sm: "1.5rem" }, // Adjust font size based on breakpoints
              }}
            >
              <strong style={{ color: "black", fontSize: "3rem" }}>"</strong>Hi,
              I'm <strong>Aditya Ayush</strong>. I'm a passionate developer with
              a keen interest in building web applications. This project is my
              React movie recommendation web app, built using React,
              Material-UI, Bootstrap, Node.JS and MongoDB .
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: "white", fontSize: { xs: "1rem", sm: "1.5rem" } }} // Adjust font size based on breakpoints
            >
              I have experience working with various technologies and
              frameworks, including Spring Boot, Firebase, PHP, MYSQL, and more.
              I enjoy learning new things and constantly improving my skills.
              <strong style={{ color: "black", fontSize: "3rem" }}>"</strong>
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "100px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marginBottom: "100px",
            marginRight: { xs: "0", md: "100px" }, // Responsive margin based on breakpoints
            width: { xs: "90vw", sm: "70vw", md: "20vw" }, // Responsive width based on breakpoints
            border: "5px solid black",
            overflow: "hidden", // Allow text to scroll if it exceeds box dimensions
          }}
        >
          <List
            sx={{ width: "100%", height: "100%", bgcolor: "#232526" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ bgcolor: "#232526", color: "purple", fontSize: "20px" }}
              >
                Skills
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon sx={{ fontSize: "30px" }}>
                <FaCode />
              </ListItemIcon>
              <ListItemText primary="FrontEnd" />
              {openA ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openA} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ fontSize: "20px" }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FaReact />
                  </ListItemIcon>
                  <ListItemText
                    primary="React"
                    sx={{ color: "#3f51b5", marginLeft: "-20px" }}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <MdDesignServices />
                  </ListItemIcon>
                  <ListItemText
                    primary="Material-UI + Bootstrap"
                    sx={{ color: "#3f51b5", marginLeft: "-20px" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClick2}>
              <ListItemIcon sx={{ fontSize: "30px" }}>
                <FaCode />
              </ListItemIcon>
              <ListItemText primary="BackEnd" />
              {openB ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openB} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FaNodeJs />
                  </ListItemIcon>
                  <ListItemText
                    primary="Node.JS"
                    sx={{ color: "#4caf50", marginLeft: "-20px" }}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BiLogoMongodb />
                  </ListItemIcon>
                  <ListItemText
                    primary="MongoDB"
                    sx={{ color: "#4caf50", marginLeft: "-20px" }}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SiExpress />
                  </ListItemIcon>
                  <ListItemText
                    primary="Express"
                    sx={{ color: "#4caf50", marginLeft: "-20px" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            marginBottom: "50px",
            marginRight: "120px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              height: "80%",
              width: "100%",
            }}
          >
            {images.map((image) => (
              <ImageButton
                focusRipple
                key={image.title}
                onClick={() => {
                  window.location.href = image.link;
                }}
                style={{
                  width: image.width,
                }}
              >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
