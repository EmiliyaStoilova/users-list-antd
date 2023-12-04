import React, { FunctionComponent } from "react";

export const Layout: FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
  return <div className="py-8 px-4 lg:px-0 mx-auto max-w-5xl">{children}</div>;
};
