import React from "react";

export default function ExampleView(props) {
  return (
    <div>
      <h1>
        {props.userInfor.map((infor) => (
          <li>
            <p>{infor.id}</p>
            <p>{infor.username}</p>
          </li>
        ))}
      </h1>
      <div>You should not be able to access this without being logged in</div>
      <div>
        <button onClick={props.loadProtectedData}>
          Click to load protected content from API
        </button>
      </div>
    </div>
  );
}
