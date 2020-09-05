import React, { Component } from "react";
import "./TestPage.css";
import { Radio, withStyles, Checkbox } from "@material-ui/core";

import { select_option } from "./../redux/data/testActions";
import { connect } from "react-redux";
const styles = (theme) => ({
  SelectElement: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
});

class SelectElement extends Component {
  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    if (a.length === 1) {
      return a[0] === b[0];
    }
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    return !(
      this.arraysEqual(this.props.answersArray, nextProps.answersArray) &&
      nextProps.type === this.props.type
    );
  }*/
  render() {
    const {
      classes,
      type,
      testId,
      questionId,
      optionId,
      selectOption,
      answersArray,
    } = this.props;
    let selected = false;

    if (answersArray && answersArray.indexOf(optionId) > -1) {
      selected = true;
    }
    if (type === "singleOption") {
      return (
        <Radio
          onChange={(e) => {
            selectOption(testId, questionId, optionId, type);
          }}
          checked={selected}
          className={classes.SelectElement}
        ></Radio>
      );
    } else {
      return (
        <Checkbox
          onChange={(e) => {
            selectOption(testId, questionId, optionId, type);
          }}
          checked={selected}
          className={classes.SelectElement}
        ></Checkbox>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.testId;
  const questionId = ownProps.questionId;

  return {
    answersArray: state.data.testsData[id].answers[questionId],
    type: state.data.testsData[id].questions[questionId].type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectOption: (testId, questionId, optionId, type) => {
      dispatch(select_option(testId, questionId, optionId, type));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SelectElement));
