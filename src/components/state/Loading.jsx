import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col  justify-center items-center">
      <p className="animate-pulse font-bold">Loading</p>
      <progress className="progress w-56"></progress>
    </div>
  );
};

export default Loading;
