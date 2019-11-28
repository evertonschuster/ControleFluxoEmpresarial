import React, { useState, memo, useContext } from 'react';
import { Modal, message } from 'antd';
import RouterServiceModel from '../../services/RouterServiceModel';
import { ModalFormContextProvider } from './ModalFormContext';
import { withRouter, RouteComponentProps } from 'react-router';
import BasicLayoutContext, { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';

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
}

const ModelForm: React.FC<Props<any> & RouteComponentProps> = (props) => {

    const [state, setState] = useState<any[]>(props.state);
    const { formMode } = useContext(BasicLayoutContext);

    function CloseForm() {
        props.setVisible(!props.visible);
        props.history.push(props.location.pathname)
    }

    function handleCancel() {
        CloseForm();
    }

    function handleOk() {

        if (props.required && (state === undefined || (Array.isArray(state) && state.length === 0))) {
            message.error(props.errorMessage.noSelection);
            return;
        }

        if (formMode == FormMode.SelectMultiple) {
            props.setState(state);
        } else {
            if (state != null && state.length > 0) {
                props.setState(state[0]);
            }
        }

        CloseForm()
    }

    return (
        <ModalFormContextProvider value={{ setState, state }}>

            <Modal
                width="90%"
                title={props.label.title}
                visible={props.visible}
                destroyOnClose={true}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Selecionar">
                <RouterServiceModel path={props.path} setState={props.setState} />

            </Modal>

        </ModalFormContextProvider >
    );

}

export default withRouter(memo(ModelForm));