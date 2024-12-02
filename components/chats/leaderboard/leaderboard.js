"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "../../ui/chats/input";
import { ScrollArea } from "../../ui/chats/scroll-area";
import LeaderboardCard from "./leaderboard-card";
import useChatStore from "../../../lib/chat-store";
import { useUsers } from "@/components/intakeform/useUsers";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI("AIzaSyDClUd9xPEd76sIO_H0S5r9hPgs-lSFW8U");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

// Function to get match percentage using Gemini AI
async function getMatchPercentageFromGemini(currentUserTags, userTags) {
  const prompt = `
    Compare the following two sets of tags and provide a similarity percentage (0 to 100). Extract the meaning of the tags of both users and if the tags' meanings align somewhere to similarity, provide the similarity percentage:
    Current User's Tags: ${currentUserTags.join(", ")}
    Other User's Tags: ${userTags.join(", ")}

     After comparison is done,provide only similarity percentage answer with "%" symbol, no words at all should be in the answer. if two sets of tags are completely different with no similarities at all then provide 0%.
  `;

  try {
    // Generate the content using Gemini AI
    const response = await model.generateContent(prompt);

    // Extract the text response
    const responseText = response?.response?.text();

    console.log(responseText);

    // Extract percentage using a regular expression
    const match = responseText.match(/(\d+)%/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    } else {
      console.error("Invalid match percentage format:", responseText);
      return 0; // Default to 0 if parsing fails
    }
  } catch (error) {
    console.error("Error fetching match percentage from Gemini:", error);
    return 0; // Default to 0 on error
  }
}

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const { startChat } = useChatStore();
  const { isLoading, users } = useUsers();
  const [hasCalculated, setHasCalculated] = useState(false);

  // Extract the current user (last user in the list)
  const currentUser = users.length > 0 ? users[users.length - 1] : null;

  useEffect(() => {
    async function updateMatchPercentages() {
      // Only calculate once when the page loads or users change
      if (hasCalculated || !currentUser || users.length === 0) return;

      const usersWithUpdatedMatches = await Promise.all(
        users.map(async (user, index) => {
          if (index === users.length - 1) return user; // Skip current user
          const matchPercentage = await getMatchPercentageFromGemini(
            currentUser.commonTags,
            user.commonTags
          );
          return { ...user, matchPercentage };
        })
      );

      const sortedUsers = usersWithUpdatedMatches
        .filter((_, index) => index !== users.length - 1) // Exclude current user
        .sort((a, b) => b.matchPercentage - a.matchPercentage);

      setUpdatedUsers(sortedUsers);
      setHasCalculated(true); // Mark calculation as done
    }

    updateMatchPercentages();
  }, [users, currentUser, hasCalculated]);

  const filteredUsers = updatedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4 flex-shrink-0">
        <h2 className="text-2xl mb-4 font-semibold">Connections leaderboard</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search connections..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-muted-foreground">
                Generating possible match connections...
              </p>
              <p className="text-sm mt-5 text-center text-muted-foreground">
                &quot;Please wait! Sometimes it takes longer than usual, but
                good things are worth the wait!&quot;
              </p>
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <LeaderboardCard
                key={user.id}
                user={{
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar,
                  matchPercentage: user.matchPercentage,
                  commonTags: user.commonTags,
                  bio: user.bio,
                  lastActive: user.lastActive,
                  isTopRanked: user.isTopRanked,
                  email: user.email,
                  nationality: user.nationality,
                  designation: user.designation,
                  website: user.website,
                  instagram: user.instagram,
                  linkedin: user.linkedin,
                  created_at: user.created_at,
                }}
                currentUser={currentUser}
                onStartChat={() => startChat(user)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-muted-foreground">
                Generating possible match connections...
              </p>
              <p className="text-sm mt-5 text-center text-muted-foreground">
                &quot;Please wait! Sometimes it takes longer than usual, but
                good things are worth the wait!&quot;
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
