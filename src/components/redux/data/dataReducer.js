import {
  REQUEST_DATA,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  ADD_TEST,
  SAVE_TEST_SUCCESS,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  DELETE_TEST,
} from "./dataActionTypes";
import generateID from "./../../../utils/generateID";
import {
  ADD_QUESTION,
  SET_QUESTION,
  DELETE_QUESTION,
  ADD_OPTION,
  SET_OPTION,
  DELETE_OPTION,
  SELECT_OPTION,
  SET_QUESTION_TYPE,
} from "./testActionTypes";
const initialState = {
  loading: true,
  testsData: {},
  status: "",
  error: "",
};
let testId = "",
  questionId = "",
  text = "",
  optionId = "",
  type = "",
  testData = {},
  questionData = {},
  answerData = {},
  questionsData = {};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        status: "loading",
        loading: true,
      };

    case REQUEST_SUCCESS:
      return {
        ...state,
        status: "success",
        loading: false,
        testsData: action.payload,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        status: "error",
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        status: "",
      };
    case ADD_TEST:
      const change = action.payload;
      let changed = state.testsData;
      changed = { ...changed, ...change };
      state = Object.assign({}, state);
      return {
        ...state,
        testsData: changed,
        status: "success",
        loading: false,
      };
    case SAVE_TEST_SUCCESS:
      return {
        ...state,
        status: "test Sucessfully saved",
        loading: false,
      };

    case DELETE_TEST:
      const delete_id = action.payload._id;
      delete state.testsData[delete_id];
      state = Object.assign({}, state);
      return {
        ...state,
        status: "success",
        loading: false,
      };
    case ADD_QUESTION:
      testId = action.payload.testId;
      testData = { ...state.testsData[testId] };
      questionId = generateID();
      if (!testData.questions) {
        testData.questions = {};
      }
      if (!testData.answers) {
        testData.answers = {};
      }
      testData.questions[questionId] = {
        questionName: "",
        options: {},
        type: "singleOption",
      };
      testData.answers[questionId] = [];
      state.testsData[testId] = testData;
      return { ...state };

    case SET_QUESTION:
      testId = action.payload.testId;
      questionId = action.payload.questionId;
      text = action.payload.text;
      questionData = { ...state.testsData[testId].questions[questionId] };
      questionData.questionName = text;
      state.testsData[testId].questions[questionId] = questionData;
      return { ...state };

    case DELETE_QUESTION:
      testId = action.payload.testId;
      questionId = action.payload.questionId;
      testData = { ...state.testsData[testId] };
      answerData = { ...testData.answers };
      questionsData = { ...testData.questions };
      delete questionsData[questionId];
      delete answerData[questionId];
      testData.answers = answerData;
      testData.questions = questionsData;
      state.testsData[testId] = testData;
      return { ...state };

    case ADD_OPTION:
      testId = action.payload.testId;
      questionId = action.payload.questionId;
      questionData = { ...state.testsData[testId].questions[questionId] };
      optionId = generateID();
      if (!questionData.options) {
        questionData.options = {};
      }
      questionData.options[optionId] = "";
      state.testsData[testId].questions[questionId] = questionData;
      return { ...state };

    case SET_OPTION:
      testId = action.payload.testId;
      questionId = action.payload.questionId;
      optionId = action.payload.optionId;
      text = action.payload.text;
      questionData = { ...state.testsData[testId].questions[questionId] };
      questionData.options[optionId] = text;
      state.testsData[testId].questions[questionId] = questionData;
      return { ...state };

    case DELETE_OPTION:
      testId = action.payload.testId;
      questionId = action.payload.questionId;
      optionId = action.payload.optionId;
      questionData = { ...state.testsData[testId].questions[questionId] };
      delete questionData.options[optionId];
      state.testsData[testId].questions[questionId] = questionData;
      return { ...state };

    case SELECT_OPTION:
      testId = action.payload.testId;
      questionId = action.payload.questionId;
      optionId = action.payload.optionId;
      type = action.payload.type;
      answerData = { ...state.testsData[testId].answers };
      console.log(type);
      if (type === "singleOption") {
        answerData[questionId] = [optionId];
      } else {
        let index = answerData[questionId].indexOf(optionId);
        if (index === -1) {
          answerData[questionId].push(optionId);
        } else {
          answerData[questionId].splice(index, 1);
        }
        answerData[questionId] = answerData[questionId].slice();
      }
      state.testsData[testId].answers = answerData;
      return { ...state };

    case SET_QUESTION_TYPE:
      testId = action.payload.testId;
      questionId = action.payload.questionId;
      type = action.payload.type;
      questionData = { ...state.testsData[testId].questions[questionId] };
      questionData.type = type;
      state.testsData[testId].questions[questionId] = questionData;
      return { ...state };

    default:
      return state;
  }
};

export default dataReducer;
