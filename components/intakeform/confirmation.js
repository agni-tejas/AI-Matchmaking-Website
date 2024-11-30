"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/intakeform/button";
import { useRouter } from "next/navigation";

export default function Confirmation({ formData }) {
  const router = useRouter();

  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <CheckCircle className="h-24 w-24 text-green-500" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Profile Created!</h2>
        <p className="text-muted-foreground">
          We'll use your inputs to suggest the best connections.
        </p>
      </div>

      {formData.profilePicture && (
        <div className="mt-4">
          <div className="relative h-24 w-24 mx-auto overflow-hidden rounded-full">
            <Image
              src={URL.createObjectURL(formData.profilePicture)}
              alt="Profile picture"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-sm mx-auto space-y-4">
        <Button
          onClick={() => router.push("/chats")}
          variant="outline"
          className="w-full"
        >
          Connect People
        </Button>
      </div>
    </div>
  );
}
