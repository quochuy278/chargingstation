import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <Typography variant="h6">Find Out More</Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5">Be the first to know about Us</Typography>
          <Typography>
            Subscribe to get exclusive offers on the world's greatest vacations.
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography>&copy; Copyright 2020 OAMK</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
