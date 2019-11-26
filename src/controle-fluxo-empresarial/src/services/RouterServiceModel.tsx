import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import TesteForm from '../pages/TesteForm';
import ListPais from '../pages/Pais/ListPais/ListPais';
import { BasicLayoutContextProvider, FormMode } from '../layouts/BasicLayout/BasicLayoutContext';
import RegisterPais from '../pages/Pais/RegisterPais/RegisterPais';
import RegisterEstado from '../pages/Estado/RegisterEstado/RegisterEstado';
import ListEstado from '../pages/Estado/ListEstado/ListEstado';

export interface Props {
    path?: string;
    setState: (values: void) => void;
}

const RouterServiceModel: React.FC<RouteComponentProps & Props> = (props) => {

    const [breadcrumb, setBreadcrumb] = useState();
    const [formMode, setFormMode] = useState<FormMode>(FormMode.SelectOne)

    // useEffect(() => {

    //     console.log("props.location.pathname", props.location.pathname)

    //     props.history.push(props.location.pathname)

    //     return () => {
    //         props.history.push(props.location.pathname)
    //     };

    // }, [])

    //basename={props.history.location.pathname >
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
                    <Route exact path="/" component={TesteForm} />

                    <Redirect to={{ pathname: "/" + (props.path || "") }} ></Redirect>
                </BasicLayoutContextProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default withRouter(RouterServiceModel);
