import { TbSend } from "react-icons/tb";
import { MdAttachFile } from "react-icons/md";
import Button from "../util/Button";

const ChatFooter = ({
  message,
  onSetMessage,
  onHandleMessageSend,
  onHandleFileSend,
}) => {
  return (
    <footer className="flex items-center gap-2 px-4 py-3 bg-slate-900 w-2/3 mx-auto">
      <input
        type="text"
        value={message}
        onChange={(e) => onSetMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onHandleMessageSend();
          }
        }}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border rounded-full"
      />
      <label className="px-2 py-2 bg-purple-600 text-white rounded-full cursor-pointer hover:bg-purple-800">
        <MdAttachFile />
        <input type="file" onChange={onHandleFileSend} className="hidden" />
      </label>
      <Button
        onClick={onHandleMessageSend}
        className="px-2 py-2 bg-green-500 text-white hover:bg-green-700"
      >
        <TbSend />
      </Button>
    </footer>
  );
};

export default ChatFooter;
