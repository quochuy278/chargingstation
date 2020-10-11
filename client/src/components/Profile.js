import React from "react";

export default function ExampleView(props) {
  props.getUser();
  return (
    <div>
      <div>You should not be able to access this without being logged in</div>
      <div>
        <button onClick={props.loadProtectedData}>
          Click to load protected content from API
        </button>
      </div>
    </div>
  );
}
