const ChatHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
      <span className="font-bold">Username: username</span>
      <span className="text-lg">Room: room number</span>
      <button
        //   onClick={onLeave}
        className="px-5 py-2 bg-red-500 rounded hover:bg-red-800"
      >
        Leave
      </button>
    </header>
  );
};

export default ChatHeader;
