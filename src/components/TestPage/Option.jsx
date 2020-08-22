import React, { Component } from "react";
import { IconButton, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography, TextField, withStyles } from "@material-ui/core";
const styles = (theme) => ({
  option: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    textDecoration: false,
    width: "80%",
  },
  optionText: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
});

class Option extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      nextProps.value === this.props.value && this.props.j === nextProps.j
    );
  }
  render() {
    const {
      classes,
      questionKey,
      optionKey,
      value,
      deleteOption,
      setOptionValue,
      j,
      role,
    } = this.props;

    if (role !== "admin" && role !== "educator") {
      return (
        <Typography
          variant="body1"
          display="inline"
          className={classes.optionText}
        >
          {value}
        </Typography>
      );
    }
    return (
      <TextField
        className={classes.option}
        key={optionKey}
        value={value}
        multiline={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {(j + 10).toString(36) + " )"}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  deleteOption(questionKey, optionKey);
                }}
              >
                <DeleteIcon key={optionKey + "delete"}></DeleteIcon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setOptionValue(e.target.value, questionKey, optionKey)}
      ></TextField>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Option);
