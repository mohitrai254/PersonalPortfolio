import { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      content: "Hi! I'm Mohit's AI assistant. How can I help you today?",
      role: "assistant",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { content: userMessage, role: "user" }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { content: data.message, role: "assistant" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {!isOpen && (
        <button
          className={`${styles.chatButton} hover-scale`}
          onClick={() => setIsOpen(true)}
        >
          <IoChatbubbleEllipses />
          <span>Chat with me!</span>
        </button>
      )}

      {isOpen && (
        <div className={`${styles.chatWindow} animate-scaleIn`}>
          <div className={styles.chatHeader}>
            <h3>Chat with Mohit's AI Assistant</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <IoClose />
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.role === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.loadingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className={styles.input}
            />
            <button
              type="submit"
              className={`${styles.sendButton} hover-scale`}
              disabled={isLoading || !inputMessage.trim()}
            >
              <IoMdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
