import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMessags from "../components/message/Messages";

const Settings: React.FC = () => {
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
      <PageMessags></PageMessags>
    </Box>
  );
};

export default Settings;
