import React from 'react';
import { Modal } from 'antd';
import RouterServiceModel from '../../services/RouterServiceModel';
import { ModalFormContextProvider } from './ModalFormContext';
import { withRouter, RouteComponentProps } from 'react-router';

export interface Props {
    visible: boolean;
    setVisible: (values: boolean) => void;
    setState: (values: any) => void;
    state: any;
    path: string;
}

const ModelForm: React.FC<Props & RouteComponentProps> = (props) => {

    function handleOk() {
        props.setVisible(!props.visible);

        props.history.push(props.location.pathname)
    }

    return (
        <ModalFormContextProvider value={{ setState: props.setState, state: props.state }}>

            <Modal
                title="Basic Modal"
                visible={props.visible}
                onOk={handleOk}
                onCancel={handleOk}>

                {props.visible ? <RouterServiceModel path={props.path} setState={props.setState} /> : null}

            </Modal>

        </ModalFormContextProvider >
    );

}

export default withRouter(ModelForm);
