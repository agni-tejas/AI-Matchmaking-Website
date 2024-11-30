"use client";

import ChatSection from "../../components/chats/chat/chat-section";
import Leaderboard from "../../components/chats/leaderboard/leaderboard";
import UserProfile from "../../components/chats/profile/user-profile";
import CurrentUserAvatar from "../../components/chats/profile/current-user-avatar";
import { ThemeToggle } from "../../components/chats/theme-toggle";
import useChatStore from "../../lib/chat-store";

export default function Home() {
  const { activeChat, showProfile } = useChatStore();

  return (
    <main
      className="grid h-screen max-h-screen overflow-hidden bg-background"
      style={{
        gridTemplateColumns: showProfile ? "1fr 1fr 400px" : "1fr 400px",
      }}
    >
      <div className="flex flex-col h-full border-r">
        <div className="flex-shrink-0 p-4 border-b">
          <CurrentUserAvatar />
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatSection />
        </div>
      </div>
      {showProfile && activeChat && (
        <div className="h-full border-r overflow-hidden">
          <UserProfile user={activeChat} />
        </div>
      )}
      <div className="h-full overflow-hidden">
        <Leaderboard />
      </div>
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>
    </main>
  );
}
