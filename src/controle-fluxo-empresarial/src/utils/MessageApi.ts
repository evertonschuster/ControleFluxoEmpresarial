import { MessageType, ConfigOnClose } from "antd/lib/message";
import { message } from "antd";

export function errorBack(response: any, duration?: any, onClose?: ConfigOnClose) {

    try {
        const errors = response.response.data.errors;
        Object.keys(errors).forEach(element => {
            message.error(errors[element])
        });

    } catch(e) {

    }
}