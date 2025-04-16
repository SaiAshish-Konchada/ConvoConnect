import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import HomePageConnectGame from "../components/HomePageConnectGame";
import toast from "react-hot-toast";

import AvatarCheeky from "../assets/avatar-cheeky.png";
import AvatarOpenEyes from "../assets/avatar-open.png";
import AvatarClosedEyes from "../assets/avatar-closed.png";
import AvatarSuccess from "../assets/avatar-success.png"; // Add success avatar

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const isTypingPassword = !!formData.password;
  const isTypingOtherFields = formData.fullName || formData.email;

  // Determine if all fields are valid
  const allFieldsValid =
    formData.fullName.trim() &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.password.length >= 6;

  const getAvatar = () => {
    if (allFieldsValid) return AvatarSuccess; // Show success avatar when all fields are valid
    if (formData.password) return AvatarClosedEyes;
    if (formData.fullName || formData.email) return AvatarOpenEyes;
    return AvatarCheeky;
  };

  const getAvatarMessage = () => {
    if (allFieldsValid) return "🎉 Success! You're ready to go!";
    if (formData.password) return "🙈 Full privacy, no sneaking!";
    if (formData.fullName || formData.email)
      return "🧐 Spell it right, I'm judging!";
    return "🎉 Ready to join the fun?";
  };

  const getProgressWidth = () => {
    let progress = 0;
    if (formData.fullName.trim()) progress += 34;
    if (formData.email.trim()) progress += 33;
    if (formData.password.trim()) progress += 33;
    return `${progress}%`;
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const getInputClassName = (field, value) => {
    const base = "input input-bordered w-full pl-10";
    if (!value) return base;

    const isValid =
      field === "fullName"
        ? value.trim().length > 0
        : field === "email"
        ? /\S+@\S+\.\S+/.test(value)
        : value.length >= 6;

    return `${base} ${isValid ? "border-green-500" : "border-red-500"}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-0">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Avatar & Message */}
          <div className="flex flex-col items-center gap-2 mb-4 pt-12 sm:pt-0">
            <motion.img
              src={getAvatar()}
              alt="Signup avatar"
              className="w-24 h-24 rounded-full border-4 border-primary"
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.p
              key={getAvatarMessage()}
              className="text-base text-base-content font-semibold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {getAvatarMessage()}
            </motion.p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: getProgressWidth() }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={getInputClassName("fullName", formData.fullName)}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={getInputClassName("email", formData.email)}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
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
                  className={getInputClassName("password", formData.password)}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp || !allFieldsValid}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-base-content/60">
              Rejoining the party?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <HomePageConnectGame
        title="Create an account"
        subtitle="Join us and start connecting with others!"
      />
    </div>
  );
};

export default SignUpPage;
