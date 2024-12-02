"use client";

import { Badge } from "../../ui/chats/badge";
import { Avatar } from "../../ui/chats/avatar";
import { ScrollArea } from "../../ui/chats/scroll-area";
import {
  Briefcase,
  MapPin,
  Calendar,
  Mail,
  Link as LinkIcon,
  Instagram,
  Linkedin,
  Star,
} from "lucide-react";
import { Button } from "../../ui/chats/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/chats/card";
import { Progress } from "../../ui/chats/progress";

export default function UserProfile({ user }) {
  if (!user) return null;
  const timestamp = user?.created_at;

  // Convert to a Date object
  const date = new Date(timestamp);

  // Format the date to "day month year"
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleInstagramClick = () => {
    window.open(`${user.instagram}`, "_blank");
  };
  const handleLinkedInClick = () => {
    window.open(`${user.linkedin}`, "_blank");
  };
  const handlePortfolioClick = () => {
    window.open(`${user.website}`, "_blank");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="relative flex-shrink-0">
        <Avatar className="absolute left-1/2 top-8 -translate-x-1/2 h-32 w-32 border-4 border-background shadow-xl">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-32 w-32 rounded-full object-cover"
          />
        </Avatar>
      </div>

      <ScrollArea className="flex-1 pt-48">
        <div className="px-6 pb-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.isTopRanked && (
                <div className="rounded-full bg-yellow-500 p-1">
                  <Star className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">{user.bio}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Match Analysis</CardTitle>
              <CardDescription>
                How well you match with {user.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Match Score</span>
                  <span className="text-sm text-muted-foreground">
                    {user.matchPercentage}%
                  </span>
                </div>
                <Progress value={user.matchPercentage} className="h-2" />
              </div>
              <div className="pt-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Common Interests
                  </span>
                  <span className="font-medium">{user.commonTags.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Active</span>
                  <span className="font-medium">{user.lastActive}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Common Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.commonTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Professional Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{user.designation}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.nationality}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleInstagramClick}
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleLinkedInClick}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handlePortfolioClick}
                >
                  <LinkIcon className="h-4 w-4" />
                  Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
