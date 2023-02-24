import React, { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import PageMessags from "../components/message/Messages";
import { Box } from "@mui/material";

const Messags: React.FC = () => {
  const navigate = useNavigate();
  const logeed = useAppSelector((state) => state.LogUser);
  const jumpPage = () => {
    if (logeed.status === false) {
      navigate("/");
    }
  };
  useEffect(() => {
    setTimeout(jumpPage, 1000);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PageMessags />
    </Box>
  );
};

export default Messags;
