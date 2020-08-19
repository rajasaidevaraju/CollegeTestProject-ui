import React from "react";
import "./TestPage.css";
import { Button } from "@material-ui/core";
const FeatureButtons = ({ createQuestion, saveTest, deleteTest, role }) => {
  if (role === "admin" || role === "educator") {
    return (
      <div className="button_div">
        <Button
          className="test_Button"
          variant="contained"
          color="secondary"
          onClick={() => {
            createQuestion();
          }}
        >
          add Question
        </Button>
        <Button
          className="test_Button"
          variant="contained"
          color="secondary"
          onClick={() => {
            saveTest();
          }}
        >
          Save Test
        </Button>
        <Button
          className="test_Button"
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteTest();
          }}
        >
          Delete Test
        </Button>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default FeatureButtons;
