import React, { useContext, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useNotification } from "react-notifywave";
import { setTokenToLS } from "../../utils/setLocalStorage";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { setUserInfo, setIsAuthenticated, isAuthenticated } = useContext(AppContext);
    const { notify } = useNotification();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const url = `${process.env.REACT_APP_API_BASE}/api/auth/login`;
            const response = await axios(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email,
                    password,
                },
            });

            setTokenToLS(response.data.data.token);
            const user = response.data.data.user;

            if (response.status === 200) {
                notify(response.data.message, "success", 3000, "contained");
                setUserInfo({ name: user.name, email: user.email, id: user._id });
                setIsAuthenticated(true);

                setEmail("");
                setPassword("");
                navigate("/");
            }
        } catch (error) {
            if (isAxiosError(error)) {
                const errMsg = error.response?.data?.message || "An error occurred during register";
                notify(errMsg, "error", 3000, "contained");
            } else {
                notify("An unexpected error occurred", "error", 3000, "contained");
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="authRoot">
            <div className="container">
                <h2>Login Here!</h2>

                <form onSubmit={handleSubmit} className="form">
                    <div className="inputWrapper">
                        <label className="label">Email</label>
                        <input
                            className="input"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Password</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button className="button">Continue</button>

                    <Link to="/register" className="authLink">
                        Don't have an account? Register here
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
