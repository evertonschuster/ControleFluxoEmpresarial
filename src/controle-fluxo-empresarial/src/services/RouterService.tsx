import React, { useState } from 'react';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import TesteForm from '../pages/TesteForm';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import ListPais from '../pages/Pais/ListPais/ListPais';
import RegisterPais from '../pages/Pais/RegisterPais/RegisterPais';
import { BasicLayoutContextProvider, FormMode } from '../layouts/BasicLayout/BasicLayoutContext';
import ListEstado from '../pages/Estado/ListEstado/ListEstado';
import RegisterEstado from '../pages/Estado/RegisterEstado/RegisterEstado';


const RouterService: React.FC = (props) => {

    const [breadcrumb, setBreadcrumb] = useState();
    const [formMode, setFormMode] = useState<FormMode>(FormMode.View)

    return (
        <BrowserRouter >
            <Switch  >
                <BasicLayoutContextProvider value={{
                    breadcrumb,
                    setBreadcrumb,

                    formMode,
                    setFormMode
                }}>
                    <BasicLayout>

                        <Route path="/pais/new" component={RegisterPais} />
                        <Route exact path="/pais" component={ListPais} />
                        <Route path="/estado/new" component={RegisterEstado} />
                        <Route exact path="/estado" component={ListEstado} />
                        <Route exact path="/" component={TesteForm} />

                    </BasicLayout>
                </BasicLayoutContextProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default RouterService;
