import React from 'react';
import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import { fetcher } from "../utils/fetcher";
import '../styles/pages/Article.css';

export function ArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, mutate } = useSWR(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/articles/${id}`,
        fetcher,
        { dedupingInterval: 60000 }
    );

    if (error) return <div className="article-error">Failed to load</div>;
    if (!data) return <div className="article-loading">Loading...</div>;

    return (
        <div className="article-container">
            <h1 className="article-title">{data.name}</h1>
            <p className="article-content">{data.content}</p>
            <div className="article-button-container">
                <button className="article-button" onClick={() => mutate()}>Обновить</button>
                <button className="article-button" onClick={() => navigate(-1)}>Назад</button>
            </div>
        </div>
    );
}
