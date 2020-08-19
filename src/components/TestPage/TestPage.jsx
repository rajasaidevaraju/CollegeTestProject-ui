import React, { useEffect, useState } from "react";
import "./TestPage.css";
import { useDispatch, useSelector } from "react-redux";
import { save_test, delete_test } from "./../redux/data/dataActions";
import Question from "./Question";
import Option from "./Option";
import SelectElement from "./SelectElement";
import FeatureButtons from "./FeatureButtons";
import { fetchData } from "../redux/data/dataActions";
import { useMediaQuery, Divider } from "@material-ui/core";
import generateID from "./../../utils/generateID";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
let testData = null;
const TestPage = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let testDetails = useSelector((state) => state.data.testsData[id]);
  const role = useSelector((state) => state.auth.user.role);
  const [questions, setQuestions] = useState({});
  const [testName, setTestName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading) {
      dispatch(fetchData());
    }

    if (testDetails) {
      setTestName(testDetails.testData.testName);
      setQuestions(Object.assign({}, testDetails.testData.questions));
    }
  }, [testDetails]);

  const saveTest = () => {
    dispatch(save_test(id, questions, testName));
  };

  const createQuestion = () => {
    const new_key = generateID();
    let newQuestionObj = {};

    for (const [key, value] of Object.entries(questions)) {
      newQuestionObj[key] = value;
    }
    newQuestionObj[new_key] = {
      questionName: "",
      options: {},
      type: "singleOption",
      answers: [],
    };
    setQuestions(newQuestionObj);
  };

  const deleteQuestion = (id) => {
    delete questions[id];
    setQuestions({ ...questions });
  };

  const setQuestionType = (id, type) => {
    questions[id].type = type;
    setQuestions({ ...questions });
  };

  const setQuestionName = (value, id) => {
    questions[id].questionName = value;
    setQuestions({ ...questions });
  };

  const selectOption = (type, question_id, option_id, event) => {
    //console.log(event.target.checked);
    //console.log(questions[question_id].answers);
    if (type === "singleOption") {
      questions[question_id].answers = [option_id];
      setQuestions({ ...questions });
    } else {
      if (event.target.checked) {
        questions[question_id].answers.push(option_id);
      } else {
        let index = questions[question_id].answers.indexOf(option_id);
        questions[question_id].answers.splice(index, 1);
      }
      setQuestions({ ...questions });
    }
  };
  const setOptionValue = (value, question_id, option_id) => {
    questions[question_id].options[option_id] = value;
    setQuestions({ ...questions });
  };

  const addOption = (id) => {
    const new_Key = generateID();
    if (!questions[id].options) {
      questions[id].options = {};
    }
    questions[id].options[new_Key] = "";
    setQuestions({ ...questions });
  };

  const deleteOption = (question_id, option_id) => {
    delete questions[question_id].options[option_id];
    setQuestions({ ...questions });
  };
  const deleteTest = () => {
    setOpen(true);
  };

  const handleClose = (shouldDelete) => {
    if (shouldDelete) {
      dispatch(delete_test(id));
    }
    setOpen(false);
  };

  let loading = useSelector((state) => state.data.loading);
  const mobile = useMediaQuery("(max-width:600px)");
  let variant = "h4";
  if (mobile) {
    variant = "h6";
  }

  if (!loading && testDetails !== undefined) {
    return (
      <div className="test">
        <Dialog
          open={open}
          onClose={() => {
            handleClose(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to delete the Test?"}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose(false);
              }}
              color="secondary"
            >
              No
            </Button>
            <Button
              onClick={() => {
                handleClose(true);
              }}
              color="secondary"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Paper className="paper">
          <Typography variant={variant}>Test Page of {testName}</Typography>
          {Object.keys(questions).map((key, i) => {
            return (
              <div key={key + "div"} className="question">
                <Question
                  key={key}
                  questionKey={key}
                  value={questions[key].questionName}
                  setQuestionName={setQuestionName}
                  addOption={addOption}
                  deleteQuestion={deleteQuestion}
                  setQuestionType={setQuestionType}
                  i={i}
                ></Question>
                {questions[key].options &&
                  Object.keys(questions[key].options).map((optionKey, j) => {
                    return (
                      <div key={optionKey + "div"} className="optionDiv">
                        <SelectElement
                          type={questions[key].type}
                          questionKey={key}
                          optionKey={optionKey}
                          selectOption={selectOption}
                          answersArray={questions[key].answers}
                        ></SelectElement>
                        <Option
                          j={j}
                          key={optionKey}
                          questionKey={key}
                          optionKey={optionKey}
                          value={questions[key].options[optionKey]}
                          deleteOption={deleteOption}
                          setOptionValue={setOptionValue}
                        ></Option>
                      </div>
                    );
                  })}
                <Divider className="divider" variant="fullWidth" />
              </div>
            );
          })}
          <FeatureButtons
            createQuestion={createQuestion}
            saveTest={saveTest}
            deleteTest={deleteTest}
            role={role}
          ></FeatureButtons>
        </Paper>
      </div>
    );
  }
  return <div></div>;
};

export default TestPage;
