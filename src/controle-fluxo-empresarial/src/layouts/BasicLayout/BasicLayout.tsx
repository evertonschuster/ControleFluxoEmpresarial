import React, { useContext } from 'react';
import "./basic-layout.css";
import { Layout } from 'antd';
import BasicLayoutContext from './BasicLayoutContext';
import ContentApp from './Components/ContentApp';
import HeaderApp from './Components/HeaderApp';
import PerfectScrollbar from 'react-perfect-scrollbar'
import SideMenuApp from './Components/SideMenuApp';


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
        <div style={{ animationName: "openSystem", animationDuration: "2s", display: "flex", flex: 1 }}>
            <Layout  >

                <SideMenuApp />

                <Layout >
                    <HeaderApp breadcrumbList={breadcrumb} />
                    <PerfectScrollbar
                        style={{
                            display: "flex",
                            flex: "1",
                            background: "#F0F2F5",
                            boxShadow: "0px -2px 5px rgb(245 245 245)" 
                        }} >
                        <ContentApp > {props.children} </ContentApp>
                    </PerfectScrollbar>
                </Layout>
            </Layout>
        </div>
    );
}

export default BasicLayout;
