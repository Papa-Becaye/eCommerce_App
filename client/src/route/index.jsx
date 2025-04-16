import { createBrowserRouter } from "react-router-dom"; 
import App from "../App";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "",
                Component: Home,
            },
            {
                path: "/search",
                Component: Search,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: "/forgot-password",
                Component: ForgotPassword,
            },
            {
                path: "/verify-otp",
                Component: OtpVerification,
            },
            {
                path: "/reset-password",
                Component: ResetPassword,
            },
        ]
    },
]);