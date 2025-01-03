import { forwardRef } from "react";

const ChatMain = forwardRef(({ messages, username }, ref) => {
  return (
    <main
      ref={ref}
      className="flex-1 overflow-y-auto px-4 py-2 bg-slate-800 w-2/3 mx-auto"
    >
      <ul>
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`flex mb-2 ${
              msg.sender === username ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 max-w-xs text-white rounded-lg ${
                msg.sender === username
                  ? "bg-blue-500 text-right"
                  : "bg-gray-500 text-left"
              }`}
            >
              <div className="flex gap-2">
                {msg.sender === username ? (
                  <img
                    className="w-10 h-10"
                    src="https://avatar.iran.liara.run/public/40"
                    alt="random avatar"
                  />
                ) : (
                  <img
                    className="w-10 h-10"
                    src="https://avatar.iran.liara.run/public/26"
                    alt="random avatar"
                  />
                )}
                <div className="flex flex-col justify-center items-start">
                  <span className="text-sm font-bold">{msg.sender}</span>
                  <span className="text-sm">{msg.text}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
});

ChatMain.displayName = "ChatMain";

export default ChatMain;
