import React, { FunctionComponent } from "react";

export const ShadowedLayout: FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
  return <div className="shadow-md rounded-md p-4">{children}</div>;
};
