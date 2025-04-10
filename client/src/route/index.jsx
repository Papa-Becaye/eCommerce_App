import { createBrowserRouter } from "react-router-dom"; 
import App from "../App";
import Home from "../pages/Home";
import Search from "../pages/Search";

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
            }
        ]
    },
]);