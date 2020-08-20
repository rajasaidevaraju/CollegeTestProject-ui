import React, { createRef } from "react";
import { useSelector } from "react-redux";
import {
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { Typography, TextField, withStyles } from "@material-ui/core";
import { Component } from "react";
const styles = (theme) => ({
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
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      nextProps.value === this.props.value &&
      this.props.i === nextProps.i &&
      this.state.open === nextState.open
    );
  }
  handleChange = (value) => {
    if (value !== "") {
      if (value === "delete") {
        this.props.deleteQuestion(this.props.questionKey);
      } else {
        this.props.setQuestionType(this.props.questionKey, value);
      }
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  render() {
    const {
      classes,
      questionKey,
      value,
      setQuestionName,
      addOption,
      i,
      role,
    } = this.props;

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
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value=""
                onChange={(e) => this.handleChange(e.target.value)}
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
  }
}

export default withStyles(styles, { withTheme: true })(Question);
