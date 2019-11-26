import React from 'react'

export interface ModalFormContextProp<T> {
    state?: T[];
    setState: (value?: T[]) => void;
}

const ModalFormContext = React.createContext<ModalFormContextProp<any>>(
    {
        state: undefined,
        setState: () => { },
    }
);

export const ModalFormContextProvider = ModalFormContext.Provider
export const ModalFormContextConsumer = ModalFormContext.Consumer

export default ModalFormContext

// headerVisible
// setHeaderVisible