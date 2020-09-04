import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_classes } from "../redux/class/classActions";
import ClassChips from "./ClassChips";
import { makeStyles } from "@material-ui/core/styles";
import "./Settings.css";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    display: "flex",
    justifyContent: "center",
  },
}));

const Settings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_classes());
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <ClassChips />
    </div>
  );
};

export default Settings;
