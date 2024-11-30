"use client";

import { Sparkles } from "lucide-react";
import { Button } from "../../ui/chats/button";

export default function ChatSuggestions({
  onSelectSuggestion,
  suggestions,
  loading,
  regenerateSuggestions,
}) {
  return (
    <div className="absolute bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-background rounded-lg border shadow-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Suggested messages</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5"
          onClick={regenerateSuggestions} // Call the regenerateSuggestions function
          disabled // Disable the button while loading
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs">{loading ? "Generating..." : ""}</span>
        </Button>
      </div>
      <div className="grid gap-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div
              className="h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin mb-2"
              aria-label="Loading spinner"
            ></div>
            <p className="text-sm text-muted-foreground">
              Generating possible conversations...
            </p>
          </div>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
              className="text-left p-3 text-sm rounded-md hover:bg-muted transition-colors duration-200 border border-transparent hover:border-border"
            >
              {suggestion}
            </button>
          ))
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            No suggestions available.
          </div>
        )}
      </div>
    </div>
  );
}
