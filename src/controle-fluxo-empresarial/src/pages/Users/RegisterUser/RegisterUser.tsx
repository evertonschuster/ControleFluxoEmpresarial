import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import RegisterUserGeneral from './Components/RegisterUserGeneral';

const RegisterUser: React.FC<RouteComponentProps & RouteComponentProps<any>> = () => {



    return (
        <>
            <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
                <Menu.Item key="mail">
                    <Icon type="mail" />
                    Navigation One
                </Menu.Item>
                <Menu.Item key="mail1">
                    <Icon type="mail" />
                    Navigation One
                </Menu.Item>
            </Menu>

            <div style={{ animation: `fadeIn 1s` }}>
                <RegisterUserGeneral ></RegisterUserGeneral>
            </div>

        </>
    );

}

export default RegisterUser;
