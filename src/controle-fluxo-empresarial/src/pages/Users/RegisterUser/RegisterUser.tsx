import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import "./RegisterUserStyle.css"
import RegisterUserGeneral from './Components/RegisterUserGeneral';
import BasicLayoutContext, { FormMode } from '../../../layouts/BasicLayout/BasicLayoutContext';
import ChangePassword from './Components/ChangePassword';

enum Menus {
    Profile = "Profile",
    changePassword = "changePassword"
}

const RegisterUser: React.FC<RouteComponentProps & RouteComponentProps<any>> = () => {

    const [selectedMenu, setselectedMenu] = useState(Menus.Profile)
    const { formMode } = useContext(BasicLayoutContext)

    return (
        <>
            <Menu mode="horizontal" defaultSelectedKeys={[Menus.Profile]} onSelect={a => setselectedMenu(a.key as Menus)}>

                <Menu.Item key={Menus.Profile}>
                    <Icon type="user" />
                    Informações basicas
                </Menu.Item>

                <Menu.Item key={Menus.changePassword} hidden={formMode == FormMode.New} >
                    <Icon type="key" />
                    Trocar de senha
                </Menu.Item>

            </Menu>

            {
                selectedMenu === Menus.Profile ? <RegisterUserGeneral/> : null
            }
            {
                selectedMenu === Menus.changePassword ? <ChangePassword/> : null
            }

        </>
    );

}

export default RegisterUser;
