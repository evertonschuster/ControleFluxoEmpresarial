import React from 'react';
import { Modal } from 'antd';
import RouterServiceModel from '../../services/RouterServiceModel';
import { ModalFormContextProvider } from './ModalFormContext';

export interface Props {
    visible: boolean;
    setVisible: (values: boolean) => void;
    setState: (values: any) => void;
    state: any;
    path: string;
}

const ModelForm: React.FC<Props> = (props) => {

    function handleOk() {
        props.setVisible(!props.visible);
    }

    return (
        <ModalFormContextProvider value={{ setState: props.setState, state: props.state }}>

            <Modal
                title="Basic Modal"
                visible={props.visible}
                onOk={handleOk}
                onCancel={handleOk}>

                    <RouterServiceModel path={props.path} setState={props.setState}>
                        
                </RouterServiceModel>
            </Modal>

        </ModalFormContextProvider >
    );

}

export default ModelForm;
