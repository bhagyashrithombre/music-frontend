import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

const App = () => {
    const { isLoading } = useContext(AppContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <RouterProvider router={router} />;
};

export default App;
