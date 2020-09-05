import React, { Component } from "react";
import { IconButton, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { delete_option, set_option } from "./../redux/data/testActions";
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
      nextProps.optionText === this.props.optionText &&
      this.props.index === nextProps.index
    );
  }
  render() {
    const {
      classes,
      testId,
      questionId,
      optionId,
      optionText,
      deleteOption,
      setOptionText,
      index,
      role,
    } = this.props;

    if (role !== "admin" && role !== "educator") {
      return (
        <Typography
          variant="body1"
          display="inline"
          className={classes.optionText}
        >
          {optionText}
        </Typography>
      );
    }
    return (
      <TextField
        className={classes.option}
        key={optionId}
        value={optionText}
        multiline={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {(index + 10).toString(36) + " )"}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  deleteOption(testId, questionId, optionId);
                }}
              >
                <DeleteIcon key={optionId + "delete"}></DeleteIcon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) =>
          setOptionText(testId, questionId, optionId, e.target.value)
        }
      ></TextField>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.testId;
  const questionId = ownProps.questionId;
  const optionId = ownProps.optionId;
  return {
    optionText:
      state.data.testsData[id].questions[questionId].options[optionId],
    role: state.auth.user.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOption: (testId, questionId, optionId) => {
      dispatch(delete_option(testId, questionId, optionId));
    },
    setOptionText: (testId, questionId, optionId, text) => {
      dispatch(set_option(testId, questionId, optionId, text));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Option));
