import React, { useContext } from 'react';
import "./FormUserStyle.css"
import { Icon, Tabs } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import BasicLayoutContext, { FormMode } from '../../../../layouts/BasicLayout/BasicLayoutContext';
import ChangePassword from './Components/ChangePassword';
import RegisterUserGeneral from './Components/RegisterUserGeneral';

enum Menus {
    Profile = "Profile",
    changePassword = "changePassword"
}

const FormUser: React.FC<RouteComponentProps & RouteComponentProps<any>> = () => {

    const { TabPane } = Tabs;
    const { formMode } = useContext(BasicLayoutContext)
    
    return (
        <Tabs defaultActiveKey={Menus.Profile} >
            <TabPane tab={<><Icon type="user" />Informações basicas</>} key={Menus.Profile}>
                <RegisterUserGeneral />
            </TabPane>

            <TabPane disabled={formMode === FormMode.New}
                tab={<><Icon type="key" />Trocar de senha</>}
                key={Menus.changePassword}>
                <ChangePassword />
            </TabPane>
        </Tabs>
    );

}

export default FormUser;
