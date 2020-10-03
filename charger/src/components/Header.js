import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Typography, Box } from "@material-ui/core";
import LoginRegisterTab from "./LoginRegisterTab";

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

function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            <Button onClick={handleClickOpen}>Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <LoginRegisterTab
        open={open}
        handleClose={handleClose}
      ></LoginRegisterTab>
    </div>
  );
}

export default Header;
