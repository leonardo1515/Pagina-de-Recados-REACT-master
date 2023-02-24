import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SaveAlt } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DropButtonProps } from "../TypesComponents";

const DropBUtton: React.FC<DropButtonProps> = ({
  message,
  actionDelete,
  saveMessag,
  openModal,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const show = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={show ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={show ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white", backgroundColor: "rgb(43, 56, 91)" }}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={show}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={saveMessag}>
          <SaveAlt />
        </MenuItem>
        <MenuItem onClick={openModal}>
          <EditIcon />
        </MenuItem>
        <MenuItem onClick={() => actionDelete(message._id)}>
          <DeleteIcon />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropBUtton;
