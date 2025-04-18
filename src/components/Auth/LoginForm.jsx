import { useState, useMemo } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import AvatarOpenEyes from "../../assets/avatar-open.png";
import AvatarClosedEyes from "../../assets/avatar-closed.png";
import AvatarCheeky from "../../assets/avatar-cheeky.png";
import AvatarSuccess from "../../assets/avatar-success.png";

/**
 * Validation utilities (can be moved to a hook or util file)
 */
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => password.length >= 6;

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const isIdle = formData.email === "" && formData.password === "";
  const isPasswordMode = focusedField === "password" && !showPassword;

  const allFieldsValid = useMemo(
    () => validateEmail(formData.email) && validatePassword(formData.password),
    [formData]
  );

  const progressValue = useMemo(() => {
    return ((formData.email ? 1 : 0) + (formData.password ? 1 : 0)) * 50;
  }, [formData]);

  const avatarImage = useMemo(() => {
    if (allFieldsValid) return AvatarSuccess;
    if (isIdle) return AvatarCheeky;
    if (isPasswordMode) return AvatarClosedEyes;
    return AvatarOpenEyes;
  }, [allFieldsValid, isIdle, isPasswordMode]);

  const statusMessage = useMemo(() => {
    if (allFieldsValid) return "🎉 Success! You're all set!";
    if (isIdle) return "🔑 Welcome back! Ready to log in?";
    if (isPasswordMode) return "🙈 Full Privacy... I see nothing, promise!";
    return "🧐 Spell it right, I'm judging!";
  }, [allFieldsValid, isIdle, isPasswordMode]);

  const getInputBorderClass = (field, value) => {
    if (!value) return "input input-bordered w-full pl-10";
    const isValid =
      field === "email" ? validateEmail(value) : validatePassword(value);
    return `input input-bordered w-full pl-10 ${
      isValid ? "border-green-500" : "border-red-500"
    }`;
  };

  const getFieldIcon = (field, value) => {
    if (!value) return null;
    const isValid =
      field === "email" ? validateEmail(value) : validatePassword(value);
    const IconComponent = isValid ? CheckCircle : XCircle;
    const colorClass = isValid ? "text-green-500" : "text-red-500";

    return (
      <IconComponent
        aria-hidden="true"
        className={`absolute inset-y-0 right-0 pr-3 ${colorClass}`}
      />
    );
  };

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allFieldsValid && onSubmit) onSubmit(formData);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <motion.img
          src={avatarImage}
          alt="Login avatar"
          className="w-24 h-24 rounded-full border-4 border-primary"
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.p
          className="text-base font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {statusMessage}
        </motion.p>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="w-full bg-gray-200 rounded-full h-2.5 mb-4"
        aria-hidden="true"
      >
        <motion.div
          className="bg-primary rounded-full h-2.5"
          initial={{ width: 0 }}
          animate={{ width: `${progressValue}%` }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        aria-label="Login form"
      >
        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type="email"
            className={getInputBorderClass("email", formData.email)}
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />
          {getFieldIcon("email", formData.email)}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={getInputBorderClass("password", formData.password)}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
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
            {getFieldIcon("password", formData.password)}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading || !allFieldsValid}
          aria-disabled={isLoading || !allFieldsValid}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center">
        <p className="text-base-content/60">
          Ready to join the club?{" "}
          <a href="/signup" className="link link-primary">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default LoginForm;
