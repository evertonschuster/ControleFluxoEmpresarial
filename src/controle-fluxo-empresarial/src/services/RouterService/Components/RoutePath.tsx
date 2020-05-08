import React from 'react';
import { Route } from 'react-router-dom';
import RegisterPais from '../../../pages/Cidades/Pais/RegisterPais/RegisterPais';
import ListPais from '../../../pages/Cidades/Pais/ListPais/ListPais';
import RegisterEstado from '../../../pages/Cidades/Estado/RegisterEstado/RegisterEstado';
import ListEstado from '../../../pages/Cidades/Estado/ListEstado/ListEstado';
import ListCidade from '../../../pages/Cidades/Cidade/ListCidade/ListCidade';
import CreateCidade from '../../../pages/Cidades/Cidade/CreateCidade/CreateCidade';
import ListUser from '../../../pages/Users/ListUser/ListUser';
import RegisterUser from '../../../pages/Users/RegisterUser/RegisterUser';
import CreateTitular from '../../../pages/Associados/CreateTitular/CreateTitular';
import ListTitular from '../../../pages/Associados/ListTitular/ListTitular';
import ListFormaPagamento from '../../../pages/CondicaoPagamento/FormaPagamento/ListFormaPagamento/ListFormaPagamento';
import CreateFormaPagamento from '../../../pages/CondicaoPagamento/FormaPagamento/CreateFormaPagamento/CreateFormaPagamento';
import ListCondicaoPagamento from '../../../pages/CondicaoPagamento/CondicaoPagamento/ListCondicaoPagamento/ListCondicaoPagamento';
import CreateCondicaoPagamento from '../../../pages/CondicaoPagamento/CondicaoPagamento/CreateCondicaoPagamento/CreateCondicaoPagamento';
import FromCliente from '../../../pages/Clientes/FormCliente/FormCliente';

const RoutePath: React.FC = () => {

    return (
        <>
            <Route path="/pais/new" component={RegisterPais} />
            <Route path="/pais/edit/:id" component={RegisterPais} />
            <Route exact path="/pais" component={ListPais} />

            <Route path="/estado/new" component={RegisterEstado} />
            <Route path="/estado/edit/:id" component={RegisterEstado} />
            <Route exact path="/estado" component={ListEstado} />

            <Route path="/cidade/new" component={CreateCidade} />
            <Route path="/cidade/edit/:id" component={CreateCidade} />
            <Route exact path="/cidade" component={ListCidade} />

            <Route path="/cliente/new" component={FromCliente} />
            <Route path="/cliente/edit/:id" component={FromCliente} />
            <Route exact path="/cliente" component={ListCidade} />


            <Route exact path="/user/new" component={RegisterUser} />
            <Route exact path="/user/edit/:id" component={RegisterUser} />
            <Route exact path="/user" component={ListUser} />

            <Route exact path="/titular/new" component={CreateTitular} />
            <Route exact path="/titular/edit/:id" component={CreateTitular} />
            <Route exact path="/titular" component={ListTitular} />
            
            <Route exact path="/forma-pagamento/new" component={CreateFormaPagamento} />
            <Route exact path="/forma-pagamento/edit/:id" component={CreateFormaPagamento} />
            <Route exact path="/forma-pagamento" component={ListFormaPagamento} />

            <Route exact path="/condicao-pagamento/new" component={CreateCondicaoPagamento} />
            <Route exact path="/condicao-pagamento/edit/:id" component={CreateCondicaoPagamento} />
            <Route exact path="/condicao-pagamento" component={ListCondicaoPagamento} />

        </>
    );
}

export default RoutePath;
