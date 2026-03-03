import { ArrowUp, AudioLines, MicIcon, Plus } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/Input";

export default function ChatInput({
  sendPrompt,
}: {
  sendPrompt: (message: string) => void;
}) {
  const [promptInput, setPromptInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    sendPrompt(promptInput);
    setPromptInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 w-full rounded-full border border-gray-300 bg-white px-3 py-2 shadow-sm">
        <Plus size={20} />

        <Input
          placeholder="Ask anything"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          className="border-none shadow-none focus:border-none"
        />

        <MicIcon size={20} className="text-gray-500" />

        {promptInput.length > 0 ? (
          <button
            type="submit"
            className="flex items-center justify-center rounded-full bg-black p-2 text-white"
          >
            <ArrowUp size={18} />
          </button>
        ) : (
          <div className="flex items-center justify-center rounded-full bg-gray-200 p-2">
            <AudioLines size={18} />
          </div>
        )}
      </div>
    </form>
  );
}