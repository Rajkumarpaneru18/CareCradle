import { useState, useRef, useEffect } from "react";

import Messages from "../../components/Messages";
import SendMessage from "../../components/SendMessage";
import Layout from "../../layout/Layout";
import { askOpenAI } from "../../services/askOpenAI";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  const sendMessage = async () => {
    const userMessage = {
      username: "User",
      message: message,
    };

    const loadingMessage = {
      username: "NewLife",
      message: "AI is thinking",
      isLoading: true,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      loadingMessage,
    ]);

    //   // API CALL
    const response = await askOpenAI(message);
    const newLifeAIMessage = response;
    const aiMessage = { username: "NewLife", message: newLifeAIMessage };

    setMessages((currentMessages) => {
      return currentMessages.map((m, index) =>
        index === currentMessages.length - 1 ? aiMessage : m
      );
    });
    setMessage("");

    try {
      // API Call
      console.log("Data added");
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage("Error occurred", "ai");
    }
  };

  return (
    <Layout>
      <div className="w-[60vw] max-w-[80vw] flex flex-col">
        {/* Messages container */}
        <div className="flex-grow flex flex-col overflow-y-auto">
          <Messages messages={messages} />
          <div ref={messagesEndRef} />
        </div>
        {/* Send message input */}
        <SendMessage
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </Layout>
  );
};

export default Chat;
