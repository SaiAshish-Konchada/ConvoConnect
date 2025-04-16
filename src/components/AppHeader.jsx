import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  MessageCircle,
  Settings,
  User,
  CheckCircle,
  Users,
} from "lucide-react";

const AppHeader = ({ onVibeClick }) => {
  const { logout, authUser } = useAuthStore();

  return (
    <>
      <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              {/* Users Icon on the left */}
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary hover:scale-110 transition-transform duration-200" />
              </div>
              <h1 className="text-lg font-bold hover:text-primary transition-colors">
                ConvoConnect
              </h1>
            </Link>

            <div className="flex items-center gap-4">
              <button
                className="btn btn-sm gap-2 hover:bg-primary/20 transition-all"
                onClick={onVibeClick}
              >
                <CheckCircle className="w-5 h-5 text-primary hover:text-accent transition-all" />
                <span className="hidden sm:inline">Vibe Check</span>
              </button>

              <Link
                to="/settings"
                className="btn btn-sm gap-2 hover:bg-base-200/50 transition-all"
              >
                <Settings className="w-4 h-4 text-base-content hover:text-primary transition-colors" />
                <span className="hidden sm:inline">Themes</span>
              </Link>

              {authUser && (
                <>
                  <Link
                    to="/profile"
                    className="btn btn-sm gap-2 hover:bg-base-200/50 transition-all"
                  >
                    <User className="w-4 h-4 text-base-content hover:text-primary transition-colors" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button
                    className="flex gap-2 items-center hover:bg-primary/10 transition-all"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 text-base-content hover:text-primary transition-colors" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
