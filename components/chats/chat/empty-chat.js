'use client';

import { MessageSquare } from 'lucide-react';

export default function EmptyChat() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-muted/5 p-8">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Start a Conversation</h2>
        <p className="mt-3 text-muted-foreground">
          Connect with professionals who share your interests. Select a connection from the leaderboard to begin chatting.
        </p>
      </div>
    </div>
  );
}