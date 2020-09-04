import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  const [className, setClassName] = useState("");
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
    { key: 5, label: "Vue.js" },
    { key: 6, label: "Vue.js" },
    { key: 7, label: "Vue.js" },
    { key: 8, label: "Vue.js" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper component="ul" className={classes.root}>
      <InputDialog open={open} setOpen={setOpen}></InputDialog>
      <DeleteDialog
        open={d_open}
        setOpen={d_setOpen}
        ClassName={className}
      ></DeleteDialog>
      {chipData.map((data) => {
        let icon;

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              onDelete={() => {
                setClassName(data.label);
                d_setOpen(true);
              }}
              label={data.label}
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
