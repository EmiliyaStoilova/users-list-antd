import React from "react";
import { Spin } from "antd";

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
      <Spin size="large" />
    </div>
  );
};
