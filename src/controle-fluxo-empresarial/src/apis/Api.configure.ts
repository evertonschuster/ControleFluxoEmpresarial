import axios from "axios";
import { getToken } from "../services/Authenticate";
import { message } from "antd";
import { history } from "../services/RouterService/routing"

let baseUri = "https://controle-fluxo-empresarial.herokuapp.com/";
// baseUri = "http://localhost:5000"

if (process.env.NODE_ENV === "development") {
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

        if (error.response === undefined) {

            console.error("Erros da requisição", error.response);
            message.error("O sistema está temporariamente fora do ar!");

            return Promise.reject(error);
        }

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            history.push("/login?redirectUrl=" + window.location.pathname)
        }

        if ((error.response!.data!.code === 422 || error.response.status === 422) ||
            (error.response!.data!.code === 409 || error.response.status === 409) ||
            (error.response!.data!.code === 428 || error.response.status === 428) ||
            (error.response!.data!.code === 400 || error.response.status === 400)) {
            return Promise.reject(new ValidationError(error.response));
        }


        return Promise.reject(error);
    }
)

export default api;


export class ValidationError {
    constructor(values: any) {
        this.errors = values.data.errors;
        this.code = values.data.code ?? values.status;
        this.message = values.data.message;
    }

    errors: any;
    code: number;
    message: string;
}
