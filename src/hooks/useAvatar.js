import AvatarCheeky from "../assets/avatar-cheeky.png";
import AvatarOpenEyes from "../assets/avatar-open.png";
import AvatarClosedEyes from "../assets/avatar-closed.png";
import AvatarSuccess from "../assets/avatar-success.png";

const useAvatar = (formData, allFieldsValid) => {
  const { fullName, email, password } = formData;

  const getAvatar = () => {
    if (allFieldsValid) return AvatarSuccess; // Show success avatar when all fields are valid
    if (password) return AvatarClosedEyes;
    if (fullName || email) return AvatarOpenEyes;
    return AvatarCheeky;
  };

  const getAvatarMessage = () => {
    if (allFieldsValid) return "🎉 Success! You're ready to go!";
    if (password) return "🙈 Full privacy, no sneaking!";
    if (fullName || email) return "🧐 Spell it right, I'm judging!";
    return "🎉 Ready to join the fun?";
  };

  const getProgressWidth = () => {
    let progress = 0;
    if (fullName.trim()) progress += 34;
    if (email.trim()) progress += 33;
    if (password.trim()) progress += 33;
    return `${progress}%`;
  };

  return { getAvatar, getAvatarMessage, getProgressWidth };
};

export default useAvatar;
