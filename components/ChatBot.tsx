"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to the state
    const newMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setLoading(true); // Set loading to true

    try {
      // Send user message to the API
      const response = await axios.post(
        "https://chat-gpt26.p.rapidapi.com/",
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, newMessage],
        },
        {
          headers: {
            "x-rapidapi-key": "5b3f00853emshd2b157741e7b0bep146ae8jsn3960d3ec0849",
            "x-rapidapi-host": "chat-gpt26.p.rapidapi.com",
            "Content-Type": "application/json",
          }
        }
      );

      // Get the bot's response
      const botReply: Message = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      // Add bot's reply to the state
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setLoading(false); // Set loading to false
    }

    setInput(""); // Clear input after sending
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <div>
      {/* Chatbot Button */}
      <button
        onClick={toggleChat}
        className="fixed right-5 bottom-5 text-white p-1 rounded-md shadow-lg transition-all flex items-center justify-center"
      >
        <img src="../icons/chat_bot.svg" alt="Chatbot" className="w-14 h-14" />
      </button>

      {/* Chat Section */}
      {isOpen && (
        <div className="fixed right-5 bottom-16 bg-white shadow-lg w-1/4 h-4/5 rounded-lg p-4 border border-gray-200 flex flex-col z-10">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold text-gray-700">E-Bot</h2>
            <button onClick={toggleChat} className="text-gray-500 hover:text-red-500">
              ✖
            </button>
          </div>
          <div className="mt-4 flex-grow overflow-y-auto">
            {/* Display Chat Messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg mb-2 ${message.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100"
                  }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}

            {loading && (
              <div className="flex items-center justify-center mt-4">
                <svg className="w-6 h-6 text-blue-500 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="none"
                    d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2zm16 0a8 8 0 00-8 8v2a10 10 0 0010-10h-2z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="mt-2">
            <form onSubmit={sendMessage} className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="ml-2 bg-[#000] text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;