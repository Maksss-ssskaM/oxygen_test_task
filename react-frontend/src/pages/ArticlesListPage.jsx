import React, { useState } from 'react';
import useSWR from "swr";
import { Link } from "react-router-dom";
import { fetcher } from "../utils/fetcher";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/authHooks";
import '../styles/pages/ArticlesList.css';
import {RegisterForm} from "../components/RegisterForm";

export function ArticlesListPage() {
    const { user, logout } = useAuth();
    const [showAuthorArticles, setShowAuthorArticles] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false)

    const userIdParam = user && showAuthorArticles ? `?authorId=${user.id}` : '';
    const { data, error } = useSWR(`${process.env.REACT_APP_BACKEND_BASE_URL}/articles${userIdParam}`, fetcher);

    if (error) return <div className="articles-error">Failed to load: {error.message}</div>;
    if (!data) return <div className="articles-loading">Loading...</div>;

    const handleCheckboxChange = (event) => {
        setShowAuthorArticles(event.target.checked);
    };

    return (
        <div className="articles-container">
            {user ? (
                <div className="articles-user-info">
                    <p>Привет, {user.username}!</p>
                    <button className="articles-logout-button" onClick={logout}>Выйти</button>
                </div>
            ) : (
                <div className="auth-container">
                    {isRegistering ? <RegisterForm/> : <LoginForm />}
                    <button className="change-form-button" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
                    </button>
                </div>
            )}
            {user && (
                <div className="articles-filter">
                    <label>
                        <input
                            type="checkbox"
                            checked={showAuthorArticles}
                            onChange={handleCheckboxChange}
                        />
                        Показать только мои статьи
                    </label>
                </div>
            )}
            {data.map(article => (
                <div key={article.id} className="articles-item">
                    <h2 className="articles-item-title">{article.name}</h2>
                    <Link to={`/articles/${article.id}`} className="articles-item-link">Читать далее</Link>
                </div>
            ))}
        </div>
    );
}
