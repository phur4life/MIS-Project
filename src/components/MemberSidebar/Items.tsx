import React from "react";

export const Items = (props: { icon: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; text: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => {
  
  return (
    <div className="flex items-center space-x-4">
      <div>{props.icon}</div>
      <div>{props.text}</div>
    </div>
  );
};
