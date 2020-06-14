import React, { useState, useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import BasicLayout, { BreadcrumbProp } from '../../layouts/BasicLayout/BasicLayout';
import { BasicLayoutContextProvider, FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import RoutePath from './Components/RoutePath';
import LoginUser from '../../pages/Pessoas/Users/Login/LoginUser';
import { history } from './routing'

const RouterService: React.FC = () => {

    const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProp[]>();
    const [sharedState, setSharedState] = useState();
    const [formMode, setFormMode] = useState<FormMode>((localStorage.getItem("formMode") || FormMode.New) as FormMode)

    useEffect(() => {
        localStorage.setItem("formMode", formMode.toString())
    }, [formMode])

    return (
        <Router history={history} >
            <Switch  >
                <Route exact path="/login"  component={LoginUser} />

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
        </Router >
    );
}

export default RouterService;
