import React, { useContext, useEffect, memo, ReactNode } from 'react';
import "./form-basic-layout.style.css";
import { BreadcrumbProp } from '../BasicLayout/BasicLayout';
import BasicLayoutContext from '../BasicLayout/BasicLayoutContext';

export interface Props {
    breadcrumbList?: BreadcrumbProp[],
    children?: ReactNode
}

const FormBasicLayout: React.FC<Props> = (props) => {

    const { setBreadcrumb } = useContext(BasicLayoutContext);

    useEffect(() => {

        setBreadcrumb(props.breadcrumbList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="form-application-container">
            {props.children}
        </div>
    );

}

export default memo<Props>(FormBasicLayout);
