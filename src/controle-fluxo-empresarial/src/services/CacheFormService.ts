import { useHistory } from "react-router-dom";

export interface FormData {
    ceatedDate: Date;
    formData: any,
}

export const useFormLocalStorage = () => {
    const history = useHistory();
    const keyLocalStorage = `form-chache${history.location.pathname.toLowerCase()}`;

    const saveFormStorage = (formValues: any) => {
        var values: FormData = {
            ceatedDate: new Date(),
            formData: formValues,
        };

        localStorage.setItem(keyLocalStorage, JSON.stringify(values))
    }

    const removeCurrentFormStorage = () => {
        localStorage.removeItem(keyLocalStorage);
    }

    const getCurrentFormStorage = () => {
        try{
            return JSON.parse(localStorage.getItem(keyLocalStorage) ?? "") as FormData;
        }
        catch(e){
            return null
        }
    }

    return {
        saveFormStorage,
        removeCurrentFormStorage,
        getCurrentFormStorage
    }
}