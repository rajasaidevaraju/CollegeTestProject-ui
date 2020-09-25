import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";

const FeatureButtons = ({ testId, testData }) => {
  const [popOpen, setPopOpen] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const status = useSelector((state) => {
    return state.data.status;
  });
  const error = useSelector((state) => {
    return state.data.error;
  });
  useEffect(() => {
    if (status !== "") {
      setPopOpen({ open: true, message: status, type: "success" });
    }
    if (error !== "") {
      setPopOpen({ open: true, message: error, type: "error" });
    }
  }, [status, error]);

  const handlePopClose = (event, reason) => {
    setPopOpen({ open: false, message: "", type: "info" });
  };

  return (
    <div>
      <Snackbar
        open={popOpen.open}
        onClose={handlePopClose}
        message={popOpen.message}
        s
      ></Snackbar>
    </div>
  );
};
export default FeatureButtons;
