import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { NotificationProvider } from "react-notifywave";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <NotificationProvider position="top_center">
            <AppProvider>
                <App />
            </AppProvider>
        </NotificationProvider>
    </React.StrictMode>,
);
