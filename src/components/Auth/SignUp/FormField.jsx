import React from "react";
import { getInputClassName } from "../../../utils/getInputClassName"; // If you have a utility function for classes
import PropTypes from "prop-types";
const FormField = ({ label, type, value, onChange, icon, field }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        className={getInputClassName(field, value)}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired, // label is a required string
  type: PropTypes.string.isRequired, // type is a required string (like "text", "password", etc.)
  value: PropTypes.string.isRequired, // value should be a string (form field value)
  onChange: PropTypes.func.isRequired, // onChange should be a function (event handler)
  icon: PropTypes.node, // icon can be any renderable node (element, string, etc.)
  field: PropTypes.string.isRequired, // field is a required string (field name or ID)
};

export default FormField;
