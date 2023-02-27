import React, { useRef, useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
// import Message from "../../components/Alert/Alert";
import { logUser } from "../../store/modules/LogSlice";
import { setAlertMessage } from "../../store/modules/AlerSlace";
import { showAlert } from "../../store/modules/StatusApiAlertSlice";
import MessageStatusApi from "../StatusMessageApi/StatusApiAlert";
import Message from "../Alert/Alert";
import "./style.css";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const inputEmail = useRef<HTMLInputElement | undefined>();
  const inputPassword = useRef<HTMLInputElement | undefined>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlerMessagesPg = async () => {
    if (email.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "Preencha o campo email corretamente",
          type: "warning",
        })
      );
      inputEmail.current?.focus();
      return;
    }
    if (password.length < 4) {
      dispatch(
        setAlertMessage({
          msg: "A senha deve ter no minimo 4 caracteres",
          type: "warning",
        })
      );
      inputPassword.current?.focus();
      return;
    }
    const login = {
      email: email,
      password: password,
    };
    const result = await dispatch(logUser(login)).unwrap();
    if (!result.ok) {
      dispatch(showAlert({ open: "open" }));
      return;
    }
    navigate("/messages");
  };
  const handlerCreatePg = () => {
    navigate("/creat-acoount");
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
                Pagina de recados login
                <MenuBookIcon fontSize="large" sx={{ marginRight: "10px" }} />
              </Typography>
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
                Entrar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handlerCreatePg}>
                Criar
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

export default LoginForm;
