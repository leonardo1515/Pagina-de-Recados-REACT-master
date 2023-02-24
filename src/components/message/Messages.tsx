import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, IconButton, Paper, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import HeaderDefalt from "../../components/header/Header";
import { setAlertMessage } from "../../store/modules/AlerSlace";
import {
  addMesage,
  deletMessage,
  getAllMessages,
  selectMessages,
} from "../../store/modules/MessagsSlace";
import FilterListIcon from "@mui/icons-material/FilterList";
import Message from "../Alert/Alert";
import ModalFilter from "../filter/ModalFilter";
import HandlerDrop from "../handleTableDrop/HandlerTableDrop";

const PageMessags: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [descript, setDescript] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const inputMessage = useRef<HTMLInputElement | undefined>();
  const inputDescript = useRef<HTMLInputElement | undefined>();
  const messagesRedux = useAppSelector(selectMessages);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.LogUser);

  useEffect(() => {
    if (!user) {
      setName("");
    }
    setName(user.name);
    dispatch(getAllMessages(user.id));
  }, []);

  const addMessag = () => {
    if (message.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "A mensagem deve ter no minimo 4 caracteres.",
          type: "warning",
        })
      );
      inputMessage.current?.focus();
      return;
    }
    if (descript.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "A descrição deve ter no minimo 4 caracteres.",
          type: "warning",
        })
      );
      inputDescript.current?.focus();
      return;
    }

    dispatch(
      addMesage({ userId: user.id, message: message, descript: descript })
    );
    dispatch(
      setAlertMessage({
        msg: "Nova mensagem adicionada com sucesso.",
        type: "success",
      })
    );
    setMessage("");
    setDescript("");
  };

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

  const closeModal = () => setOpen(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        margin: "5px",
        maxWidth: "lg",
        minHeight: "500px",
      }}
    >
      <Grid item xs={12}>
        <HeaderDefalt
          title={"Seja bem vindo  "}
          subTitle={name}
          goMessages={goMessages}
          goSaves={goSaves}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Mensagem"
          type="text"
          value={message || ""}
          fullWidth
          inputRef={inputMessage}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Descrição"
          type="text"
          value={descript || ""}
          fullWidth
          inputRef={inputDescript}
          onChange={(e) => setDescript(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addMessag}>
          Salvar
        </Button>
      </Grid>
      <Grid item xs={9}>
        <IconButton
          onClick={() => openModal()}
          edge="start"
          aria-label="edit"
          sx={{ paddingRight: "20px", marginRight: "20px" }}
        >
          <FilterListIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: "5px" }}>
          {messagesRedux.map((item) => {
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
      <ModalFilter open={open} actionCancel={closeModal} />
    </Grid>
  );
};

export default PageMessags;
