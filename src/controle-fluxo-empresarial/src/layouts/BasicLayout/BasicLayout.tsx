import React, { useState, useContext } from 'react';
import { Layout } from 'antd';
import SideMenuApp from './Components/SideMenuApp';

export interface Props {

}

const BasicLayout: React.FC<Props> = (props) => {

    return (
        <Layout style={{ minHeight: "100vh" }}>

            <SideMenuApp />

            <Layout style={{ marginLeft: 80 }}>

            {props.children} 

            

            </Layout>
        </Layout>
    );
}

export default BasicLayout;
