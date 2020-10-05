import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Box,
  TextField
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 0 0 0",
    backgroundColor: theme.palette.primary.main,
    "& a": {
      textDecoration: "none"
    }
  },
  icon: {
    color: theme.palette.primary.secondary,
    fontSize: "small"
  },
  form: {
    width: "70%",
    margin: "20px auto"
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <Typography variant="h6">Find Out More</Typography>
          <Typography>
            <Link to="/about">About Us</Link>
          </Typography>
          <Typography>Reviews</Typography>
          <Typography>Policies</Typography>
          <Typography>Contact Us</Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5">Be the first to know about Us</Typography>
          <Typography>
            Subscribe to get exclusive offers on the world's greatest vacations.
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Your Email Address"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item md={3}>
          <Typography variant="h6">Stay In Touch</Typography>
          <Typography>We're ready to help!</Typography>
          <Box>
            <Typography>
              <PhoneIcon className={classes.icon}></PhoneIcon>
              &nbsp; 123456789
            </Typography>
            <Typography>
              <MailOutlineIcon className={classes.icon}></MailOutlineIcon>
              &nbsp; hellohowareyou@gmail.com
            </Typography>
          </Box>
          <Typography>&copy; Copyright 2020 Huy Bui and Ha Quyen</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
