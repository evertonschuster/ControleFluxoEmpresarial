import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import "./RegisterUserStyle.css"
import RegisterUserGeneral from './Components/RegisterUserGeneral';

enum Menus {
    Profile = "Profile",
    changePassword = "changePassword"
}

const RegisterUser: React.FC<RouteComponentProps & RouteComponentProps<any>> = () => {

    const [selectedMenu, setselectedMenu] = useState(Menus.Profile)

    return (
        <>
            <Menu mode="horizontal" defaultSelectedKeys={[Menus.Profile]} onSelect={a => setselectedMenu(a.key as Menus)}>

                <Menu.Item key={Menus.Profile}>
                    <Icon type="mail" />
                    Navigation One
                </Menu.Item>

                <Menu.Item key={Menus.changePassword} >
                    <Icon type="mail" />
                    Navigation One
                </Menu.Item>

            </Menu>

            {
                selectedMenu == Menus.Profile ? <RegisterUserGeneral></RegisterUserGeneral> : null
            }

        </>
    );

}

export default RegisterUser;
