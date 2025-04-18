import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import HomePageConnectGame from "../components/Games/HomePageConnectGame";
import AvatarSection from "../components/Auth/SignUp/AvatarSection";
import FormField from "../components/Auth/SignUp/FormField";
import PasswordField from "../components/Auth/SignUp/PasswordField";
import useFormValidation from "../hooks/useFormValidation";
import useAvatar from "../hooks/useAvatar";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const { allFieldsValid, validateForm } = useFormValidation(formData);
  const { getAvatar, getAvatarMessage, getProgressWidth } = useAvatar(formData, allFieldsValid);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) signup(formData);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-0">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <AvatarSection avatar={getAvatar()} message={getAvatarMessage()} progressWidth={getProgressWidth()} />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              icon={<User className="size-5 text-base-content/40" />}
              field="fullName"
            />
            <FormField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail className="size-5 text-base-content/40" />}
              field="email"
            />
            <PasswordField
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp || !allFieldsValid}>
              {isSigningUp ? <><Loader2 className="h-5 w-5 animate-spin" /> Loading...</> : "Sign up"}
            </button>
          </form>

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

      <HomePageConnectGame title="Create an account" subtitle="Join us and start connecting with others!" />
    </div>
  );
};

export default SignUpPage;
