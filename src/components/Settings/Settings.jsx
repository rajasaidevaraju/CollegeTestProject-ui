import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_classes } from "../redux/class/classActions";
import { Button, Typography, Card, CardContent } from "@material-ui/core";
import ClassChips from "./ClassChips";
import { makeStyles } from "@material-ui/core/styles";
import "./Settings.css";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
}));

const Settings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_classes());
  }, []);
  // const data = useSelector((state) => state.data);
  return (
    <div className={classes.root}>
      <ClassChips></ClassChips>
    </div>
  );
};

export default Settings;
