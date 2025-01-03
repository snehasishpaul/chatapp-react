import { TbSend } from "react-icons/tb";
import { MdAttachFile } from "react-icons/md";

const ChatFooter = ({
  message,
  onSetMessage,
  onHandleSend,
  onHandleFileSend,
}) => {
  return (
    <footer className="flex items-center gap-2 px-4 py-3 bg-slate-900 w-2/3 mx-auto">
      <input
        type="text"
        value={message}
        onChange={(e) => onSetMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border rounded-full"
      />
      <label className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer hover:bg-purple-800">
        <MdAttachFile />
        <input type="file" onChange={onHandleFileSend} className="hidden" />
      </label>
      <button
        onClick={onHandleSend}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        <TbSend />
      </button>
    </footer>
  );
};

export default ChatFooter;
