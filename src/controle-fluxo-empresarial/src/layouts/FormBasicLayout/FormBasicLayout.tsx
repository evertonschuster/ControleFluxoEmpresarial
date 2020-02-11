import React, { useContext, useEffect, memo, ReactNode, useState } from 'react';
import { BreadcrumbProp } from '../BasicLayout/BasicLayout';
import BasicLayoutContext from '../BasicLayout/BasicLayoutContext';
import "./form-basic-layout.style.css";

export interface Props {
    breadcrumbList?: BreadcrumbProp[],
    children?: ReactNode
}

const FormBasicLayout: React.FC<Props> = (props) => {

    const { setBreadcrumb } = useContext(BasicLayoutContext);
    const [state] = useState(props.breadcrumbList)

    useEffect(() => {

        setBreadcrumb(props.breadcrumbList)

    }, [state])

    return (
        <div className="form-application-container">
            {props.children}
        </div>
    );

}

export default memo<Props>(FormBasicLayout);
