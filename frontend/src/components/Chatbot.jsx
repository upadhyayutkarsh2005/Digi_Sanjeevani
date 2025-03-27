import { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I assist you today?" }]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulating AI response (Replace with actual AI API call)
    setTimeout(() => {
      const botResponse = { sender: "bot", text: "I'm still learning! Please consult a doctor for accurate advice." };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRobot size={24} />
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 bg-white shadow-lg rounded-lg w-80 max-h-96 flex flex-col">
          <div className="flex justify-between items-center bg-blue-500 text-white p-3 rounded-t-lg">
            <h3 className="text-lg font-bold">AI Chatbot</h3>
            <button onClick={() => setIsOpen(false)}><FaTimes size={18} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`p-2 rounded-md ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center p-2 border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-md ml-2">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
