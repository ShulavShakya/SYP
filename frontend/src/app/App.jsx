import "../App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import Login from "../pages/shared/Login.jsx";
import Signup from "../pages/patient/auth/Signup.jsx";

export default function App() {
  return useRoutes(routes);
}
