import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { getInputClassName } from "../../../utils/getInputClassName"; // If you have a utility function for classes

const PasswordField = ({ value, onChange, showPassword, setShowPassword }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">Password</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="size-5 text-base-content/40" />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        className={getInputClassName("password", value)}
        placeholder="••••••••"
        value={value}
        onChange={onChange}
      />
      <button type="button" className="absolute inset-y-0 right-0 pr-10 flex items-center" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOff className="h-5 w-5 text-base-content/40" /> : <Eye className="h-5 w-5 text-base-content/40" />}
      </button>
    </div>
  </div>
);

export default PasswordField;
