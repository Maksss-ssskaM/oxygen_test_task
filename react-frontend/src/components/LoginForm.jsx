import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from "../hooks/authHooks";
import '../styles/components/AuthForm.css';

export const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`, {
                username: username,
                password: password
            });
            const { token, user } = response.data;
            login(token, user);
            setAuthError("");
        } catch (err) {
            setAuthError("Некорректный логин или пароль");
        }
    };

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-form-group">
                    <label htmlFor="username" className="auth-form-label">Логин</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="auth-form-input"
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="password" className="auth-form-label">Пароль</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="auth-form-input"
                    />
                </div>
                <button type="submit" className="auth-form-button">Войти</button>
            </form>
            {authError && <p className="auth-form-error">{authError}</p>}
        </div>
    );
};
