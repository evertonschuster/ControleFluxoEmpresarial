import React, { useState, memo } from 'react';
import { Modal, message } from 'antd';
import RouterServiceModel from '../../services/RouterServiceModel';
import { ModalFormContextProvider } from './ModalFormContext';
import { withRouter, RouteComponentProps } from 'react-router';

export interface ErrorMessage {
    noSelection: string;
}

export interface Label {
    title: string
}

export interface Props<T> {
    visible: boolean;
    setVisible: (values: boolean) => void;
    setState: (values: T | T[]) => void;
    state: T | T[];
    path: string;
    errorMessage: ErrorMessage;
    label: Label
}

const ModelForm: React.FC<Props<any> & RouteComponentProps> = (props) => {

    const [state, setState] = useState(props.state);


    function CloseForm() {
        props.setVisible(!props.visible);
        props.history.push(props.location.pathname)
    }

    function handleCancel() {
        CloseForm();
    }

    function handleOk() {

        if (state == undefined || (Array.isArray(state) && state.length == 0)) {
            message.error(props.errorMessage.noSelection);
            return;
        }

        props.setState(state);
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
                {/* {props.visible ? <RouterServiceModel path={props.path} setState={props.setState} /> : null} */}

            </Modal>

        </ModalFormContextProvider >
    );

}

export default withRouter(memo(ModelForm));
