import { Route, Routes } from "react-router";
import LoginPage from "../components/pages/LoginPage";
import ChatWindowPage from "../components/pages/ChatWindowPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatWindowPage />} />
        <Route path="/about" element={<h1>this is about page</h1>} />
        <Route path="*" element={<h1>404 Error page not found</h1>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
