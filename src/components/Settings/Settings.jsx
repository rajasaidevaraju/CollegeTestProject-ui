import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import { Button, Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Settings.css";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(9),
  },
}));

const Settings = () => {
  const classes = useStyles();
  // const data = useSelector((state) => state.data);
  return (
    <div className={classes.root}>
      <Card className="dataCard">
        <CardContent>
          <Typography>files in database:</Typography>
          <Typography>Total size of files:</Typography>
        </CardContent>
      </Card>

      <Button variant="contained" color="secondary">
        Scan Files
      </Button>
    </div>
  );
};

export default Settings;
