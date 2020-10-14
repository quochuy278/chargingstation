import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Price(props) {
  console.log(props);
  const [hiden, setHiden] = useState(false);
  const handle = () => {
    props.price();
    setHiden(true);
  };
  const handleClear = () => {
    props.clear();
  };
  return (
    <Container>
      <Box css={{ border: "1px solid" }} m={5}>
        <Typography variant="h3">Your bill</Typography>
        <Box m={4}>
          <Typography>Name: {props.selectedCharger.name}</Typography>
          <Typography>Location: {props.selectedCharger.location}</Typography>
          <Typography>Speed: {props.selectedCharger.speed}</Typography>
          <Typography>
            Connector Type: {props.selectedCharger.connectorType}
          </Typography>
          <Typography>
            Time: {props.time.ms}ms: {props.time.s}s: {props.time.m}m:
            {props.time.h}h
          </Typography>
        </Box>
        <Box m={3}>
          {!hiden ? (
            <Button onClick={handle}>CONFIRM</Button>
          ) : (
            <div>
              <Typography>{props.energyUsed}</Typography>
              <Typography variant="h6">Total is {props.totalPrice}e</Typography>

              <Button onClick={handleClear}>
                <Link to="location">Back to Location</Link>
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
}
