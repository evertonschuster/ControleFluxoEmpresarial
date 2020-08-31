import React from 'react'
import { BreadcrumbProp } from './BasicLayout';


export enum FormMode {
    New = 0,
    View = 1,
    Edit = 2,
    Delete = 3,
    SelectOne = 4,
    SelectMultiple = 5,
    List = 6,
    CancelarEntity = 6,
}


export interface BasicLayoutContextProp {
    breadcrumb?: BreadcrumbProp[];
    setBreadcrumb: (value?: BreadcrumbProp[]) => void;

    formMode: FormMode;
    setFormMode: (values: FormMode) => void;

    sharedState: any;
    setSharedState: (value: any) => void;
}

const BasicLayoutContext = React.createContext<BasicLayoutContextProp>(
    {
        breadcrumb: undefined,
        setBreadcrumb: () => { },

        formMode: FormMode.View,
        setFormMode: () => { },

        sharedState: undefined,
        setSharedState: () => { },

    }
);

export const BasicLayoutContextProvider = BasicLayoutContext.Provider
export const BasicLayoutContextConsumer = BasicLayoutContext.Consumer

export default BasicLayoutContext

// headerVisible
// setHeaderVisible