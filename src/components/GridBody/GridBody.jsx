import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, create_test } from "../redux/data/dataActions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Dialog,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./GridBody.css";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "260px",
    },
  },
}));

const GridBody = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (testName) => {
    if (testName) {
      const key = Date.now().toString(36);
      dispatch(create_test(key, testName));
    }
    setTestName("");
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const testsData = useSelector((state) => state.data.testsData);
  const history = useHistory();

  return (
    <div className="flex">
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new Test</DialogTitle>
        <TextField
          color="secondary"
          margin="dense"
          autoComplete="off"
          id="testName"
          label="testName"
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className={classes.textField}
        />
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose(testName);
            }}
            color="secondary"
          >
            Create Test
          </Button>
        </DialogActions>
      </Dialog>
      <Paper
        id={"add"}
        key={"add"}
        className="quizCard add"
        elevation={3}
        onClick={() => {
          handleClickOpen();
        }}
        /*onClick={() => {
          history.push("/CreateTest");
        }}*/
      >
        <Typography variant="h5" key={"addh5"}>
          Create a new Test
        </Typography>
      </Paper>
      {Object.keys(testsData).map((key) => {
        return (
          <Paper id={key} key={key} className="quizCard" elevation={3}>
            <Typography key={key + "h5"} variant="h5">
              {testsData[key].testData.testName}
            </Typography>
          </Paper>
        );
      })}
    </div>
  );
};

export default GridBody;
