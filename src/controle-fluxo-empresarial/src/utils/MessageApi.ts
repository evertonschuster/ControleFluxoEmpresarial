import { MessageType, ConfigOnClose } from "antd/lib/message";
import { message } from "antd";
import { FormikHelpers } from "formik";

export function errorBack(formik: FormikHelpers<any>, response: any, prosMessage?: string[]) {

    try {

        console.error("Erros da requisição", response);

        if (!response.errors) {
            message.error("O sistema está temporariamente fora do ar!");
        }

        formik.setErrors(response.errors);
        message.error(response["message"]);

        const errors = response.errors;

        prosMessage && Object.keys(errors).forEach(element => {
            let result = prosMessage!.find(e => e == element);
            result && message.error(errors[element]);
        });


    } catch (e) {
        console.error("Erro ao exibir as messagem ", e);
    }
}