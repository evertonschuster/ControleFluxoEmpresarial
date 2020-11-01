import { useHistory } from "react-router-dom";

export interface FormData {
    ceatedDate: Date;
    formData: any,
}

export const useFormLocalStorage = () => {
    const history = useHistory();
    const keyLocalStorage = (pathname?: string) => `form-chache${(pathname ?? history.location.pathname).toLowerCase()}`;

    const saveFormStorage = (formValues: any) => {
        var values: FormData = {
            ceatedDate: new Date(),
            formData: formValues,
        };

        localStorage.setItem(keyLocalStorage(), JSON.stringify(values))
    }

    const removeCurrentFormStorage = () => {
        localStorage.removeItem(keyLocalStorage());
    }

    const removePathnameFormStorage = (pathname: string) => {
        localStorage.removeItem(keyLocalStorage(pathname));
    }

    const getCurrentFormStorage = () => {
        try {
            return JSON.parse(localStorage.getItem(keyLocalStorage()) ?? "") as FormData;
        }
        catch (e) {
            return null
        }
    }

    return {
        saveFormStorage,
        removeCurrentFormStorage,
        removePathnameFormStorage,
        getCurrentFormStorage
    }
}