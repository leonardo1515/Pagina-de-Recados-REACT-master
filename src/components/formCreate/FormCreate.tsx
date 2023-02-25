import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { createUser } from "../../store/modules/NewUser";
import { showAlert } from "../../store/modules/StatusApiAlertSlice";
import MessageStatusApi from "../StatusMessageApi/StatusApiAlert";
import Message from "../Alert/Alert";
import { setAlertMessage } from "../../store/modules/AlerSlace";
import "./style.css";

const FormCreate: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const inputEmail = useRef<HTMLInputElement | undefined>();
  const inputPassword = useRef<HTMLInputElement | undefined>();
  const inputName = useRef<HTMLInputElement | undefined>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlerMessagesPg = () => {
    if (name.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "o nome deve ter no minimo 4 caracteres",
          type: "warning",
        })
      );
      return;
    }
    if (email.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "Campo email preenchido imcorretamente",
          type: "warning",
        })
      );
      return;
    }
    if (password.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "A senha deve ter no minimo 4 caracteres",
          type: "warning",
        })
      );
      return;
    }
    dispatch(createUser({ name: name, email: email, password: password }));
    dispatch(showAlert({ open: "open" }));
    navigate("/");
  };

  const handlerCreatePg = () => {
    navigate("/");
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "sm",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              margin: "5px",
              maxWidth: "sm",
              minHeight: "500px",
            }}
          >
            <Grid item xs={12}>
              <Typography
                className="icoAnimation"
                variant="h5"
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                Criar
                <MenuBookIcon fontSize="large" sx={{ marginRight: "10px" }} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="input-animation"
                label="Name"
                type="texte"
                fullWidth
                inputRef={inputName}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="input-animation"
                label="Email"
                type="email"
                fullWidth
                inputRef={inputEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="input-animation"
                label="Password"
                type="password"
                fullWidth
                inputRef={inputPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handlerMessagesPg}>
                Criar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handlerCreatePg}>
                Voltar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Message />
      <MessageStatusApi />
    </Container>
  );
};

export default FormCreate;
