import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBarC from "./components/NavBarC/NavBarC";
import GridBody from "./components/GridBody/GridBody";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import { green } from "@material-ui/core/colors";
import Register from "./components/Register/Register";
import TestPage from "./components/TestPage/TestPage";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
} from "./../src/components/redux/user/userActions";

import "fontsource-roboto";

//import { deepOrange, green, purple } from "@material-ui/core/colors";
let mode = true;
const themeObject = (mode) => {
  return {
    palette: {
      primary: {
        main: "#ff5722",
      },
      secondary: {
        light: green[300],
        main: green[500],
        dark: green[800],
      },
      type: mode ? "light" : "dark",
    },
  };
};
function App() {
  mode = useSelector((state) => state.theme.light_mode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const theme = createMuiTheme(themeObject(mode));
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    if (!isAuthenticated) {
      setAuthToken(token);
      dispatch(setCurrentUser(decoded));
    }

    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login";
    }
  } else {
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <Router>
          <NavBarC />
          <Switch>
            <ProtectedRoute exact path="/" component={GridBody} />
            <Route path="/Settings" component={Settings} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/TestPage/:id" component={TestPage} />
          </Switch>
        </Router>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
