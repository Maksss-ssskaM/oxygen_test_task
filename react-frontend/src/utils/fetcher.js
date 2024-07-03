import axios from "axios";
import Cookies from "js-cookie";

export const fetcher = (url) => axios.get(url).then(res => res.data);

export const createAuthFetcher = (checkAuthError) => {
    return async (url) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            });
            return response.data;
        } catch (err) {
            checkAuthError(err);
            throw err;
        }
    };
};