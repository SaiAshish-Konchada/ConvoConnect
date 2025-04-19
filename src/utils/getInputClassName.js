// This is a utility function that determines the appropriate class for each input field.
export const getInputClassName = (field, value) => {
  const base = "input input-bordered w-full pl-10";
  if (!value) return base;

  let isValid = false;

  if (field === "fullName") {
    isValid = value.trim().length > 0;
  } else if (field === "email") {
    isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  } else {
    isValid = value.length >= 6;
  }

  return `${base} ${isValid ? "border-green-500" : "border-red-500"}`;
};
