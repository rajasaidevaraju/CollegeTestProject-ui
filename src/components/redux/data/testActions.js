import {
  ADD_OPTION,
  DELETE_OPTION,
  SET_OPTION,
  ADD_QUESTION,
  DELETE_QUESTION,
  SET_QUESTION,
  SET_QUESTION_TYPE,
  SELECT_OPTION,
} from "./testActionTypes";

export const add_option = (testId, questionId) => {
  return {
    type: ADD_OPTION,
    payload: { testId, questionId },
  };
};

export const delete_option = (testId, questionId, optionId) => {
  return {
    type: DELETE_OPTION,
    payload: { testId, questionId, optionId },
  };
};

export const set_option = (testId, questionId, optionId, text) => {
  return {
    type: SET_OPTION,
    payload: { testId, questionId, optionId, text },
  };
};

export const add_question = (testId) => {
  return {
    type: ADD_QUESTION,
    payload: { testId },
  };
};

export const delete_question = (testId, questionId) => {
  return {
    type: DELETE_QUESTION,
    payload: { testId, questionId },
  };
};

export const set_question = (testId, questionId, text) => {
  return {
    type: SET_QUESTION,
    payload: { testId, questionId, text },
  };
};

export const set_question_type = (testId, questionId, type) => {
  return {
    type: SET_QUESTION_TYPE,
    payload: { testId, questionId, type },
  };
};

export const select_option = (testId, questionId, optionId, type) => {
  return {
    type: SELECT_OPTION,
    payload: { testId, questionId, optionId, type },
  };
};
