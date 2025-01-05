import Button from "../util/Button";
import useChatContext from "../context/ChatContext";

const ChatHeader = ({ onLeave }) => {
  // eslint-disable-next-line no-unused-vars
  const [details, setDetails] = useChatContext();

  return (
    <header className="flex items-center justify-around px-4 py-3 bg-gray-900 text-white">
      <span className="font-bold">
        Username:{" "}
        <span className="font-normal">
          {details.currentUser}{" "}
          {details.connected && (
            <span className="inline-block h-5 w-5 rounded-full bg-green-600"></span>
          )}
        </span>
      </span>
      <span className="text-lg">Room: {details.roomId}</span>
      <Button
        onClick={onLeave}
        className="px-5 py-2 bg-red-500 rounded hover:bg-red-800"
      >
        Leave
      </Button>
    </header>
  );
};

export default ChatHeader;
