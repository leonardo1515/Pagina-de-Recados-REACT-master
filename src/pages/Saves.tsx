import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SavesMessages from "../components/messagesSaves/MessagesSaves";
import { Box } from "@mui/material";
import "./style.css";

const Saves: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logged = sessionStorage.getItem("looged");
    if (!logged) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SavesMessages />
    </Box>
  );
};

export default Saves;
