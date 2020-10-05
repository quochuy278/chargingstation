import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "50%"
  },
  inf: {
    color: theme.palette.primary.main,
    fontSize: "1.4rem"
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Grid
          container
          alignItems="flex-end"
          justify="center"
          spacing={6}
          m={6}
        >
          <Grid item md={4}>
            <img
              className={classes.img}
              src="../img/business.svg"
              alt="img"
            ></img>
            <Typography className={classes.inf}>Businesses</Typography>
            <Typography>
              Premium EV charging for customers and employees.
            </Typography>
          </Grid>
          <Grid item md={4}>
            <img className={classes.img} src="../img/fleet.svg" alt="img"></img>
            <Typography className={classes.inf}>Fleets</Typography>
            <Typography>
              Intelligent, flexible charging solutions to meet all your fleet
              needs.
            </Typography>
          </Grid>
          <Grid item md={4}>
            <img
              className={classes.img}
              src="../img/drivers.svg"
              alt="img"
            ></img>
            <Typography className={classes.inf}>Drivers</Typography>
            <Typography>
              We make it easy to charge here, there and everywhere.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
