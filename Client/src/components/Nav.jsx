import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/system/Box";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";

import { useContext } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MovieStore } from "../store/Movie-store";
import Login from "../features/auth/login/Login";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);

  const { userLogged, userData, handleSearch } = useContext(MovieStore);
  const nav = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget);
    setProfileMenuOpen(true);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    // Example: Clear user session, redirect, etc.
    handleProfileMenuClose();
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "main"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <BiCameraMovie fontSize={"5vh"} />
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => nav("/")}
                >
                  <Typography variant="body2" color="text.primary.light">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => {
                    nav("/movies");
                  }}
                >
                  <Typography variant="body2" color="red">
                    Movies
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => nav("/series")}
                >
                  <Typography variant="body2" color="text.primary.light">
                    Tv series
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => nav("/about")}
                >
                  <Typography variant="body2" color="text.primary.light">
                    About
                  </Typography>
                </MenuItem>
              </Box>
            </Box>

            {/* search box */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Search sx={{ borderRadius: "50px" }} onKeyDown={handleSearch}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </form>

            {userLogged ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={toggleProfileMenu} size="small">
                  {userData && userData.Pic ? (
                    <Avatar alt="User Avatar" src={userData.Pic} />
                  ) : (
                    <Avatar>{userData && userData.name.charAt(0)}</Avatar>
                  )}
                </IconButton>
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={profileMenuOpen}
                  onClose={handleProfileMenuClose}
                  onClick={handleProfileMenuClose}
                >
                  <MenuItem onClick={() => nav("/profile")}>Profile</MenuItem>
                  <MenuItem onClick={() => nav("/wishlist")}>Wishlist</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <Login />
                <Button
                  onClick={() => {
                    nav("/signup");
                  }}
                >
                  SignUp
                </Button>
              </Box>
            )}

            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  ></Box>
                  <MenuItem onClick={() => nav("/")}>home</MenuItem>
                  <MenuItem onClick={() => nav("/movies")}>movies</MenuItem>
                  <MenuItem onClick={() => nav("/series")}>tv-series</MenuItem>
                  <MenuItem onClick={() => nav("/about")}>about</MenuItem>

                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Login
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
