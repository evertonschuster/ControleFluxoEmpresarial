import React from 'react'
import { FormItemProps, FormItem } from 'formik-antd';
import { Row, Col, Button } from 'antd';
import { Props } from './../services/RouterServiceModel';

interface WithFormITemProps {
    label: string;
    required?: boolean;
}

export const withFormItem = <P extends object>(Field: React.ComponentType<P>): React.FC<P & WithFormITemProps> => (props: any) =>
    (
        <FormItem name={props.name} label={props.label} required={props.required} style={{ padding: "3px" }}>
            <Field {...props} />
        </FormItem >
    )

export const withItemNone = <P extends object>(Field: React.ComponentType<P>): React.FC<P> => (props: any) =>
    (
        <div className="ant-row ant-form-item" style={{ padding: "3px" }}>
            <div className="ant-col ant-form-item-label">
                <span >&nbsp;</span>
            </div>
            <div className="ant-col ant-form-item-control-wrapper">
                <div className="ant-form-item-control">
                    <span className="ant-form-item-children">
                        <Field {...props} />
                    </span>
                </div>
            </div>
        </div>
    )

export const ItemFormRender: React.FC<any> = (props) => {
    return (
        <div className="ant-row ant-form-item" style={{ padding: "3px" }}>
            <div className="ant-col ant-form-item-label">
                <span >&nbsp;</span>
            </div>
            <div className="ant-col ant-form-item-control-wrapper">
                <div className="ant-form-item-control">
                    <span className="ant-form-item-children">
                        {props.children}
                    </span>
                </div>
            </div>
        </div>
    )
}