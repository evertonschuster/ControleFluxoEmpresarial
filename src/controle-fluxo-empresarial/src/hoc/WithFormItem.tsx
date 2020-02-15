import React, { useContext } from 'react'
import { FormItem } from 'formik-antd';
import BasicLayoutContext, { FormMode } from '../layouts/BasicLayout/BasicLayoutContext';

interface WithFormITemProps {
    label: string;
    required?: boolean;
}

export const withFormItem = <P extends object>(Field: React.ComponentType<P>): React.FC<P & WithFormITemProps> => (props: any) => {

    const basicLayoutContext = useContext(BasicLayoutContext);

    const isViewMode = basicLayoutContext != null && basicLayoutContext.formMode === FormMode.View;
    const isDisabled = props.disabled || isViewMode;

    return (
        <FormItem name={props.name} label={props.label || ""} required={props.required} className="form-custom-item" >
            <Field autoComplete="off" disabled={isDisabled} {...props} required={false} style={{ width: "100%" }} />
        </FormItem >
    )
}

export const withItemNone = <P extends object>(Field: React.ComponentType<P>): React.FC<P> => (props: any) =>
    (
        <div className="ant-row ant-form-item ant-form-item-with-help form-custom-item">
            <div className="ant-col ant-form-item-label">
                <span>&nbsp;</span>
            </div>

            <div className="ant-col ant-form-item-control-wrapper">
                <div className="ant-form-item-control ">
                    <span className="ant-form-item-children">

                        <Field {...props} />

                    </span>

                </div>
            </div>
        </div>
    )

export const ItemFormRender: React.FC<any> = (props) => {
    return (
        <div className="ant-row ant-form-item ant-form-item-with-help form-custom-item">
            <div className="ant-col ant-form-item-label">
                <span>&nbsp;</span>
            </div>

            <div className="ant-col ant-form-item-control-wrapper">
                <div className="ant-form-item-control ">
                    <span className="ant-form-item-children">

                        {props.children}

                    </span>

                </div>
            </div>
        </div>
    )
}