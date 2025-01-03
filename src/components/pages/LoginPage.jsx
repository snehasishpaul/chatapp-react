import Label from "../util/Label";
import Input from "../util/Input";
import Button from "../util/Button";
import img from "../../assets/speak.png";

const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="bg-slate-800 py-6 px-12 w-1/4 rounded-lg">
          <img className="mx-auto h-20 w-20" src={img} alt="chat png" />
          <h1 className="font-medium text-xl py-4 text-center">
            Join Room / Create Room
          </h1>
          <div>
            <div className="my-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="roomId">Room ID / New Room ID</Label>
              <Input
                type="text"
                name="roomId"
                id="roomId"
                placeholder="Enter Room ID"
              />
            </div>
            <div className="py-6 flex justify-start gap-2">
              <Button className="bg-blue-600 hover:bg-blue-800">
                Join Room
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-800">
                Create Room
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
