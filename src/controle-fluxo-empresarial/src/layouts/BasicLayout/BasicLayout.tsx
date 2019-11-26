import React, { useState, useContext, useEffect } from 'react';
import { Layout } from 'antd';
import SideMenuApp from './Components/SideMenuApp';
import ContentApp from './Components/ContentApp';
import HeaderApp from './Components/HeaderApp';
import BasicLayoutContext from './BasicLayoutContext';


export interface BreadcrumbProp {
    displayName: string,
    URL?: string
}

export interface Props {
    breadcrumbList?: BreadcrumbProp[],
}

const BasicLayout: React.FC<Props> = (props) => {

    const { breadcrumb } = useContext(BasicLayoutContext);

    return (
        <Layout style={{ minHeight: "100vh" }}>

            <SideMenuApp />

            <Layout style={{ marginLeft: 80 }}>

                <HeaderApp breadcrumbList={breadcrumb} />
                <ContentApp > {props.children} </ContentApp>

            </Layout>
        </Layout>
    );
}

export default BasicLayout;
