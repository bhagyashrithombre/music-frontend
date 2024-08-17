import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import PlaylistDetail from "../pages/PlaylistDetail";
import AppLayout from "../Layout/AppLayout";

const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [{ index: true, element: <Home /> }],
    },
    {
        path: "/playlist/:id",
        element: <AppLayout />,
        children: [{ index: true, element: <PlaylistDetail /> }],
    },
    {
        path: "/404",
        element: <NotFound />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
];

const router = createBrowserRouter([...routes]);

export default router;
