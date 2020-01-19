import React from 'react';
import { Menu, Icon, Layout } from "antd";
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';

const SideMenuApp: React.FC = () => {
    const { Sider } = Layout;

    return (
        <Sider trigger={null} collapsible collapsed={true} style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
        }}>
            <Menu theme="dark" mode="inline" inlineCollapsed={true}>
                <Menu.Item key="Menu">
                    <Link to="/">
                        <Icon type="home" />
                        <span>Tela inicial</span>
                    </Link>
                </Menu.Item>

                <SubMenu
                    key="cidades"
                    title={
                        <Icon type="environment" />
                    }>
                    <Menu.ItemGroup key="cidadesMenu" title="Cadastro de Cidade">

                        <Menu.Item key="cidadesCrud">
                            <Link to="/cidade">Cidades</Link>
                        </Menu.Item>
                        <Menu.Item key="estadoCrud">
                            <Link to="/estado">Estados</Link>
                        </Menu.Item>
                        <Menu.Item key="paisCrud">
                            <Link to="/pais"> Paises</Link>
                        </Menu.Item>

                    </Menu.ItemGroup>
                </SubMenu>


                <SubMenu
                    key="system"
                    title={
                        <Icon type="folder-open" />
                    }>
                    <Menu.ItemGroup key="UserMenu" title="Cadastros do sistema">

                        <Menu.Item key="UserCrud">
                            <Link to="/user">Usuário</Link>
                        </Menu.Item>

                    </Menu.ItemGroup>
                </SubMenu>

                {/* <Icon type="shop" />
                <Icon type="contacts" /> */}
            </Menu>
        </Sider>
    );
}

export default SideMenuApp;