import React, { useState } from 'react';
import { Menu, Icon, Layout } from "antd";
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

const SideMenuApp: React.FC = () => {
    const { Sider } = Layout;
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Sider trigger={null}
            collapsible
            collapsed={collapsed}
            onDoubleClick={(event) => {
                setCollapsed(!collapsed);
                event.preventDefault();
            }}
        >
            <PerfectScrollbar>
                <Menu theme="dark" mode="inline" inlineCollapsed={true} >
                    <Menu.Item key="Menu">
                        <Link to="/">
                            <Icon type="home" />
                            <span>Tela inicial</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="cidades"
                        title={
                            <span>
                                <Icon type="environment" />
                                <span>Cidades</span>
                            </span>
                        }>

                        <Menu.Item key="cidadesCrud">
                            <Link to="/cidade">Cidades</Link>
                        </Menu.Item>
                        <Menu.Item key="estadoCrud">
                            <Link to="/estado">Estados</Link>
                        </Menu.Item>
                        <Menu.Item key="paisCrud">
                            <Link to="/pais"> Paises</Link>
                        </Menu.Item>

                    </SubMenu>


                    <SubMenu
                        key="system"
                        title={
                            <span>
                                <Icon type="folder-open" />
                                <span>Cadastros do sistema</span>
                            </span>
                        }>

                        <Menu.Item key="Categoria">
                            <Link to="/categoria">Categoria</Link>
                        </Menu.Item>

                        <Menu.Item key="Cliente">
                            <Link to="/cliente">Clientes</Link>
                        </Menu.Item>

                        <SubMenu
                            key="CondicaoPagamento"
                            title={
                                <Link to="/condicao-pagamento">Condição de Pag.</Link>
                            }>

                            <Menu.Item key="CondicaoPagamentoCrud">
                                <Link to="/condicao-pagamento">Condição de Pag.</Link>
                            </Menu.Item>

                            <Menu.Item key="FormaPagamentoCrud">
                                <Link to="/forma-pagamento">Forma de Pag.</Link>
                            </Menu.Item>

                        </SubMenu>

                        <Menu.Item key="Fornecedor">
                            <Link to="/fornecedor">Fornecedores</Link>
                        </Menu.Item>

                        <Menu.Item key="FuncaoFuncionario">
                            <Link to="/funcao-funcionario">Função Funcionários</Link>
                        </Menu.Item>

                        <Menu.Item key="Funcionario">
                            <Link to="/funcionario">Funcionários</Link>
                        </Menu.Item>

                        <Menu.Item key="Marca">
                            <Link to="/marca">Marcas</Link>
                        </Menu.Item>

                        <Menu.Item key="Produto">
                            <Link to="/produto">Produtos</Link>
                        </Menu.Item>

                        <Menu.Item key="Servico">
                            <Link to="/servico">Serviços</Link>
                        </Menu.Item>

                        <Menu.Item key="unidadeMedidaCrud">
                            <Link to="/unidade-medida">Unidade de medidas</Link>
                        </Menu.Item>

                        <Menu.Item key="UserCrud">
                            <Link to="/user">Usuários</Link>
                        </Menu.Item>

                    </SubMenu>


                    <SubMenu
                        key="Movimento"
                        disabled={true}
                        title={
                            <span>
                                <Icon type="shop" />
                                <span>Movimento</span>
                            </span>
                        }>

                        <Menu.Item key="venda">
                            <Link to="/venda">Vendas</Link>
                        </Menu.Item>
                        <Menu.Item key="compra">
                            <Link to="/compra">Compras</Link>
                        </Menu.Item>


                    </SubMenu>

                </Menu>
            </PerfectScrollbar>
        </Sider>
    );
}

export default SideMenuApp;