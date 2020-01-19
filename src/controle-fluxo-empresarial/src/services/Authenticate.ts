import AuthenticatedUser from "../models/Users/AuthenticatedUser";

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
    window.location.href = "/login"
};

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function getUserName() {
    verefiIsLogedAndLogaut();
    let userData = localStorage.getItem(TOKEN_KEY);
    var obj = JSON.parse(userData!);

    return obj?.userName || "";
}

export function verefiIsLogedAndLogaut() {
    if (!isAuthenticated()) {
        window.location.href = "/login"
    }
}