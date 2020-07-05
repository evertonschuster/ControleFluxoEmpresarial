import React, { useState, memo, useEffect } from 'react';
import { Modal, message } from 'antd';
import RouterServiceModel from '../../services/RouterService/RouterServiceModel';
import { ModalFormContextProvider } from './ModalFormContext';
import { withRouter, RouteComponentProps } from 'react-router';
import { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import "./modal-form.less"

export interface ErrorMessage {
    noSelection: string;
}

export interface Label {
    title: string;
    label: string;
}

export interface Props<T> {
    visible: boolean;
    setVisible: (values: boolean) => void;
    setState: (values: T | T[]) => void;
    state: T | T[];
    path: string;
    errorMessage: ErrorMessage;
    label: Label;
    required?: boolean;
    formMode: FormMode
}
/**
 *
 *
 * @param {*} props
 * @returns
 */
const ModelForm: React.FC<Props<any> & RouteComponentProps> = (props) => {



    const [state, setState] = useState<any[]>();

    function CloseForm() {
        props.setVisible(!props.visible);
        props.history.push(props.location.pathname)

    }

    function handleCancel() {
        CloseForm();
    }

    function handleOk() {

        if (props.required && (state === undefined || (Array.isArray(state) && (state.length === 0 || state[0]?.id === undefined)))) {
            message.error(props.errorMessage.noSelection);
            return;
        }

        if (props.formMode === FormMode.SelectMultiple) {
            props.setState(state);
        } else {
            if (state != null && state.length > 0) {
                props.setState(state[0]);
            }
        }

        CloseForm()
    }

    useEffect(() => {
        setState([].concat(props.state))
    }, [props.state])

    return (
        <ModalFormContextProvider value={{ setState, state }}>

            <Modal
                wrapClassName="modal-wrap"
                className="moda-container"
                width="95%"
                style={{ top: 10, }}
                title={props.label.title}
                visible={props.visible}
                destroyOnClose={true}
                onOk={handleOk}
                okText="Selecionar"
                onCancel={handleCancel}>
                <RouterServiceModel path={props.path} setState={props.setState} formMode={props.formMode} />

            </Modal>

        </ModalFormContextProvider >
    );

}

export default withRouter(memo(ModelForm));
