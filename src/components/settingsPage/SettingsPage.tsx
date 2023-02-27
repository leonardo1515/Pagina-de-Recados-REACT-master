import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import HeaderDefalt from "../../components/header/Header";
import { setAlertMessage } from "../../store/modules/AlerSlace";
import { selectMessages } from "../../store/modules/MessagsSlace";
import Message from "../Alert/Alert";
import {
  editeUser,
  updateuser,
  deleteUser,
} from "../../store/modules/LogSlice";
import ModalDelete from "../ModalDelete/ModalDelete";

const PageSettings: React.FC = () => {
  const messagesRedux = useAppSelector(selectMessages);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [lengthMessags, setLengthMessags] = useState<number>(0);
  const [openDelete, setOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"message" | "user">("message");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.LogUser);
  const closeModal = () => setOpen(false);
  const openModal = () => {
    setActionType("user");
    setOpen(true);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setPassword(user.password);
      setLengthMessags(messagesRedux.length);
    }
  }, []);

  const updateUser = useCallback(() => {
    if (name.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "Preencha o campo name corretamente",
          type: "warning",
        })
      );
      return;
    }

    if (password.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "Preencha o campo senha corretamente",
          type: "warning",
        })
      );
      return;
    }
    const userUpdate = {
      id: user.id,
      name: name,
      password: password,
    };

    dispatch(editeUser(userUpdate));
    dispatch(updateuser(userUpdate));

    dispatch(
      setAlertMessage({
        msg: "Usuario editado con sucesso",
        type: "success",
      })
    );
  }, [dispatch, name, password, user.id]);

  const excluirUser = useCallback(
    (idUser: string) => {
      dispatch(deleteUser({ id: idUser }));
      navigate("/");
    },
    [dispatch, navigate]
  );

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
        maxWidth: "lg",
        minHeight: "500px",
        backgroundColor: " rgb(224, 221, 221)",
      }}
    >
      <Grid item xs={12}>
        <HeaderDefalt
          title={"Configurações"}
          subTitle={""}
          goMessages={goMessages}
          goSaves={goSaves}
        />
      </Grid>

      <Grid item xs={7} sx={{ marginLeft: "15px" }}>
        <Typography>{name}</Typography>
        <hr />
      </Grid>
      <Grid item xs={4} sx={{ marginTop: "10px" }}>
        <TextField
          label="Name"
          type="texte"
          value={name || ""}
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>

      <Grid item xs={7} sx={{ marginLeft: "15px" }}>
        <Typography>{password}</Typography>
        <hr />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Passeord"
          type="password"
          value={password || ""}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">{lengthMessags} Mensagens</Typography>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          sx={{ marginBottom: "15px" }}
          onClick={updateUser}
        >
          Editar
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          sx={{ marginBottom: "15px" }}
          onClick={openModal}
        >
          Deletar
        </Button>
      </Grid>
      <Message />
      <ModalDelete
        open={openDelete}
        actionType={actionType}
        actionCancel={closeModal}
        actionDelete={() => excluirUser(user.id)}
      />
    </Grid>
  );
};

export default PageSettings;
