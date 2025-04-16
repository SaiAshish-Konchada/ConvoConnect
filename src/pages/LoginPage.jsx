import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import HomePageConnectGame from "../components/HomePageConnectGame";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/useThemeStore"; // Import the theme store
import AvatarOpenEyes from "../assets/avatar-open.png";
import AvatarClosedEyes from "../assets/avatar-closed.png";
import AvatarCheeky from "../assets/avatar-cheeky.png";
import AvatarSuccess from "../assets/avatar-success.png"; // Add success avatar

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);
  const { login, isLoggingIn } = useAuthStore();
  const { theme } = useThemeStore(); // Get the current theme from global state

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const isIdle = formData.email === "" && formData.password === "";
  const isPasswordMode = focusedField === "password" && !showPassword;

  const getInputBorderClass = (field, value) => {
    if (!value) return "input input-bordered w-full pl-10"; // Neutral
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
    return isValid ? (
      <CheckCircle className="absolute inset-y-0 right-0 pr-3 text-green-500" />
    ) : (
      <XCircle className="absolute inset-y-0 right-0 pr-3 text-red-500" />
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const progressValue =
    ((formData.email.length > 0 ? 1 : 0) +
      (formData.password.length > 0 ? 1 : 0)) *
    50;

  // Determine if all fields are valid
  const allFieldsValid =
    validateEmail(formData.email) && validatePassword(formData.password);

    return (
      <div className="min-h-screen overflow-x-hidden">
        {/* App Header */}
    
        {/* Main Content with padding to prevent overlap with the fixed header */}
        <div className="pt-20 sm:pt-24 lg:pt-0 px-6 sm:px-12 h-full grid lg:grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col justify-center items-center p-6 sm:p-12 w-full">
            <div className="w-full max-w-md space-y-8">
              {/* Avatar + Message */}
              <div className="flex flex-col items-center gap-2 mb-4">
                <motion.img
                  src={
                    allFieldsValid
                      ? AvatarSuccess // Show success avatar when all fields are valid
                      : isIdle
                      ? AvatarCheeky
                      : isPasswordMode
                      ? AvatarClosedEyes
                      : AvatarOpenEyes
                  }
                  alt="Login avatar"
                  className="w-24 h-24 rounded-full border-4 border-primary" // Add border and rounded-full to make it circular
                  initial={{ y: 0 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
    
                <motion.p
                  key={
                    allFieldsValid
                      ? "success"
                      : isIdle
                      ? "idle"
                      : isPasswordMode
                      ? "closed"
                      : "open"
                  }
                  className={`text-base font-semibold text-center`} // Apply dynamic text color class
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {allFieldsValid
                    ? "🎉 Success! You're all set!"
                    : isIdle
                    ? "🔑 Welcome back! Ready to log in?" // Make sure `textColorClass` is here too
                    : isPasswordMode
                    ? "🙈 Full Privacy... I see nothing, promise!"
                    : "🧐 Spell it right, I'm judging!"}
                </motion.p>
              </div>
    
              {/* Progress */}
              <motion.div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <motion.div
                  className="bg-primary rounded-full h-2.5"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
    
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
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
    
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoggingIn || !allFieldsValid}
                >
                  {isLoggingIn ? (
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
                  <Link to="/signup" className="link link-primary">
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
    
          <HomePageConnectGame
            title="Welcome back!"
            subtitle="Log in to continue your conversations and stay updated on your messages."
            className="block lg:block" // Show on mobile and desktop
          />
        </div>
      </div>
    );
  }    

export default LoginPage;
