export const TOKEN_KEY = "GestaoPessoalToken";

// export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export function isAuthenticated() {
    return localStorage.getItem(TOKEN_KEY) !== null;
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}