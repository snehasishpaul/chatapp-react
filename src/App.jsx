import "./App.css";
import AppRoutes from "./config/AppRoutes.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { ChatContextProvider } from "./components/context/ChatContext.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <ChatContextProvider>
          <AppRoutes />
        </ChatContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
