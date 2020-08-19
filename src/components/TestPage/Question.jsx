import React, { createRef } from "react";
import { useSelector } from "react-redux";
import {
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { Typography, TextField, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  questionName: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "95%",
  },
  questionText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));
const Question = ({
  questionKey,
  value,
  setQuestionName,
  addOption,
  i,
  deleteQuestion,
  setQuestionType,
}) => {
  const classes = useStyles();
  const role = useSelector((state) => state.auth.user.role);
  const [open, setOpen] = React.useState(false);
  const handleChange = (value) => {
    if (value === "delete") {
      deleteQuestion(questionKey);
    } else {
      setQuestionType(questionKey, value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (role !== "admin" && role !== "educator") {
    return (
      <Typography variant="h5" className={classes.questionText}>
        {i + 1 + " ) " + value}
      </Typography>
    );
  }
  return (
    <TextField
      ref={createRef()}
      key={questionKey + "questionName"}
      className={classes.questionName}
      value={value}
      multiline={true}
      onChange={(e) => setQuestionName(e.target.value, questionKey)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{i + 1 + " )"}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                addOption(questionKey);
              }}
            >
              <AddCircleIcon key={questionKey + "addIcon"}></AddCircleIcon>
            </IconButton>

            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              value=""
              onClose={handleClose}
              onOpen={handleOpen}
              onChange={(e) => handleChange(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"singleOption"}>single Option</MenuItem>
              <MenuItem value={"multipleOption"}>multiple Option</MenuItem>
              <MenuItem value={"delete"}>Delete Question</MenuItem>
            </Select>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};

export default Question;
