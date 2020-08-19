import React from "react";
import "./TestPage.css";
import { Radio, makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
const useStyles = makeStyles((theme) => ({
  SelectElement: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
}));

const SelectElement = ({
  type,
  questionKey,
  optionKey,
  selectOption,
  answersArray,
}) => {
  const classes = useStyles();
  let selected = false;

  if (answersArray.indexOf(optionKey) > -1) {
    selected = true;
  }
  if (type === "singleOption") {
    return (
      <Radio
        onChange={(e) => {
          selectOption(type, questionKey, optionKey, e);
        }}
        checked={selected}
        className={classes.SelectElement}
      ></Radio>
    );
  } else {
    return (
      <Checkbox
        onChange={(e) => {
          selectOption(type, questionKey, optionKey, e);
        }}
        checked={selected}
        className={classes.SelectElement}
      ></Checkbox>
    );
  }
};

export default SelectElement;
