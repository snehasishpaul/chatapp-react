import Button from "../util/Button";

const ChatHeader = () => {
  return (
    <header className="flex items-center justify-around px-4 py-3 bg-gray-900 text-white">
      <span className="font-bold">
        Username: <span className="font-normal">username</span>
      </span>
      <span className="text-lg">Room: room number</span>
      <Button
        //   onClick={onLeave}
        className="px-5 py-2 bg-red-500 rounded hover:bg-red-800"
      >
        Leave
      </Button>
    </header>
  );
};

export default ChatHeader;
