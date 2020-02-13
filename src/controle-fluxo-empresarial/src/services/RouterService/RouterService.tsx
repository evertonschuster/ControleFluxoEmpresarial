import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { BasicLayoutContextProvider, FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import RoutePath from './Components/RoutePath';
import LoginUser from '../../pages/Users/Login/LoginUser';

const RouterService: React.FC = () => {

    const [breadcrumb, setBreadcrumb] = useState();
    const [sharedState, setSharedState] = useState();
    const [formMode, setFormMode] = useState<FormMode>((localStorage.getItem("formMode") || FormMode.New) as FormMode)

    useEffect(() => {
        localStorage.setItem("formMode", formMode.toString())
    }, [formMode])

    return (
        <BrowserRouter >
            <Switch  >
                <Route exact path="/login" component={LoginUser} />

                <BasicLayoutContextProvider value={{
                    breadcrumb, setBreadcrumb,
                    formMode, setFormMode,
                    sharedState, setSharedState,
                }}>
                    <BasicLayout>
                        <RoutePath />
                    </BasicLayout>
                </BasicLayoutContextProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default RouterService;
