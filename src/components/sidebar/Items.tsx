import React from "react";

export const Items = (props) => {
  return (
    <div className="flex items-center space-x-4">
      <div>{props.icon}</div>
      <div>{props.text}</div>
    </div>
  );
};
