// pages/LoginPage.jsx

import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import HomePageConnectGame from "../components/Games/HomePageConnectGame";
import LoginForm from "../components/Auth/LoginForm";

/**
 * LoginPage
 * ----------
 * Renders the login layout with animated avatar and the login form.
 */
const LoginPage = () => {
  useThemeStore(); // For future dynamic theming
  const { login, isLoggingIn } = useAuthStore();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Page Grid */}
      <div className="pt-20 sm:pt-24 lg:pt-0 px-6 sm:px-12 h-full grid lg:grid-cols-2 md:grid-cols-1">
        {/* Login Column */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 w-full">
          <LoginForm onSubmit={login} isLoading={isLoggingIn} />
        </div>

        {/* Right-side Visual or Game */}
        <HomePageConnectGame
          title="Welcome back!"
          subtitle="Log in to continue your conversations and stay updated on your messages."
          className="block lg:block"
        />
      </div>
    </div>
  );
};

export default LoginPage;
