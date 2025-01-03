import "./App.css";
import AppRoutes from "./config/AppRoutes.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
