import { useMemo } from "react";
import toast from "react-hot-toast";

const useFormValidation = (formData) => {
  const { fullName, email, password } = formData;

  const allFieldsValid = useMemo(() => {
    return (
      fullName.trim() && /\S+@\S+\.\S+/.test(email) && password.length >= 6
    );
  }, [fullName, email, password]);

  const validateForm = (formData) => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  return { allFieldsValid, validateForm };
};

export default useFormValidation;
