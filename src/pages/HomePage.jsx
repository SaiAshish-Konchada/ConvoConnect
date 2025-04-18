// pages/HomePage.jsx

import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Chat/Sidebar";
import IdleChatScreen from "../components/IdleChatScreen/IdleChatScreen";
import ChatWindow from "../components/Chat/ChatWindow";

/**
 * HomePage Component
 * ------------------
 * Main chat interface.
 * Displays a sidebar and either the idle screen or active chat window
 * based on whether a user is selected.
 */
const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <main
      className="h-screen bg-base-200"
      role="main"
      aria-label="Chat interface"
    >
      <div className="flex items-center justify-center pt-20 px-4">
        <section className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {selectedUser ? <ChatWindow /> : <IdleChatScreen />}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
