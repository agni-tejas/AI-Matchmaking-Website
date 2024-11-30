"use client";

import { Avatar } from "../../ui/chats/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/chats/dialog";
import { Badge } from "../../ui/chats/badge";
import { Button } from "../../ui/chats/button";
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
//import { currentUser } from "../../../lib/dummy-data";

export default function CurrentUserProfile({ isOpen, onClose, currentUser }) {
  const timestamp = currentUser?.created_at;

  // Convert to a Date object
  const date = new Date(timestamp);

  // Format the date to "day month year"
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleInstagramClick = () => {
    window.open(`${currentUser?.instagram}`, "_blank");
  };
  const handleLinkedInClick = () => {
    window.open(`${currentUser?.linkedin}`, "_blank");
  };
  const handlePortfolioClick = () => {
    window.open(`${currentUser?.website}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center">My Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Avatar className="h-32 w-32 mx-auto border-4 border-primary/10">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
                  {currentUser?.isTopRanked && (
                    <div className="rounded-full bg-yellow-500 p-1">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {currentUser?.bio}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {currentUser?.commonTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h2 className="font-semibold">Professional Info</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser?.bio}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser?.nationality}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser?.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h2 className="font-semibold">Connect</h2>
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
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
