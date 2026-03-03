import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface ChatContentProps {
  messages: Message[];
}

const ChatContent = ({ messages }: ChatContentProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <h1 className="text-3xl font-semibold">
              How can I help you today?
            </h1>
            <p className="text-gray-500 mt-2">
              Ask anything. Generate ideas, debug code, write content.
            </p>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <div className="bg-gray-200 px-4 py-2 rounded-2xl max-w-xl text-sm">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="w-full text-sm leading-relaxed">
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code({ className, children, ...props }) {
                    return (
                      <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  },
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          )
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContent;