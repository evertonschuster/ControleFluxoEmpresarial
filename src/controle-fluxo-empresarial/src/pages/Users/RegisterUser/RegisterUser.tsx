import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Menu, Icon, Tabs } from 'antd';
import "./RegisterUserStyle.css"
import RegisterUserGeneral from './Components/RegisterUserGeneral';
import BasicLayoutContext, { FormMode } from '../../../layouts/BasicLayout/BasicLayoutContext';
import ChangePassword from './Components/ChangePassword';

enum Menus {
    Profile = "Profile",
    changePassword = "changePassword"
}

const RegisterUser: React.FC<RouteComponentProps & RouteComponentProps<any>> = () => {

    const { TabPane } = Tabs;
    const { formMode } = useContext(BasicLayoutContext)
    
    return (
        <Tabs defaultActiveKey={Menus.Profile} >
            <TabPane tab={<><Icon type="user" />Informações basicas</>} key={Menus.Profile}>
                <RegisterUserGeneral />
            </TabPane>

            <TabPane disabled={formMode == FormMode.New}
                tab={<><Icon type="key" />Trocar de senha</>}
                key={Menus.changePassword}>
                <ChangePassword />
            </TabPane>
        </Tabs>
    );

}

export default RegisterUser;
