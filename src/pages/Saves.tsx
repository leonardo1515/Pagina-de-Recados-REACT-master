import React, { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import SavesMessages from "../components/messagesSaves/MessagesSaves";
import "./style.css";
import { Box } from "@mui/material";

const Saves: React.FC = () => {
  const navigate = useNavigate();
  const logeed = useAppSelector((state) => state.LogUser);
  useEffect(() => {
    if (logeed.status !== true) {
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
