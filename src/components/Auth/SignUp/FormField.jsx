import React from "react";
import { getInputClassName } from "../../../utils/getInputClassName"; // If you have a utility function for classes

const FormField = ({ label, type, value, onChange, icon, field }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
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

export default FormField;
