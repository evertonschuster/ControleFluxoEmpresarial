import React, { useContext } from 'react'
import { FormItem } from 'formik-antd';
import BasicLayoutContext, { FormMode } from '../layouts/BasicLayout/BasicLayoutContext';
import { useField } from 'formik';
export declare const ValidateStatuses: ["success", "warning", "error", "validating", ""];

interface WithFormITemProps {
    label: string;
    required?: boolean;
    validateStatus?: typeof ValidateStatuses[number];
    help?: string;
}

interface PropsItemForm {
    showLabel?: boolean;
    label?: string;
    required?: boolean;
    padding?: boolean;
}

export const withFormItem = <P extends object>(Field: React.ComponentType<P>, propsConf?: any): React.FC<P & WithFormITemProps> => (props: any) => {

    const basicLayoutContext = useContext(BasicLayoutContext);

    const isViewMode = basicLayoutContext != null && basicLayoutContext.formMode === FormMode.View;
    const isDisabled = props.disabled || isViewMode;

    var anotherProps: any = {} as any;
    if (props.validateStatus) {
        anotherProps.validateStatus = props.validateStatus;
        anotherProps.help = props.help;
    }


    return (
        <FormItem
            name={props.name}
            label={props.label || ""}
            required={props.required}
            className="form-custom-item"
            {...anotherProps}
        >
            <Field autoComplete="off" disabled={isDisabled} {...propsConf} {...props} required={false} style={{ width: "100%" }} />
        </FormItem >
    )
}

export const withFormItemCustom = <P extends object>(Field: React.ComponentType<P>, propsConf?: any): React.FC<P & WithFormITemProps> => (props: any) => {

    const basicLayoutContext = useContext(BasicLayoutContext);
    const [field,] = useField({ name: props.name });

    const isViewMode = basicLayoutContext != null && basicLayoutContext.formMode === FormMode.View;
    const isDisabled = props.disabled || isViewMode;

    return (
        <FormItem name={props.name} label={props.label || ""} required={props.required} className="form-custom-item" >
            <Field
                autoComplete="off"
                disabled={isDisabled}
                {...field}
                {...propsConf}
                {...props}
                required={false}
                style={{ width: "100%" }} />
        </FormItem >
    )
}

export const WithItemNone: React.FC<PropsItemForm> = (props) => {
    const showLabel = props.showLabel ?? true;

    return (
        <div className={`ant-row ant-form-item ant-form-item-with-help ${props.padding === true || props.padding === undefined ? "form-custom-item" : ""}`}>
            {showLabel ? <div className="ant-col ant-form-item-label">
                <span>&nbsp;</span >
            </div > : ""
            }

            <div className="ant-col ant-form-item-control-wrapper">
                <div className="ant-form-item-control ">
                    <span className="ant-form-item-children">

                        {props.children}

                    </span>

                </div>
            </div>
        </div >
    )
}

export const ItemFormRender: React.FC<PropsItemForm> = (props) => {
    const showLabel = props.showLabel ?? true;

    return (
        <div className="ant-row ant-form-item ant-form-item-with-help form-custom-item">
            {showLabel ?
                <div className="ant-col ant-form-item-label">
                    <label className={props.required ? "ant-form-item-required" : ""}>{props.label ?? <>&nbsp;</>}</label>
                </div>
                : ""
            }

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