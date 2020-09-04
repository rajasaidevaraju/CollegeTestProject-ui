import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { create_class } from "./../redux/class/classActions";
import {
  DialogActions,
  DialogTitle,
  Dialog,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "260px",
    },
  },
}));
const InputDialog = ({ open, setOpen }) => {
  const classes = useStyles();
  const [className, setClassName] = useState("");
  const dispatch = useDispatch();
  const handleClose = (className) => {
    if (className) {
      dispatch(create_class(className));
    }
    setClassName("");
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create new Class</DialogTitle>
      <TextField
        color="secondary"
        margin="dense"
        autoFocus
        autoComplete="off"
        id="testName"
        label="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        type="text"
        className={classes.textField}
      />
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose(className);
          }}
          color="secondary"
        >
          Create Class
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default InputDialog;
