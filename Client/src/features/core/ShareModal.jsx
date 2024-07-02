import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";

const ShareModal = ({ open, handleClose, url }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Share this page
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            mb: 2,
            p: 1,
            border: "1px solid #ccc",
            borderRadius: 1,
          }}
        >
          <InputBase value={url} fullWidth inputProps={{ readOnly: true }} />
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <IconButton
            component="a"
            href={`https://web.whatsapp.com/?text=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon fontSize="large" color="success" />
          </IconButton>
          <IconButton
            component="a"
            href={`https://www.instagram.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon fontSize="large" color="secondary" />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShareModal;
