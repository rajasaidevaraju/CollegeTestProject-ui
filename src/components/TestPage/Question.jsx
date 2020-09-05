import React, { createRef } from "react";
import { connect } from "react-redux";
import {
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  set_question,
  add_option,
  delete_question,
  set_question_type,
} from "./../redux/data/testActions";
import { Typography, TextField, withStyles } from "@material-ui/core";
import { Component } from "react";
import Options from "./Options";
const styles = (theme) => ({
  questionText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "95%",
  },
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  shouldComponentUpdate(nextProps, nextState) {
    let currentData = this.props.questionData;
    let nextData = nextProps.questionData;
    return !(
      this.state.open === nextState.open &&
      currentData.questionName === nextData.questionName
    );
  }

  handleChange = (value) => {
    if (value !== "") {
      if (value === "delete") {
        this.props.deleteQuestion(this.props.testId, this.props.questionId);
      } else {
        this.props.setQuestionType(
          this.props.testId,
          this.props.questionId,
          value
        );
      }
    }
  };
  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  handleOpen = () => {
    this.setState({ ...this.state, open: true });
  };
  render() {
    let {
      testId,
      questionId,
      questionData,
      role,
      index,
      classes,
      setquestionText,
      addOption,
    } = this.props;

    if (!questionData) {
      questionData = {};
    }

    if (role !== "admin" && role !== "educator") {
      return (
        <div>
          <Typography variant="h5" className={classes.questionText}>
            {index + 1 + " ) " + questionData.questionName}
          </Typography>
          <Options testId={testId} questionId={questionId}></Options>
        </div>
      );
    }
    return (
      <div>
        <TextField
          ref={createRef()}
          key={questionId + "questionText"}
          className={classes.questionText}
          value={questionData.questionName}
          multiline={true}
          onChange={(e) => setquestionText(testId, questionId, e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {index + 1 + " )"}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    addOption(testId, questionId);
                  }}
                >
                  <AddCircleIcon key={questionId + "addIcon"}></AddCircleIcon>
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
        <Options testId={testId} questionId={questionId}></Options>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.testId;
  const questionId = ownProps.questionId;
  return {
    questionData: state.data.testsData[id].questions[questionId],
    role: state.auth.user.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setquestionText: (testId, questionId, text) => {
      dispatch(set_question(testId, questionId, text));
    },
    addOption: (testId, questionId) => {
      dispatch(add_option(testId, questionId));
    },
    deleteQuestion: (testId, questionId) => {
      dispatch(delete_question(testId, questionId));
    },
    setQuestionType: (testId, questionId, type) => {
      dispatch(set_question_type(testId, questionId, type));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Question));
