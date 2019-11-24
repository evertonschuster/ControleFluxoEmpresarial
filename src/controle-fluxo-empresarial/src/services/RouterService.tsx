import React, { useState } from 'react';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import TesteForm from '../pages/TesteForm';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import TesteForm2 from '../pages/TesteForm2';


const RouterService: React.FC = (props) => {



    return (
        <BrowserRouter >
            <Switch >
                <BasicLayout>

                    <Route path="/teste" component={TesteForm2} />
                    <Route exact path="/" component={TesteForm} />



                </BasicLayout>
            </Switch>
        </BrowserRouter>
    );
}

export default RouterService;
