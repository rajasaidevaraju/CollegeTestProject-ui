import React, { useEffect, useState } from "react";
import "./TestPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { save_test, delete_test } from "./../redux/data/dataActions";
import Question from "./Question";
import Option from "./Option";
import SelectElement from "./SelectElement";
import FeatureButtons from "./FeatureButtons";
import { fetchData } from "../redux/data/dataActions";
import { useMediaQuery, Divider } from "@material-ui/core";
import generateID from "./../../utils/generateID";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
const DeleteDialog = (props) => {
  <Dialog
    open={open}
    onClose={() => {
      handleClose(false);
    }}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="alert-dialog-title">
      {"Do you want to delete the Test?"}
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
  </Dialog>;
};

export default DeleteDialog;
