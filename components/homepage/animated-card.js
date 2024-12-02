"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import CurrentUserProfile from "../chats/profile/current-user-profile";

export function AnimatedCard({ user }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative overflow-hidden rounded-xl group cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="aspect-[3/4] relative">
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-1">{user.name}</h3>
            {user.designation && (
              <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                {user.designation}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <CurrentUserProfile
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        currentUser={user}
      />
    </>
  );
}
