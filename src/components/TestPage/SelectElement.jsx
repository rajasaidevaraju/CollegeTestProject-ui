import React, { Component } from "react";
import "./TestPage.css";
import { Radio, withStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
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

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      this.arraysEqual(this.props.answersArray, nextProps.answersArray) &&
      nextProps.type === this.props.type
    );
  }
  render() {
    const {
      classes,
      type,
      questionKey,
      optionKey,
      selectOption,
      answersArray,
    } = this.props;
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
  }
}

export default withStyles(styles, { withTheme: true })(SelectElement);
