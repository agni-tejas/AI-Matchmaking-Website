"use client";

import { Button } from "../../ui/chats/button";
import { Avatar } from "../../ui/chats/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/chats/hover-card";
import { Badge } from "../../ui/chats/badge";
import { MessageSquare, Star, User } from "lucide-react";
import useChatStore, { generateAIConversation } from "../../../lib/chat-store";

export default function LeaderboardCard({ user }) {
  const { startChat, viewProfile } = useChatStore();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={`group relative rounded-xl border bg-card p-4 transition-all hover:shadow-md ${
            user.isTopRanked ? "border-yellow-500/50" : ""
          }`}
        >
          {user.isTopRanked && (
            <div className="absolute -right-1 -top-1 rounded-full bg-yellow-500 p-1">
              <Star className="h-3 w-3 text-white" />
            </div>
          )}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <img
                src={user.avatar || "/default-avatar.png"} // Fallback in case avatar is not provided
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{user.name}</h3>
                <Badge variant="secondary" className="font-normal">
                  {user.matchPercentage || 0}% Match
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {user.commonTags?.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
                {user.commonTags?.length > 2 && (
                  <Badge variant="outline" className="text-xs font-normal">
                    +{user.commonTags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button
              onClick={() => {
                startChat(user);
              }}
              className="flex-1 gap-2"
              variant="secondary"
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
            <Button
              onClick={() => viewProfile(user)}
              variant="outline"
              className="gap-2"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <img
                src={user.avatar || "/default-avatar.png"} // Fallback for hover card
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            </Avatar>
            <div>
              <h4 className="font-medium">{user.name}</h4>
              <p className="text-sm text-muted-foreground">
                {user.matchPercentage || 0}% Match • {user.lastActive || "N/A"}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {user.bio || "No bio available."}
          </p>
          <div className="flex flex-wrap gap-1">
            {user.commonTags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
