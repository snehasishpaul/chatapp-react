import Label from "../util/Label";
import Input from "../util/Input";
import Button from "../util/Button";
import img from "../../assets/speak.png";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { createRoomApi, joinRoomApi } from "../services/ApiServices";
import useChatContext from "../context/ChatContext";

const LoginPage = () => {
  const [details, setDetails] = useChatContext();
  const navigate = useNavigate();

  const abortControllerRef = useRef(null); // Use useRef to persist the controller

  useEffect(() => {
    // Cleanup the AbortController when the component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  function inputChangeHandler(event) {
    setDetails((prevDetail) => ({
      ...prevDetail,
      [event.target.name]: event.target.value,
    }));
  }

  function validateInput() {
    if (details.currentUser.trim() === "" || details.roomId.trim() === "") {
      toast.error("Invalid Inputs !!");
      return false;
    }
    return true;
  }

  async function joinRoom() {
    // Abort the previous request if it's still ongoing
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    if (validateInput()) {
      //join room

      try {
        const response = await joinRoomApi(details.roomId, signal);
        if (response.httpStatus === "OK") {
          toast.success(
            `${details.currentUser} has joined the room (${details.roomId})`
          );
        }
        setDetails((prevDetails) => ({
          ...prevDetails,
          connected: true,
        }));
        navigate("/chat");
      } catch (error) {
        // console.log(error);
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          const errorMessage =
            error.response?.data?.message || "Failed to create room";
          toast.error(errorMessage);
        }
      }
    }
  }

  async function createRoom() {
    console.log(details);
    // Abort the previous request if it's still ongoing
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    if (validateInput()) {
      //create room api
      try {
        const response = await createRoomApi(details.roomId, signal);
        console.log(response);
        if (response.httpStatus === "CREATED") {
          toast.success(response.message);
          console.log("Room created");
        }
        // join room
        setDetails((prevDetails) => ({
          ...prevDetails,
          connected: true,
        }));
        navigate("/chat");
      } catch (error) {
        console.log(error);
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          const errorMessage =
            error.response?.data?.message || "Failed to create room";
          toast.error(errorMessage);
        }
      }
    }
  }

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
                onChange={inputChangeHandler}
                value={details.currentUser}
                type="text"
                name="currentUser"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="roomId">Room ID / New Room ID</Label>
              <Input
                onChange={inputChangeHandler}
                value={details.roomId}
                type="text"
                name="roomId"
                id="roomId"
                placeholder="Enter Room ID"
              />
            </div>
            <div className="py-6 flex justify-start gap-2">
              <Button
                onClick={joinRoom}
                className="bg-blue-600 hover:bg-blue-800"
              >
                Join Room
              </Button>
              <Button
                onClick={createRoom}
                className="bg-orange-600 hover:bg-orange-800"
              >
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
