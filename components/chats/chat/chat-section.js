"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "../../ui/chats/button";
import { Input } from "../../ui/chats/input";
import { ScrollArea } from "../../ui/chats/scroll-area";
import { Avatar } from "../../ui/chats/avatar";
import { Badge } from "../../ui/chats/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/chats/dropdown-menu";
import EmptyChat from "./empty-chat";
import ChatList from "./chat-list";
import useChatStore from "../../../lib/chat-store";
import ChatSuggestions from "./chat-suggestions";
import { format } from "date-fns";
import { useUsers } from "@/components/intakeform/useUsers";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI("AIzaSyDClUd9xPEd76sIO_H0S5r9hPgs-lSFW8U");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

// Function to generate AI conversation based on common tags
async function generateAIConversation(currentUser, activeChat) {
  const prompt = `
    Current User's Tags: ${currentUser.commonTags.join(", ")}
Other User's Tags: ${activeChat.commonTags.join(", ")}

Create four distinct, charming, and naturally flowing conversation starters based on the shared interests or themes represented by the common tags. Each suggestion should be approachable, engaging, and feel like it could be said casually in a friendly conversation. Output only the sentences, each on a new line, without additional context or explanations
  `;

  // Generate the content using Gemini AI
  const response = await model.generateContent(prompt);

  // Extract the text response
  const responseText = response?.response?.text();
  console.log(responseText);
  // Extract lines and trim whitespace
  return responseText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line); // Remove any empty lines
}

export default function ChatSection() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const previousActiveChatRef = useRef(null); // Reference to track the previous active chat
  const { users } = useUsers();
  const [loading, setLoading] = useState(false); // New loading state
  const {
    status,
    activeChat,
    getCurrentChat,
    sendMessage,
    backToList,
    clearChat,
    viewProfile,
  } = useChatStore();

  const currentUser = users.length > 0 ? users[users.length - 1] : null;

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [getCurrentChat()?.messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!currentUser || !activeChat) return;

      // Check if activeChat has changed
      if (previousActiveChatRef.current !== activeChat) {
        previousActiveChatRef.current = activeChat;
        setLoading(true); // Start loading
        const result = await generateAIConversation(currentUser, activeChat);
        setSuggestions(result);
        setLoading(false); // Stop loading
      }
    };

    fetchSuggestions();
  }, [currentUser, activeChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    sendMessage(inputValue.trim());
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  if (status === "EMPTY") {
    return <EmptyChat />;
  }

  if (status === "LIST") {
    return (
      <div className="h-screen">
        <ChatList />
      </div>
    );
  }

  const currentChat = getCurrentChat();
  const lastMessageDate =
    currentChat?.messages[currentChat.messages.length - 1]?.timestamp;

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b p-4 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={backToList}
              className="mr-2 hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            </Avatar>
            <div>
              <h2 className="font-semibold leading-none">{activeChat.name}</h2>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="font-normal">
                  {activeChat.matchPercentage}% Match
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {lastMessageDate
                    ? `Active ${format(new Date(lastMessageDate), "h:mm a")}`
                    : "Recently active"}
                </span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => viewProfile(activeChat)}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={clearChat}>
                Clear Chat
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          {currentChat?.messages.map((message, index) => {
            const showAvatar =
              message.sender === "ai" &&
              (!currentChat.messages[index - 1] ||
                currentChat.messages[index - 1].sender !== "ai");

            return (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {showAvatar && (
                  <Avatar className="h-6 w-6 mt-1 flex-shrink-0">
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  </Avatar>
                )}
                <div
                  className={`flex flex-col gap-1 ${
                    message.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`relative rounded-2xl px-4 py-2 max-w-[280px] ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground px-2">
                    {format(new Date(message.timestamp), "h:mm a")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t bg-background p-4 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="relative">
          {showSuggestions && (
            <div ref={suggestionsRef}>
              <ChatSuggestions
                onSelectSuggestion={handleSelectSuggestion}
                suggestions={suggestions}
                loading={loading} // Pass loading state to ChatSuggestions
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="pr-10"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="icon"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
