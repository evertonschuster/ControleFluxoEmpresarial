import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import ListPais from '../pages/Cidades/Pais/ListPais/ListPais';
import { BasicLayoutContextProvider, FormMode } from '../layouts/BasicLayout/BasicLayoutContext';
import RegisterPais from '../pages/Cidades/Pais/RegisterPais/RegisterPais';
import RegisterEstado from '../pages/Cidades/Estado/RegisterEstado/RegisterEstado';
import ListEstado from '../pages/Cidades/Estado/ListEstado/ListEstado';

export interface Props {
    path?: string;
    setState: (values: void) => void;
}

const RouterServiceModel: React.FC<RouteComponentProps & Props> = (props) => {

    const [breadcrumb, setBreadcrumb] = useState();
    const [formMode, setFormMode] = useState<FormMode>(FormMode.SelectOne)

    return (
        <BrowserRouter basename={props.history.location.pathname}  >
            <Switch >
                <BasicLayoutContextProvider value={{
                    breadcrumb,
                    setBreadcrumb,

                    formMode,
                    setFormMode
                }}>


                    <Route path="/pais/new" component={RegisterPais} />
                    <Route exact path="/pais" component={ListPais} />
                    <Route path="/estado/new" component={RegisterEstado} />
                    <Route exact path="/estado" component={ListEstado} />

                    <Redirect to={{ pathname: "/" + (props.path || "") }} ></Redirect>
                </BasicLayoutContextProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default withRouter(RouterServiceModel);
