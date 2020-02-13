import React, { useState } from 'react';
import { Menu, Icon, Layout } from "antd";
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';

const SideMenuApp: React.FC = () => {
    const { Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={{
            overflow: 'auto',
            height: '100vh',
            left: 0,
        }}>
            <Menu theme="dark" mode="inline" inlineCollapsed={true}>
                <Menu.Item key="Menu">
                    <Link to="/">
                        <Icon type="home" />
                        <span>Tela inicial</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="MenuAction" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <Icon type="menu-unfold" /> : <Icon type="menu-fold" />}
                    {collapsed ? <span>Expandir menu</span> : <span>Recolher menu</span>}

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

                </SubMenu>

                {/* <Icon type="shop" />
                <Icon type="contacts" /> */}
            </Menu>
        </Sider>
    );
}

export default SideMenuApp;