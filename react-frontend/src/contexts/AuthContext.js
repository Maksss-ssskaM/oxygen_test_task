import {createContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('authToken');
        const username = Cookies.get('username');
        const userId = Cookies.get('userId');
        if (token && username && userId) {
            setUser({ id: userId, username: username });
        }
    }, []);

    const login = (token, user) => {
        const userId = user.id;
        const username = user.username;

        Cookies.set('authToken', token, { expires: 7, sameSite: 'strict' });
        Cookies.set('userId', userId, { expires: 7, sameSite: 'strict' });
        Cookies.set('username', username, { expires: 7, sameSite: 'strict' });
        setUser({ id: userId, username: username });
    };

    const logout = () => {
        Cookies.remove('authToken');
        Cookies.remove('userId');
        Cookies.remove('username');
        setUser(null);
    };

    const checkAuthError = (err) => {
        if (err.response && err.response.status === 401) {
            logout()
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
