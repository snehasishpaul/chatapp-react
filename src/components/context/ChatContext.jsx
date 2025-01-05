/* eslint-disable react/display-name */
import { createContext, useContext, useState } from "react";

const ChatContext = createContext({
  currentUser: "",
  roomId: "",
  connected: false,
});

export const ChatContextProvider = ({ children }) => {
  const [details, setDetails] = useState({
    currentUser: "",
    roomId: "",
    connected: false,
  });

  const value = [details, setDetails];

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export default useChatContext;
