import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {createAuthFetcher} from "../utils/fetcher";

export const useAuth = () => useContext(AuthContext);

export const useAuthFetcher = () => {
    const { checkAuthError } = useAuth();
    return createAuthFetcher(checkAuthError);
};
