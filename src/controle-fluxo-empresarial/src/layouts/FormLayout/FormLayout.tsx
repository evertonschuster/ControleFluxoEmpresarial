import React, { useContext, useEffect, memo, ReactNode } from 'react';
import HeaderApp from './Components/HeaderApp';
import ContentApp from './Components/ContentApp';


export interface BreadcrumbProp {
    displayName: string,
    URL: string
}

export interface Props {
    breadcrumbList?: BreadcrumbProp[],
    children?: ReactNode
}

const FormLayout: React.FC<Props> = (props) => {

    return (
        <>
            <HeaderApp  />
            <ContentApp > {props.children} </ContentApp>
        </>
    );

}

export default FormLayout;
