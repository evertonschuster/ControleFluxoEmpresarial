import React, { useState } from 'react';
import { Menu, Icon, Layout } from "antd";
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';

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

                    <Menu.Item key="UserCrud">
                        <Link to="/user">Usuário</Link>
                    </Menu.Item>

                    <Menu.Item key="TitularCrud">
                        <Link to="/Titular">Titulares</Link>
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

                </SubMenu>

                {/* <Icon type="shop" />
                <Icon type="contacts" /> */}
            </Menu>
        </Sider>
    );
}

export default SideMenuApp;