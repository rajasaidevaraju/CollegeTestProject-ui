import React, { Component } from "react";
import { connect } from "react-redux";
import Option from "./Option";
import SelecElement from "./SelectElement";
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.count === nextState.count);
  }

  static getDerivedStateFromProps(props, state) {
    let questionData = props.questionData;
    if (questionData && questionData.options) {
      return { count: Object.keys(questionData.options).length };
    }
    return { count: 0 };
  }

  render() {
    const { testId, questionId, questionData } = this.props;

    let options = {};
    if (questionData && questionData.options) {
      options = questionData.options;
    }
    let optionKeys = Object.keys(options);

    return (
      <div>
        {optionKeys.map((optionKey, index) => {
          return (
            <div key={optionKey + "Options div"}>
              <SelecElement
                key={optionKey + "SelectElement"}
                testId={testId}
                optionId={optionKey}
                questionId={questionId}
              />
              <Option
                key={optionKey}
                testId={testId}
                optionId={optionKey}
                questionId={questionId}
                index={index}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.testId;
  const questionId = ownProps.questionId;
  return {
    questionData: state.data.testsData[id].questions[questionId],
  };
};

export default connect(mapStateToProps)(Options);
