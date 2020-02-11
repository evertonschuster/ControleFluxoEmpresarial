import { MessageType, ConfigOnClose } from "antd/lib/message";
import { message, notification } from "antd";
import { FormikHelpers } from "formik";

export function errorBack(formik: FormikHelpers<any>, response: any, prosMessage?: string[]) {

    try {
        console.info("Cabaciou", response.errors);

        if (response?.response?.status == 405) {
            notification.error({
                message: "405 (Method Not Allowed)",
                duration: 10
            })
            return;
        }

        if (!response?.errors) {
            return;
        }

        formik.setErrors(response.errors);
        notification.error({
            message: response["message"],
            duration: 10
        });

        const errors = response.errors;

        prosMessage && Object.keys(errors).forEach(element => {
            let result = prosMessage!.find(e => e == element);
            result && notification.error({
                message: errors[element],
                duration: 10
            });
        });


    } catch (e) {
        console.error("Erro ao exibir as messagem ", e);
    }
}