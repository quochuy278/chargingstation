import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  head: {
    color: theme.palette.primary.third,
    textAlign: "left"
  }
}));

export default function About() {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Typography variant="h4" className={classes.head}>
          We are the best!
        </Typography>
        <Typography variant="h6" className={classes.head}>
          And We Can Back It Up
        </Typography>
        <Box>
          <Typography align="left">
            Here is our very first React JS, Node JS, Express and MySQL project!
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
