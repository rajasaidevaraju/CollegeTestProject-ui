import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@material-ui/core";
import { get_visitors } from "./../redux/visitor/visitorActions";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      marginTop: theme.spacing(3),
      overflowX: "hide",
    },
    table: {
      minWidth: 340,
    },
    tableCell: {
      paddingRight: 4,
      paddingLeft: 5,
    },
  };
});

export default function SimpleTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_visitors());
  }, []);
  let visitors = useSelector((state) => {
    return state.visitorData.visitors;
  });

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>visitor name</TableCell>
            <TableCell className={classes.tableCell}>visitor email</TableCell>
            <TableCell className={classes.tableCell}>role</TableCell>
            <TableCell className={classes.tableCell}>date joined</TableCell>
            <TableCell className={classes.tableCell}>is Verified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitors.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className={classes.tableCell}>{row.email}</TableCell>
              <TableCell className={classes.tableCell}>{row.role}</TableCell>
              <TableCell className={classes.tableCell}>{row.date}</TableCell>
              <TableCell className={classes.tableCell}>
                {row.isVerified + ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TableContainer>
  );
}
