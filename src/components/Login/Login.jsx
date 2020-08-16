import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Link as LinkElement } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Typography from "@material-ui/core/Typography";
import { loginUser } from "./../redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setInput] = useState({
    email: "",
    password: "",
    errors: {},
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  if (isAuthenticated) {
    history.push("/");
  }

  const dispatch = useDispatch();
  let handleChange = (e) => {
    setInput({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="container">
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">WELCOME</Typography>
        </Grid>
        <Grid item>
          <TextField
            className="input"
            color="secondary"
            variant="outlined"
            label="Email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            className="input"
            color="secondary"
            variant="outlined"
            id="password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {!showPassword && <VisibilityIcon />}
                  {showPassword && <VisibilityOffIcon />}
                </IconButton>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <Typography>
            not a user?
            <LinkElement
              component={Link}
              to="/Register"
              color="secondary"
              underline="none"
              className="link"
            >
              Register Here
            </LinkElement>
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch(loginUser(formData, history));
            }}
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
