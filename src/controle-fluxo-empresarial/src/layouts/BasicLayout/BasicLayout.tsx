import React, { useContext } from 'react';
import { Layout } from 'antd';
import SideMenuApp from './Components/SideMenuApp';
import ContentApp from './Components/ContentApp';
import HeaderApp from './Components/HeaderApp';
import BasicLayoutContext from './BasicLayoutContext';
import "./basic-layout.css";


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
        <div style={{ animationName: "openSystem", animationDuration: "2s" }}>
            <Layout style={{ minHeight: "100vh" }} >

                <SideMenuApp />

                <Layout  >

                    <HeaderApp breadcrumbList={breadcrumb} />
                    <ContentApp > {props.children} </ContentApp>

                </Layout>
            </Layout>
        </div>
    );
}

export default BasicLayout;
