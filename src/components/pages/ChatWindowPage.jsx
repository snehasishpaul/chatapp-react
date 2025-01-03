import { useEffect, useRef, useState } from "react";
import ChatHeader from "../chat/ChatHeader";
import ChatMain from "../chat/ChatMain";
import ChatFooter from "../chat/ChatFooter";

const ChatWindowPage = () => {
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hi, everyone!" },
    { sender: "username", text: "Hello, Alice!" },
    { sender: "Bob", text: "Hey, how's it going?" },
    { sender: "username", text: "I'm good, thanks for asking!" },
    { sender: "Alice", text: "What are we working on today?" },
    { sender: "username", text: "We're discussing project deadlines." },
    { sender: "Alice", text: "Hi, everyone!" },
    { sender: "username", text: "Hello, Alice!" },
    { sender: "Bob", text: "Hey, how's it going?" },
    { sender: "username", text: "I'm good, thanks for asking!" },
    { sender: "Alice", text: "What are we working on today?" },
    { sender: "username", text: "We're discussing project deadlines." },
    { sender: "Alice", text: "Hi, everyone!" },
    { sender: "username", text: "Hello, Alice!" },
    { sender: "Bob", text: "Hey, how's it going?" },
    { sender: "username", text: "I'm good, thanks for asking!" },
    { sender: "Alice", text: "What are we working on today?" },
    { sender: "username", text: "We're discussing project deadlines." },
  ]);
  const [message, setMessage] = useState("");
  const messageBoxRef = useRef(null);

  const handleSend = ({ username = "" }) => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { sender: username, text: message }]);
      setMessage("");
    }
  };

  const handleFileSend = (e) => {
    e.preventDefault();
    // const file = e.target.files[0];
    // if (file) {
    //   setMessages((prev) => [
    //     ...prev,
    //     { sender: username, text: `📎 ${file.name}` },
    //   ]);
    // }
  };

  // Scroll to the bottom of the message box whenever messages are updated
  useEffect(() => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Header */}
      <ChatHeader />

      {/* Main Content */}
      <ChatMain ref={messageBoxRef} messages={messages} username={"username"} />

      {/* Footer */}
      <ChatFooter
        onSetMessage={setMessages}
        onHandleSend={handleSend}
        onHandleFileSend={handleFileSend}
      />
    </div>
  );
};

export default ChatWindowPage;
