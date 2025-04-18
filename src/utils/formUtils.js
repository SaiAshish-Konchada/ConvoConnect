// utils/formUtils.js

export const getInputClassName = (field, value) => {
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
  