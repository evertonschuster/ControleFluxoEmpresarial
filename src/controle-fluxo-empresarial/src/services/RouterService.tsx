import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import ListPais from '../pages/Cidades/Pais/ListPais/ListPais';
import RegisterPais from '../pages/Cidades/Pais/RegisterPais/RegisterPais';
import { BasicLayoutContextProvider, FormMode } from '../layouts/BasicLayout/BasicLayoutContext';
import ListEstado from '../pages/Cidades/Estado/ListEstado/ListEstado';
import RegisterEstado from '../pages/Cidades/Estado/RegisterEstado/RegisterEstado';


const RouterService: React.FC = () => {

    const [breadcrumb, setBreadcrumb] = useState();
    const [formMode, setFormMode] = useState<FormMode>(FormMode.New)

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
                        <Route path="/pais/edit/:id" component={RegisterPais} />
                        <Route exact path="/pais" component={ListPais} />
                        <Route path="/estado/new" component={RegisterEstado} />
                        <Route exact path="/estado" component={ListEstado} />

                    </BasicLayout>
                </BasicLayoutContextProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default RouterService;
