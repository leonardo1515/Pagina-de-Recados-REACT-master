import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectById,
  updateMessage,
  updateOne,
} from "../../store/modules/MessagsSlace";
import { setAlertMessage } from "../../store/modules/AlerSlace";
import { ModalMessagesProps } from "../TypesComponents";

const ModalTransaction: React.FC<ModalMessagesProps> = ({
  idMessage,
  open,
  actionCancel,
}) => {
  const [message, setMessage] = useState<string>("");
  const [descript, setDescript] = useState<string>("");
  const user = useAppSelector((state) => state.LogUser);
  const messageCurretRedux = useAppSelector((state) =>
    selectById(state, idMessage ?? "")
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (messageCurretRedux) {
      setMessage(messageCurretRedux._message);
      setDescript(messageCurretRedux._descript);
    }
  }, []);

  const update = () => {
    dispatch(
      updateMessage({
        userId: user.id,
        id: idMessage,
        message: message,
        descript: descript,
        save: messageCurretRedux?._save,
      })
    );

    dispatch(
      updateOne({
        id: idMessage,
        changes: {
          _message: message,
          _descript: descript,
          _save: messageCurretRedux?._save,
        },
      })
    );
    actionCancel();
    dispatch(
      setAlertMessage({
        msg: "Mensagem editada com sucesso.",
        type: "success",
      })
    );
  };

  return (
    <Dialog open={open} onClose={actionCancel}>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={actionCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja editar este recado ?
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Editar <EditIcon fontSize="large" sx={{ marginRight: "10px" }} />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mensagen"
              type="texte"
              value={message}
              fullWidth
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              type="texte"
              value={descript}
              fullWidth
              onChange={(e) => setDescript(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={update}>
              Editar
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTransaction;
