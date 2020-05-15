import React from 'react';
import { Route } from 'react-router-dom';
import RegisterPais from '../../../pages/Cidades/Pais/RegisterPais/RegisterPais';
import ListPais from '../../../pages/Cidades/Pais/ListPais/ListPais';
import RegisterEstado from '../../../pages/Cidades/Estado/RegisterEstado/RegisterEstado';
import ListEstado from '../../../pages/Cidades/Estado/ListEstado/ListEstado';
import ListCidade from '../../../pages/Cidades/Cidade/ListCidade/ListCidade';
import CreateCidade from '../../../pages/Cidades/Cidade/CreateCidade/CreateCidade';
import ListUser from '../../../pages/Pessoas/Users/ListUser/ListUser';
import RegisterUser from '../../../pages/Pessoas/Users/RegisterUser/RegisterUser';
import FormTitular from '../../../pages/Pessoas/Associados/CreateTitular/CreateTitular';
import ListTitular from '../../../pages/Pessoas/Associados/ListTitular/ListTitular';
import ListFormaPagamento from '../../../pages/CondicaoPagamento/FormaPagamento/ListFormaPagamento/ListFormaPagamento';
import CreateFormaPagamento from '../../../pages/CondicaoPagamento/FormaPagamento/CreateFormaPagamento/CreateFormaPagamento';
import ListCondicaoPagamento from '../../../pages/CondicaoPagamento/CondicaoPagamento/ListCondicaoPagamento/ListCondicaoPagamento';
import CreateCondicaoPagamento from '../../../pages/CondicaoPagamento/CondicaoPagamento/CreateCondicaoPagamento/CreateCondicaoPagamento';
import FormCliente from '../../../pages/Pessoas/Clientes/FormCliente/FormCliente';
import ListCliente from '../../../pages/Pessoas/Clientes/ListCliente/ListCliente';
import { ListFuncionario } from '../../../pages/Pessoas/Funcionarios/ListFuncionario/ListFuncionario';
import FormFuncionario from '../../../pages/Pessoas/Funcionarios/FormFuncionario/FormFuncionario';
import { ListFornecedor } from '../../../pages/Pessoas/Fornecedores/ListFornecedor/ListFornecedor';
import FormFornecedor from '../../../pages/Pessoas/Fornecedores/FormFornecedor/FormFornecedor';

const RoutePath: React.FC = () => {

    return (
        <>

            <Route path="/cidade" component={ListCidade} exact />
            <Route path="/cidade/edit/:id" component={CreateCidade} />
            <Route path="/cidade/new" component={CreateCidade} />

            <Route path="/cliente" component={ListCliente} exact />
            <Route path="/cliente/edit/:id" component={FormCliente} />
            <Route path="/cliente/new" component={FormCliente} />

            <Route path="/condicao-pagamento" component={ListCondicaoPagamento} exact />
            <Route path="/condicao-pagamento/edit/:id" component={CreateCondicaoPagamento} />
            <Route path="/condicao-pagamento/new" component={CreateCondicaoPagamento} />

            <Route path="/estado" component={ListEstado} exact />
            <Route path="/estado/edit/:id" component={RegisterEstado} />
            <Route path="/estado/new" component={RegisterEstado} />

            <Route path="/forma-pagamento" component={ListFormaPagamento} exact />
            <Route path="/forma-pagamento/edit/:id" component={CreateFormaPagamento} />
            <Route path="/forma-pagamento/new" component={CreateFormaPagamento} />

            <Route path="/funcionario" component={ListFuncionario} exact />
            <Route path="/funcionario/edit/:id" component={FormFuncionario} />
            <Route path="/funcionario/new" component={FormFuncionario} />

            <Route path="/fornecedor" component={ListFornecedor} exact />
            <Route path="/fornecedor/edit/:id" component={FormFornecedor} />
            <Route path="/fornecedor/new" component={FormFornecedor} />

            <Route path="/pais" component={ListPais} exact />
            <Route path="/pais/edit/:id" component={RegisterPais} />
            <Route path="/pais/new" component={RegisterPais} />

            <Route path="/titular" component={ListTitular} exact />
            <Route path="/titular/edit/:id" component={FormTitular} />
            <Route path="/titular/new" component={FormTitular} />

            <Route path="/user" component={ListUser} exact />
            <Route path="/user/edit/:id" component={RegisterUser} />
            <Route path="/user/new" component={RegisterUser} />

        </>
    );
}

export default RoutePath;
