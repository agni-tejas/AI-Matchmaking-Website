"use client";

import { MessageSquare, Search } from "lucide-react";
import { ScrollArea } from "../../ui/chats/scroll-area";
import { Avatar } from "../../ui/chats/avatar";
import { Input } from "../../ui/chats/input";
import { Badge } from "../../ui/chats/badge";
import useChatStore from "../../../lib/chat-store";

export default function ChatList() {
  const { chatHistory, startChat } = useChatStore();

  if (!chatHistory.length) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">No Conversations Yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start chatting with someone from the connections list
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="mb-4 text-xl font-semibold">Recent Chats</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-9" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {chatHistory.map((chat) => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            const hasUnread = false; // TODO: Implement unread status

            return (
              <div
                key={chat.id}
                className="group flex cursor-pointer items-center gap-3 bg-background p-4 transition-colors hover:bg-muted/50"
                onClick={() => startChat(chat)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary/10">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </Avatar>
                  {hasUnread && (
                    <Badge
                      className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-0"
                      variant="destructive"
                    >
                      2
                    </Badge>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-medium truncate pr-2">{chat.name}</h3>
                    {lastMessage && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(lastMessage.timestamp).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {lastMessage ? lastMessage.text : "No messages yet"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Match: {chat.matchPercentage}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
