import React from 'react';
import { Route } from 'react-router-dom';

import FormAberturaOrdemServico from '../../../pages/OrdemServico/AberturaOrdemServico/FormAberturaOrdemServico';
import FormAndamentoOrdemServico from '../../../pages/OrdemServico/AndamentoOrdemServico/FormAndamentoOrdemServico';
import FormCategoria from '../../../pages/Movimentos/Categorias/FormCategoria/FormCategoria';
import FormCidade from '../../../pages/Cidades/Cidade/FormCidade/FormCidade';
import FormCliente from '../../../pages/Pessoas/Clientes/FormCliente/FormCliente';
import FormCompra from '../../../pages/Compras/FormCompra/FormCompra';
import FormCondicaoPagamento from '../../../pages/CondicaoPagamento/CondicaoPagamento/FormCondicaoPagamento/FormCondicaoPagamento';
import FormContaReceber from '../../../pages/Movimentos/ContaReceber/FormContaReceber/FormContaReceber';
import FormEquipamento from '../../../pages/Movimentos/Equipamentos/FormEquipamento/FormEquipamento';
import FormEstado from '../../../pages/Cidades/Estado/FormEstado/FormEstado';
import FormFormaPagamento from '../../../pages/CondicaoPagamento/FormPagamento/FormFormaPagamento/FormFormaPagamento';
import FormFornecedor from '../../../pages/Pessoas/Fornecedores/FormFornecedor/FormFornecedor';
import FormFuncaoFuncionario from './../../../pages/Pessoas/FuncaoFuncionario/FormFuncaoFuncionario/FormFuncaoFuncionario';
import FormFuncionario from '../../../pages/Pessoas/Funcionarios/FormFuncionario/FormFuncionario';
import FormMarca from './../../../pages/Movimentos/Marcas/FormMarca/FormMarca';
import FormPais from '../../../pages/Cidades/Pais/FormPais/FormPais';
import FormProduto from '../../../pages/Movimentos/Produtos/FormProduto/FormProduto';
import FormServico from '../../../pages/Movimentos/Servicos/FormServico/FormServico';
import FormUnidadeMedida from './../../../pages/Movimentos/UnidadeMedida/FormUnidadeMedida/FormUnidadeMedida';
import FormUser from '../../../pages/Pessoas/Users/FormUser/FormUser';
import FormVenda from '../../../pages/Vendas/FormVenda/FormVenda';
import FromContaPagar from '../../../pages/Movimentos/ContaPagar/FromContaPagar/FromContaPagar';
import FromResumoOrdemServico from '../../../pages/OrdemServico/ResumoOrdemServico/FromResumoOrdemServico';
import ListCategoria from './../../../pages/Movimentos/Categorias/ListCategoria/ListCategoria';
import ListCidade from '../../../pages/Cidades/Cidade/ListCidade/ListCidade';
import ListCliente from '../../../pages/Pessoas/Clientes/ListCliente/ListCliente';
import ListCompra from '../../../pages/Compras/ListCompra/ListCompra';
import ListCondicaoPagamento from '../../../pages/CondicaoPagamento/CondicaoPagamento/ListCondicaoPagamento/ListCondicaoPagamento';
import ListContaPagar from '../../../pages/Movimentos/ContaPagar/ListContaPagar/ListContaPagar';
import ListContaReceber from '../../../pages/Movimentos/ContaReceber/ListContaReceber/ListContaReceber';
import ListEquipamento from '../../../pages/Movimentos/Equipamentos/ListEquipamento/ListEquipamento';
import ListEstado from '../../../pages/Cidades/Estado/ListEstado/ListEstado';
import ListFormaPagamento from '../../../pages/CondicaoPagamento/FormPagamento/ListFormaPagamento/ListFormaPagamento';
import ListFornecedor from '../../../pages/Pessoas/Fornecedores/ListFornecedor/ListFornecedor';
import ListFuncaoFuncionario from './../../../pages/Pessoas/FuncaoFuncionario/ListFuncaoFuncionario/ListFuncaoFuncionario';
import ListFuncionario from '../../../pages/Pessoas/Funcionarios/ListFuncionario/ListFuncionario';
import ListMarca from '../../../pages/Movimentos/Marcas/ListMarca/ListMarca';
import ListOrdemServico from '../../../pages/OrdemServico/ListOrdemServico/ListOrdemServico';
import ListPais from '../../../pages/Cidades/Pais/ListPais/ListPais';
import ListProduto from '../../../pages/Movimentos/Produtos/ListProduto/ListProduto';
import ListServico from './../../../pages/Movimentos/Servicos/ListServico/ListServico';
import ListUnidadeMedida from './../../../pages/Movimentos/UnidadeMedida/ListUnidadeMedida/ListUnidadeMedida';
import ListUser from '../../../pages/Pessoas/Users/ListUser/ListUser';
import ListVenda from '../../../pages/Vendas/ListVenda/ListVenda';
import ListProblemaRelatado from '../../../pages/Movimentos/ProblemaRelatado/ListProblemaRelatado/ListProblemaRelatado';
import FormProblemaRelatado from '../../../pages/Movimentos/ProblemaRelatado/FormProblemaRelatado/FormProblemaRelatado';


