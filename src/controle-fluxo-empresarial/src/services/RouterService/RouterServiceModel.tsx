import React, { useState } from 'react';
import { BrowserRouter, Switch, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { BasicLayoutContextProvider, FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import RoutePath from './Components/RoutePath';
import { BreadcrumbProp } from '../../layouts/BasicLayout/BasicLayout';

export interface Props {
    path?: string;
    setState: (values: void) => void;
    formMode : FormMode
}

const RouterServiceModel: React.FC<RouteComponentProps & Props> = (props) => {

    const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProp[]>();
    const [sharedState, setSharedState] = useState();
    const [formMode, setFormMode] = useState<FormMode>(props.formMode)

    return (
        <BrowserRouter basename={props.history.location.pathname}  >
            <Switch >
                <BasicLayoutContextProvider value={{
                    breadcrumb, setBreadcrumb,
                    formMode, setFormMode,
                    sharedState, setSharedState,
                }}>

                    <RoutePath />

                    <Redirect to={{ pathname: "/" + (props.path || "") }} ></Redirect>
                </BasicLayoutContextProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default withRouter(RouterServiceModel);
