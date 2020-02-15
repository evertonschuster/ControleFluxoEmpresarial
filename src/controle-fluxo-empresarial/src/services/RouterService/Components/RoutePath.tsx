import React from 'react';
import { Route } from 'react-router-dom';
import RegisterPais from '../../../pages/Cidades/Pais/RegisterPais/RegisterPais';
import ListPais from '../../../pages/Cidades/Pais/ListPais/ListPais';
import RegisterEstado from '../../../pages/Cidades/Estado/RegisterEstado/RegisterEstado';
import ListEstado from '../../../pages/Cidades/Estado/ListEstado/ListEstado';
import ListCidade from '../../../pages/Cidades/Cidade/ListCidade/ListCidade';
import RegisterCidade from '../../../pages/Cidades/Cidade/RegisterCidade/RegisterCidade';
import ListUser from '../../../pages/Users/ListUser/ListUser';
import RegisterUser from '../../../pages/Users/RegisterUser/RegisterUser';
import CreateTitular from '../../../pages/Associados/CreateTitular/CreateTitular';
import ListTitular from '../../../pages/Associados/ListTitular/ListTitular';

const RoutePath: React.FC = () => {

    return (
        <>
            <Route path="/pais/new" component={RegisterPais} />
            <Route path="/pais/edit/:id" component={RegisterPais} />
            <Route exact path="/pais" component={ListPais} />

            <Route path="/estado/new" component={RegisterEstado} />
            <Route path="/estado/edit/:id" component={RegisterEstado} />
            <Route exact path="/estado" component={ListEstado} />

            <Route path="/cidade/new" component={RegisterCidade} />
            <Route path="/cidade/edit/:id" component={RegisterCidade} />
            <Route exact path="/cidade" component={ListCidade} />


            <Route exact path="/user/new" component={RegisterUser} />
            <Route exact path="/user/edit/:id" component={RegisterUser} />
            <Route exact path="/user" component={ListUser} />

            <Route exact path="/titular/new" component={CreateTitular} />
            <Route exact path="/titular/edit/:id" component={CreateTitular} />
            <Route exact path="/titular" component={ListTitular} />

        </>
    );
}

export default RoutePath;
