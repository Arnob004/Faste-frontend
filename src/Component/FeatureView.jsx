import React from "react";
import { JOIN_OPTION_LABELS } from "./utils/constants";


const FeatureView = ({ darkMode, joinOption }) => {
  const textColor = darkMode ? "text-white" : "text-zinc-900";
  return (
    <div className={`${textColor} col-span-2 text-center font-semibold`}>
      {JOIN_OPTION_LABELS[joinOption] || "Unknown option"}
    </div>
  );
};

export default FeatureView;