const RoutePath: React.FC = () => {

    return (
        <>
            <Route path="/categoria" component={ListCategoria} exact />
            <Route path="/categoria/edit/:id" component={FormCategoria} />
            <Route path="/categoria/new" component={FormCategoria} />

            <Route path="/cidade" component={ListCidade} exact />
            <Route path="/cidade/edit/:id" component={FormCidade} />
            <Route path="/cidade/new" component={FormCidade} />

            <Route path="/cliente" component={ListCliente} exact />
            <Route path="/cliente/edit/:id" component={FormCliente} />
            <Route path="/cliente/new" component={FormCliente} />

            <Route path="/contas-pagar" component={ListContaPagar} exact strict/>
            <Route path="/contas-pagar/new" component={FromContaPagar} exact />
            <Route path="/contas-pagar/cancel/:modelo/:serie/:numero/:fornecedorId/:parcela" component={FromContaPagar} exact />
            <Route path="/contas-pagar/edit/:modelo/:serie/:numero/:fornecedorId/:parcela" component={FromContaPagar} exact />
            <Route path="/contas-pagar/pay/:modelo/:serie/:numero/:fornecedorId/:parcela" component={FromContaPagar} exact />
            <Route path="/contas-pagar/view/:modelo/:serie/:numero/:fornecedorId/:parcela" component={FromContaPagar} exact />

            <Route path="/contas-receber" component={ListContaReceber} exact strict/>
            <Route path="/contas-receber/new" component={FormContaReceber} exact strict/>
            <Route path="/contas-receber/receive/:modelo/:serie/:numero/:parcela" component={FormContaReceber} exact />
            <Route path="/contas-receber/cancel/:modelo/:serie/:numero/:parcela" component={FormContaReceber} exact />
            <Route path="/contas-receber/edit/:modelo/:serie/:numero/:parcela" component={FormContaReceber} exact />
            <Route path="/contas-receber/view/:modelo/:serie/:numero/:parcela" component={FormContaReceber} exact />


            <Route path="/compras" component={ListCompra} exact />
            <Route path="/compras/new" component={FormCompra} />
            <Route path="/compras/view/:modelo/:serie/:numero/:fornecedorId" component={FormCompra} />
            <Route path="/compras/cancel/:modelo/:serie/:numero/:fornecedorId" component={FormCompra} />

            <Route path="/condicao-pagamento" component={ListCondicaoPagamento} exact />
            <Route path="/condicao-pagamento/edit/:id" component={FormCondicaoPagamento} />
            <Route path="/condicao-pagamento/new" component={FormCondicaoPagamento} />

            <Route path="/estado" component={ListEstado} exact />
            <Route path="/estado/edit/:id" component={FormEstado} />
            <Route path="/estado/new" component={FormEstado} />

            <Route path="/equipamentos" component={ListEquipamento} exact />
            <Route path="/equipamentos/edit/:id" component={FormEquipamento} />
            <Route path="/equipamentos/new" component={FormEquipamento} />

            <Route path="/forma-pagamento" component={ListFormaPagamento} exact />
            <Route path="/forma-pagamento/edit/:id" component={FormFormaPagamento} />
            <Route path="/forma-pagamento/new" component={FormFormaPagamento} />

            <Route path="/fornecedor" component={ListFornecedor} exact />
            <Route path="/fornecedor/edit/:id" component={FormFornecedor} />
            <Route path="/fornecedor/new" component={FormFornecedor} />

            <Route path="/funcao-funcionario" component={ListFuncaoFuncionario} exact />
            <Route path="/funcao-funcionario/edit/:id" component={FormFuncaoFuncionario} />
            <Route path="/funcao-funcionario/new" component={FormFuncaoFuncionario} />

            <Route path="/funcionario" component={ListFuncionario} exact />
            <Route path="/funcionario/edit/:id" component={FormFuncionario} />
            <Route path="/funcionario/new" component={FormFuncionario} />

            <Route path="/marca" component={ListMarca} exact />
            <Route path="/marca/edit/:id" component={FormMarca} />
            <Route path="/marca/new" component={FormMarca} />

            <Route path="/pais" component={ListPais} exact />
            <Route path="/pais/edit/:id" component={FormPais} />
            <Route path="/pais/new" component={FormPais} />

            <Route path="/produto" component={ListProduto} exact />
            <Route path="/produto/edit/:id" component={FormProduto} />
            <Route path="/produto/new" component={FormProduto} />

            <Route path="/problemas-relatado" component={ListProblemaRelatado} exact />
            <Route path="/problemas-relatado/edit/:id" component={FormProblemaRelatado} />
            <Route path="/problemas-relatado/new" component={FormProblemaRelatado} />

            <Route path="/servico" component={ListServico} exact />
            <Route path="/servico/edit/:id" component={FormServico} />
            <Route path="/servico/new" component={FormServico} />

            <Route path="/ordem-servico" component={ListOrdemServico} exact />
            <Route path="/ordem-servico/new" component={FormAberturaOrdemServico} />
            <Route path="/ordem-servico/view/:id" component={FromResumoOrdemServico} />
            <Route path="/ordem-servico/delete/:id" component={FromResumoOrdemServico} />
            <Route path="/ordem-servico/andamento/:id" component={FormAndamentoOrdemServico} />

            <Route path="/user" component={ListUser} exact />
            <Route path="/user/edit/:id" component={FormUser} />
            <Route path="/user/new" component={FormUser} />

            <Route path="/unidade-medida" component={ListUnidadeMedida} exact />
            <Route path="/unidade-medida/edit/:id" component={FormUnidadeMedida} />
            <Route path="/unidade-medida/new" component={FormUnidadeMedida} />


            <Route path="/vendas" component={ListVenda}  exact/>
            <Route path="/vendas/new" component={FormVenda}  />
            <Route path="/vendas/view/:modelo/:serie/:numero" component={FormVenda}  />
            <Route path="/vendas/cancel/:modelo/:serie/:numero" component={FormVenda}  />
           


        </>
    );
}

export default RoutePath;
