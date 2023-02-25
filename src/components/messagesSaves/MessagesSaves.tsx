import React, { useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import HeaderDefalt from "../../components/header/Header";
import {
  deletMessage,
  getAllMessages,
  selectMessages,
} from "../../store/modules/MessagsSlace";
import "./style.css";
import Message from "../Alert/Alert";
import { setAlertMessage } from "../../store/modules/AlerSlace";
import HandlerDrop from "../handleTableDrop/HandlerTableDrop";

const SavesMessages: React.FC = () => {
  const user = useAppSelector((state) => state.LogUser);
  const messagesRedux = useAppSelector(selectMessages);
  const saveMessages = messagesRedux.filter(
    (message) => message._save === true
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let noMessage = "";

  useEffect(() => {
    dispatch(getAllMessages(user.id));
  }, []);

  if (saveMessages.length === 0) {
    noMessage = "Não tem mensagens salvas.";
  }

  const handleDeleteMessage = (_id: string) => {
    dispatch(deletMessage({ userId: user.id, id: _id }));
    dispatch(
      setAlertMessage({
        msg: "Mensagem deletada com sucesso.",
        type: "success",
      })
    );
  };

  const goMessages = () => {
    navigate("/Messages");
  };
  const goSaves = () => {
    navigate("/Saves");
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        margin: "5px",
        maxWidth: "lg",
        minHeight: "500px",
        backgroundColor: " rgb(234, 234, 236)",
      }}
    >
      <Grid item xs={12}>
        <HeaderDefalt
          title={"Mensagem salvas"}
          subTitle={""}
          goMessages={goMessages}
          goSaves={goSaves}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h4">{noMessage}</Typography>
        </Grid>
        <Paper elevation={2} sx={{ padding: "5px" }}>
          {saveMessages.map((item) => {
            return (
              <HandlerDrop
                show={"drop"}
                hide={"larg"}
                key={item._id}
                messages={item}
                actionDelete={() => handleDeleteMessage(item._id)}
              />
            );
          })}
        </Paper>
      </Grid>
      <Message />
    </Grid>
  );
};

export default SavesMessages;
