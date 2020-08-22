import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  TextField,
  useMediaQuery,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { loginUser } from "../redux/user/userActions";
import { useSelector, useDispatch } from "react-redux";
import "./auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const dispatch = useDispatch();
  if (isAuthenticated) {
    history.push("/");
  }
  const mobile = useMediaQuery("(max-width:600px)");
  let variant = "h4";
  if (mobile) {
    variant = "h6";
  }

  return (
    <div className="container">
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <Typography variant={variant}>
            First, let's find your account
          </Typography>
        </Grid>
        <Grid item className="item">
          <TextField
            className="textInput"
            color="secondary"
            variant="outlined"
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item container justify="center">
          <Grid item>
            <Button
              className="formButton item"
              variant="outlined"
              color="secondary"
              onClick={() => {
                history.push("/Login");
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              className="formButton item"
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(loginUser(history));
              }}
            >
              Find Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
