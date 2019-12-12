import axios from "axios";
import { getToken, removeToken } from "../services/Authenticate";

let baseUri = "https://gestao-da-casa.herokuapp.com/";
if (process.env.NODE_ENV == "development") {
    baseUri = "http://localhost:5000"
}

const api = axios.create({
    baseURL: baseUri
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }



    return config;
});

api.interceptors.response.use((response) => {
    return response
},
    function (error) {

        if(error.response == undefined){
            return Promise.reject(error);
        }

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {

            window.location.href = "/login"

        }

        return Promise.reject(error);
    }
)

export default api;