import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import InputDialog from "./InputDialog";
import DeleteDialog from "./DeleteDialog";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1),
    margin: theme.spacing(3),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ClassChips() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [d_open, d_setOpen] = useState(false);
  const [classDetails, setClassDetails] = useState({});
  const classesData = useSelector((state) => {
    return state.classData.classes;
  });

  return (
    <Paper component="ul" className={classes.root}>
      <InputDialog open={open} setOpen={setOpen}></InputDialog>
      <DeleteDialog
        open={d_open}
        setOpen={d_setOpen}
        classDetails={classDetails}
      ></DeleteDialog>
      {classesData.map((data, index) => {
        let icon;

        return (
          <li key={data._id}>
            <Chip
              icon={icon}
              onDelete={() => {
                setClassDetails(data);
                d_setOpen(true);
              }}
              label={data.className}
              className={classes.chip}
            />
          </li>
        );
      })}
      <Chip
        onClick={() => setOpen(true)}
        label={"Add Class"}
        className={classes.chip}
        clickable
        color="secondary"
      />
    </Paper>
  );
}
