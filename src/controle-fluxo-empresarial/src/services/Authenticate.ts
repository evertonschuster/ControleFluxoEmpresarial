import AuthenticatedUser from "../models/Pessoas/AuthenticatedUser";
import { history } from './../services/RouterService/routing'

export const TOKEN_KEY = "GestaoPessoalToken";

export function isAuthenticated() {
    return !(!localStorage.getItem(TOKEN_KEY));
}

export function getToken() {
    let userData = localStorage.getItem(TOKEN_KEY);
    var obj = JSON.parse(userData!);

    return obj?.token || "";
}

export function login(user: AuthenticatedUser) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    history.push("/login?redirectUrl=" + window.location.pathname)
};

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function getUserName() {
    verefiIsLogedAndLogaut();
    let userData = localStorage.getItem(TOKEN_KEY);
    var obj = JSON.parse(userData!);

    return obj?.name ?? obj?.userName!;
}

export function verefiIsLogedAndLogaut() {
    if (!isAuthenticated()) {
        // history.push("/login?redirectUrl=" + window.location.pathname)
    }
}