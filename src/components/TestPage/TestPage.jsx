import React, { useEffect } from "react";
import "./TestPage.css";
import { useDispatch, useSelector } from "react-redux";
import { create_test } from "../redux/data/dataActions";
const TestPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let testData = useSelector((state) => state.data.testData);

  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <div className="test">
      <h1>createTest</h1>
    </div>
  );
};

export default TestPage;
