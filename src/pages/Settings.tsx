import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMessags from "../components/message/Messages";
// import { useAppSelector } from "../store/hooks";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  // const logeed = useAppSelector((state) => state.LogUser);
  // const jumpPage = () => {
  //   if (logeed.status === false) {
  //     navigate("/");
  //   }
  // };
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
