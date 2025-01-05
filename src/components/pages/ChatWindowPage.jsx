import { useEffect, useRef, useState } from "react";
import ChatHeader from "../chat/ChatHeader";
import ChatMain from "../chat/ChatMain";
import ChatFooter from "../chat/ChatFooter";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseURL } from "../services/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { loadMessagesApi } from "../services/ApiServices";

// const chatMessages = [
//   { sender: "Alice", text: "Hi, everyone!" },
//   { sender: "username", text: "Hello, Alice!" },
//   { sender: "Bob", text: "Hey, how's it going?" },
//   { sender: "username", text: "I'm good, thanks for asking!" },
//   { sender: "Alice", text: "What are we working on today?" },
//   { sender: "username", text: "We're discussing project deadlines." },
//   { sender: "Alice", text: "Hi, everyone!" },
//   { sender: "username", text: "Hello, Alice!" },
//   { sender: "Bob", text: "Hey, how's it going?" },
//   { sender: "username", text: "I'm good, thanks for asking!" },
//   { sender: "Alice", text: "What are we working on today?" },
//   { sender: "username", text: "We're discussing project deadlines." },
//   { sender: "Alice", text: "Hi, everyone!" },
//   { sender: "username", text: "Hello, Alice!" },
//   { sender: "Bob", text: "Hey, how's it going?" },
//   { sender: "username", text: "I'm good, thanks for asking!" },
//   { sender: "Alice", text: "What are we working on today?" },
//   { sender: "username", text: "We're discussing project deadlines." },
// ];

const ChatWindowPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [details, setDetails] = useChatContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!details.connected) {
      navigate("/");
    }
  }, [details.connected, navigate]);

  useEffect(() => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchMessages() {
      const response = await loadMessagesApi(
        details.roomId,
        abortController.signal
      );
      if (response.httpStatus === "OK") {
        setMessages(response.content);
      }
    }

    if (details.connected) {
      fetchMessages();
    }

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        console.log("Connected to WebSocket");
        toast.success(`WebSocket connected`);
        setStompClient(client);

        client.subscribe(`/topic/room/${details.roomId}`, (msg) => {
          console.log(msg);
          const messageData = JSON.parse(msg.body);
          setMessages((prev) => [...prev, messageData]);
        });
      });
    };

    if (details.connected) {
      connectWebSocket();
    }
  }, [details.connected, details.roomId]);

  const handleMessageSend = () => {
    if (message.trim() === "") {
      return toast.error("Message cannot be empty");
    }
    if (stompClient && details.connected) {
      // Create message payload
      const messagePayload = {
        sender: details.currentUser,
        roomId: details.roomId,
        content: message.trim(), // Assuming 'message' is the current input value
      };

      // Send the message using STOMP over the WebSocket connection
      stompClient.send(
        `/app/sendMessage/${details.roomId}`, // Destination in the backend
        {}, // Headers (if any)
        JSON.stringify(messagePayload) // Message body
      );

      setMessage("");

      // Optionally, update UI with the new message, or handle response
      toast.success("Message sent!");
    } else {
      toast.error("Failed to send message.");
    }
  };

  const handleFileSend = (e) => {
    e.preventDefault();
  };

  // Scroll to the bottom of the message box whenever messages are updated

  function logoutHandler() {
    stompClient.disconnect();
    setStompClient(null);
    setDetails((prevDetails) => ({
      ...prevDetails,
      currentUser: "",
      roomId: "",
      connected: false,
    }));
    navigate("/");
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Header */}
      <ChatHeader onLeave={logoutHandler} />

      {/* Main Content */}
      <ChatMain
        ref={messageBoxRef}
        messages={messages}
        username={details.currentUser}
      />

      {/* Footer */}
      <ChatFooter
        message={message}
        onSetMessage={setMessage}
        onHandleMessageSend={handleMessageSend}
        onHandleFileSend={handleFileSend}
      />
    </div>
  );
};

export default ChatWindowPage;
