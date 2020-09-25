import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TestPage.css";
import { add_question } from "./../redux/data/testActions";
import { save_test, delete_test } from "./../redux/data/dataActions";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const FeatureButtons = ({ testId, testData }) => {
  const role = useSelector((state) => {
    return state.auth.user.role;
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClose = (shouldDelete) => {
    if (shouldDelete) {
      dispatch(delete_test(testId, history));
    }
    setOpen(false);
  };

  if (role === "admin" || role === "educator") {
    return (
      <div className="button_div">
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

        <Button
          className="test_Button"
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(add_question(testId));
          }}
        >
          add Question
        </Button>
        <Button
          className="test_Button"
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(save_test(testData));
          }}
        >
          Save Test
        </Button>
        <Button
          className="test_Button"
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete Test
        </Button>
      </div>
    );
  } else {
    return (
      <div className="button_div">
        <Button className="test_Button" variant="contained" color="secondary">
          Submit Test
        </Button>
      </div>
    );
  }
};
export default FeatureButtons;
