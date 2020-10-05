import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: " 0",
    backgroundColor: theme.palette.primary.main,
    "& button": {
      color: theme.palette.primary.secondary,
      "& a": {
        textDecoration: "none",
        color: theme.palette.primary.secondary
      }
    }
  }
}));

function Header(props) {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Box mr="auto">
            <Typography>Chargers</Typography>
          </Box>
          <Box m="auto">
            <Button>
              <Link to="/">Home</Link>
            </Button>
            <Button>
              <Link to="/location">Location</Link>
            </Button>
            <Button>
              <Link to="/about">About Us</Link>
            </Button>
          </Box>
          <Box ml="auto">
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button>
              <Link to="/register">Register</Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
