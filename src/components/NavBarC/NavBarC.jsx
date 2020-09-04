import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggle_theme } from "../redux/theme/themeActions";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DarkModeIconButton from "@material-ui/icons/Brightness3";
import LightModeIconButton from "@material-ui/icons/BrightnessHigh";
import SettingsIcon from "@material-ui/icons/Settings";
import { logoutUser } from "./../redux/user/userActions";
import {
  IconButton,
  Toolbar,
  AppBar,
  Button,
  Typography,
} from "@material-ui/core";
import "./NavBarC.css";
const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);
function NavBarC() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.light_mode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user.role);
  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <div className={classes.title}>
            <Typography component={Link} to="/" className="link" variant="h5">
              Quiz
            </Typography>
          </div>

          {isAuthenticated && role === "admin" && (
            <IconButton component={Link} to="/Settings" color="inherit">
              <SettingsIcon style={{ color: "white" }}></SettingsIcon>
            </IconButton>
          )}

          <IconButton onClick={() => dispatch(toggle_theme())}>
            {!mode && <LightModeIconButton style={{ color: "white" }} />}
            {mode && <DarkModeIconButton style={{ color: "white" }} />}
          </IconButton>
          {!isAuthenticated ? (
            <Button component={Link} to="/Login" style={{ color: "white" }}>
              Login
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(logoutUser());
              }}
              style={{ color: "white" }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBarC;
