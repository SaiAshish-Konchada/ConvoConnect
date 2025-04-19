import React from "react";
import PropTypes from "prop-types";
const InfoField = ({ icon, label, value }) => (
  <div className="space-y-1.5">
    <div className="text-sm text-zinc-500 flex items-center gap-2">
      {icon}
      {label}
    </div>
    <p className="px-4 py-2.5 bg-base-100 rounded-lg border border-zinc-600 shadow-inner">
      {value}
    </p>
  </div>
);
InfoField.propTypes = {
  icon: PropTypes.node, // icon can be any React node, like an icon or JSX
  label: PropTypes.string.isRequired, // label is required and should be a string
  value: PropTypes.string.isRequired, // value is required and should be a string
};

export default InfoField;
