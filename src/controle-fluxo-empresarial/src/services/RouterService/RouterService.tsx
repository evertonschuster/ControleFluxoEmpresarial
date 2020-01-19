import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import ListPais from '../../pages/Cidades/Pais/ListPais/ListPais';
import RegisterPais from '../../pages/Cidades/Pais/RegisterPais/RegisterPais';
import { BasicLayoutContextProvider, FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import ListEstado from '../../pages/Cidades/Estado/ListEstado/ListEstado';
import RegisterEstado from '../../pages/Cidades/Estado/RegisterEstado/RegisterEstado';
import RoutePath from './Components/RoutePath';
import LoginUser from '../../pages/Users/Login/LoginUser';


const RouterService: React.FC = () => {

    const [breadcrumb, setBreadcrumb] = useState();
    const [formMode, setFormMode] = useState<FormMode>(FormMode.New)

    return (
        <BrowserRouter >
            <Switch  >
                <Route exact path="/login" component={LoginUser} />

                <BasicLayoutContextProvider value={{
                    breadcrumb,
                    setBreadcrumb,

                    formMode,
                    setFormMode
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
