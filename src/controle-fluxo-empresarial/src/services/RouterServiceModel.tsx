import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import TesteForm from '../pages/TesteForm';
import Pais from '../pages/Pais/ListPais/ListPais';
import { BasicLayoutContextProvider, FormMode } from '../layouts/BasicLayout/BasicLayoutContext';

export interface Props {
    path?: string;
    setState: (values: void) => void;
}

const RouterServiceModel: React.FC<RouteComponentProps & Props> = (props) => {

    const [breadcrumb, setBreadcrumb] = useState();
    const [formMode, setFormMode] = useState<FormMode>(FormMode.SelectOne)

    // props.history.location

    //basename={props.history.location.pathname >
    return (
        <BrowserRouter basename={props.history.location.pathname}  >
            <Switch  >
                <BasicLayoutContextProvider value={{
                    breadcrumb,
                    setBreadcrumb,

                    formMode,
                    setFormMode
                }}>
                    {/* <BasicLayout> */}

                    <Route path="/pais" component={Pais} />
                    <Route exact path="/" component={TesteForm} />

                    <Redirect to={props.path || "/"} ></Redirect>
                    <Redirect to={{ pathname: props.path || "/" }} ></Redirect>

                    {/* </BasicLayout> */}
                </BasicLayoutContextProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default withRouter(RouterServiceModel);
