import React, { useEffect, useState } from "react";
import {
  DialogActions,
  DialogTitle,
  Dialog,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { delete_class } from "./../redux/class/classActions";
import { useDispatch } from "react-redux";
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
const InputDialog = ({ open, setOpen, classDetails }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = classDetails._id;
  const handleClose = (shouldDelete) => {
    if (shouldDelete) {
      dispatch(delete_class(id));
    }
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose(false);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {"Do you want to delete the Class?"}
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose(false);
          }}
          color="secondary"
        >
          No
        </Button>
        <Button
          onClick={() => {
            handleClose(true);
          }}
          color="secondary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default InputDialog;
