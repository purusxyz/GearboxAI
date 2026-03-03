import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidepanel from "../components/SidePanel";
import Header from "../components/Header";
import ChatContent from "../components/ChatContent";
import ChatInput from "../components/ChatInput";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  const sendPrompt = async (prompt: string) => {
    const token = localStorage.getItem("token");

    // If no token → force login
    if (!token) {
      navigate("/login");
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: prompt,
    };

    const tempId = Date.now() + 1;

    const updatedMessages = [...messages, userMessage];

    // Add user + empty assistant message
    setMessages([
      ...updatedMessages,
      { id: tempId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ REQUIRED
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      // Handle expired / invalid token properly
      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      // Handle other server errors
      if (!response.ok || !response.body) {
        throw new Error("Failed to get response from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        streamedText += decoder.decode(value);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? { ...msg, content: streamedText }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Chat Error:", error);

      // Optional: show error in UI
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? { ...msg, content: "⚠️ Error getting response." }
            : msg
        )
      );
    }
  };

  return (
    <div className="flex h-screen">
      <Sidepanel />

      <div className="flex-1 flex flex-col">
        <Header />
        <ChatContent messages={messages} />

        <div className="bg-white px-6 py-1">
          <div className="max-w-3xl mx-auto">
            <ChatInput sendPrompt={sendPrompt} />
            <p className="text-xs text-gray-500 mt-2 mb-1 text-center">
              ChatGPT can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;