import React, { useState } from 'react';
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

    const [state, setState] = useState(props.state);


    function CloseForm() {
        props.setVisible(!props.visible);
        props.history.push(props.location.pathname)
    }

    function handleCancel() {
        CloseForm();
    }

    function handleOk() {
        props.setState(state);
        CloseForm()
    }

    return (
        <ModalFormContextProvider value={{ setState, state }}>

            <Modal
                width="90%"
                title="Basic Modal"
                visible={props.visible}
                destroyOnClose={true}
                onOk={handleOk}
                onCancel={handleCancel}>
                <RouterServiceModel path={props.path} setState={props.setState} />
                {/* {props.visible ? <RouterServiceModel path={props.path} setState={props.setState} /> : null} */}

            </Modal>

        </ModalFormContextProvider >
    );

}

export default withRouter(ModelForm);
