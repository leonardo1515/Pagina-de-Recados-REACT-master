import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PositionedMenu from "../menu/Menu";
import { ShowMessagesProps } from "../TypesComponents/index";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoffUser } from "../../store/modules/LogSlice";
import "./style.css";

const HeaderDefalt: React.FC<ShowMessagesProps> = ({
  title,
  subTitle,
  goMessages,
  goSaves,
}) => {
  const user = useAppSelector((state) => state.LogUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const exitAplication = () => {
    dispatch(logoffUser(user.id));
    sessionStorage.removeItem("looged");
    navigate("/");
  };
  const goSettings = () => {
    navigate("/settings");
  };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography className="animation-name-user" variant="h5">
          {title}
          {subTitle}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          onClick={goMessages}
          sx={{
            marginLeft: "5px",
          }}
        >
          Mensagem
        </Button>
        <Button
          onClick={goSaves}
          sx={{
            marginLeft: "10px",
          }}
        >
          Salvos
        </Button>
        <Typography
          sx={{
            marginRight: "10px",
          }}
        >
          <PositionedMenu
            exitAplication={exitAplication}
            goSettings={goSettings}
          />
        </Typography>
        <hr />
      </Grid>
    </Grid>
  );
};

export default HeaderDefalt;
