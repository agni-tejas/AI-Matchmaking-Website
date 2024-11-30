"use client";

import { useState } from "react";
import { Avatar } from "../../ui/chats/avatar";
import { Button } from "../../ui/chats/button";
import CurrentUserProfile from "./current-user-profile";
//import { currentUser } from "../../../lib/dummy-data";
import { useUsers } from "@/components/intakeform/useUsers";

export default function CurrentUserAvatar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { users } = useUsers();

  const currentUser = users?.length > 0 ? users[users.length - 1] : null;

  const firstName = currentUser?.name;

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        className="rounded-full h-12 w-12 p-0"
        onClick={() => setIsProfileOpen(true)}
      >
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        </Avatar>
      </Button>
      <span className="font-medium">{firstName}</span>

      <CurrentUserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
}
