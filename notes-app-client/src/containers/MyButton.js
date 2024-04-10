import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));
  
export default function MyButton(props) {
const classes = useStyles();

return (
    <Button {...props} onClick={props.onClick} variant="contained" color="primary" className={classes.button}>
        {props.text}
    </Button>
)
}
  