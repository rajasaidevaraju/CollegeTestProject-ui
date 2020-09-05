import React, { Component } from "react";
import "./TestPage.css";
import FeatureButtons from "./FeatureButtons";
import { connect } from "react-redux";
import Question from "./Question";
import { fetchData } from "./../redux/data/dataActions";
import Feedback from "./Feedback";
class TestPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let current_count = this.state.count;
    let next_count = nextState.count;

    return current_count !== next_count;
  }

  static getDerivedStateFromProps(props, state) {
    let testData = props.testData;
    if (testData && testData.questions) {
      return { count: Object.keys(testData.questions).length };
    }
    return { count: 0 };
  }
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    if (!this.props.testData) {
      this.props.fetchData();
    }
    return {};
  }
  render() {
    const testId = this.props.match.params.id;
    let question_keys = [];

    if (this.props.testData && this.props.testData.questions) {
      question_keys = Object.keys(this.props.testData.questions);
    }

    return (
      <div className="test">
        {question_keys.map((questionKey, index) => {
          return (
            <Question
              key={questionKey}
              testId={testId}
              questionId={questionKey}
              index={index}
            />
          );
        })}

        <FeatureButtons testId={testId} testData={this.props.testData} />
        <Feedback />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { testData: state.data.testsData[id] };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchData());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
