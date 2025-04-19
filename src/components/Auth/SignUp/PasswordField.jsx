import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { getInputClassName } from "../../../utils/getInputClassName"; // If you have a utility function for classes
import PropTypes from "prop-types";

const PasswordField = ({ value, onChange, showPassword, setShowPassword }) => (
  <div className="form-control">
    <label htmlFor="password" className="label">
      {" "}
      {/* Added htmlFor */}
      <span className="label-text font-medium">Password</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="size-5 text-base-content/40" />
      </div>
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        className={getInputClassName("password", value)}
        placeholder="••••••••"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-10 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-base-content/40" />
        ) : (
          <Eye className="h-5 w-5 text-base-content/40" />
        )}
      </button>
    </div>
  </div>
);

PasswordField.propTypes = {
  value: PropTypes.string.isRequired, // value should be a required string
  onChange: PropTypes.func.isRequired, // onChange should be a required function
  showPassword: PropTypes.bool.isRequired, // showPassword should be a required boolean
  setShowPassword: PropTypes.func.isRequired, // setShowPassword should be a required function
};
export default PasswordField;
