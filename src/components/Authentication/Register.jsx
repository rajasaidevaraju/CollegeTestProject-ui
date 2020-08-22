import React, { useState, useEffect } from "react";
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
import { registerUser, clearErrors } from "../redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });
  let handleChange = (e) => {
    setInput({ ...formData, [e.target.id]: e.target.value });
  };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let errors = useSelector((state) => state.error);
  useEffect(() => {
    if (!isEmpty(errors)) {
      dispatch(clearErrors());
    }
  }, []);
  const history = useHistory();
  if (isAuthenticated) {
    history.push("/");
  }
  const dispatch = useDispatch();

  return (
    <div className="container">
      <Grid container direction="column" alignItems="center">
        <Grid item className="item">
          <Typography variant="h4">Create Account</Typography>
        </Grid>
        <Grid item className="item">
          <TextField
            error={"name" in errors}
            helperText={"name" in errors && errors.name}
            className="textInput"
            color="secondary"
            variant="outlined"
            label="Name"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
          ></TextField>
        </Grid>
        <Grid item className="item">
          <TextField
            error={"email" in errors}
            helperText={"email" in errors && errors.email}
            className="textInput"
            color="secondary"
            variant="outlined"
            label="Email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          ></TextField>
        </Grid>
        <Grid item className="item">
          <TextField
            error={"Password" in errors}
            helperText={"Password" in errors && errors.Password}
            className="textInput"
            color="secondary"
            variant="outlined"
            label="Password"
            id="password"
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
        <Grid item className="item">
          <TextField
            error={"Password2" in errors}
            helperText={"Password2" in errors && errors.Password2}
            className="textInput"
            color="secondary"
            variant="outlined"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            id="password2"
            value={formData.password2}
            onChange={(e) => handleChange(e)}
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
        <Grid item className="item">
          <Button
            variant="contained"
            className="formButton"
            color="secondary"
            onClick={() => {
              dispatch(registerUser(formData, history));
            }}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item className="item">
          <Typography>
            {"already a user?  "}
            <LinkElement
              component={Link}
              color="secondary"
              underline="none"
              className="link"
              to="/Login"
            >
              Login Here
            </LinkElement>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
