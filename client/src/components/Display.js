import React from "react";

export default function Display(props) {
  const h = () => {
    if (props.time.h === 0) {
      return "";
    } else {
      return (
        <span>{props.time.h >= 10 ? props.time.h : "0" + props.time.h}</span>
      );
    }
  };
  return (
    <div>
      {h()}&nbsp;:&nbsp;
      <p>{props.time.m >= 10 ? props.time.m : "0" + props.time.m}</p>
      &nbsp;:&nbsp;
      <p>{props.time.s >= 10 ? props.time.s : "0" + props.time.s}</p>
      &nbsp;:&nbsp;
      <p>{props.time.ms >= 10 ? props.time.ms : "0" + props.time.ms}</p>
      &nbsp;:&nbsp;
    </div>
  );
}
