import axios from "axios";
import summaryApi, { baseUrl } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

// sending the access token in the header of every request
// for authentication
Axios.interceptors.request.use(
    async(config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// handling the 401 error and refreshing the access token
// when it is expired
Axios.interceptors.request.use(
    (res) => {
        return res;
    },
    async(error) => {
        const originalConfig = error.config;
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                const newAccessToken = await RefreshToken(refreshToken);
                if (newAccessToken) {
                    originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return Axios(originalConfig);
                }

            }

        }
        return Promise.reject(error);
    }
);

const RefreshToken = async (refreshToken) => {
    const res = await Axios({
        ...summaryApi.refreshToken,
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    const accessToken = res.data.data.token;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
};

export default Axios;