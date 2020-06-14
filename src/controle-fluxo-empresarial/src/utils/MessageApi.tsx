import React from 'react';
import { notification } from "antd";
import { FormikHelpers } from "formik";

export function errorBack(formik?: FormikHelpers<any> | null, response?: any, prosRemoveMessage?: string[]) {

    try {
        console.info("Cabaciou", response.errors);

        if (response?.response?.status === 405) {
            notification.error({
                message: "405 (Method Not Allowed)",
                duration: 10
            })
            return;
        }


        formik?.setErrors(response.errors);
        notification.error({
            message: response["message"],
            duration: 10
        });

        if (!response?.errors) {
            return;
        }
        const errors = response.errors;

        Object.keys(errors).forEach(element => {
            let mensagem = errors[element];

            if (Array.isArray(mensagem) && mensagem.length > 0) {
                let errorArray: any[] = errors[element];

                if (errorArray.length > 0) {
                    mensagem = errorArray.map(e => <span style={{ textAlign: "justify" }}>- {e} <br /></span>);
                    formik?.setFieldError(element, errorArray.reduce((p, c) => p + "\n" + c, ""));
                }
            }

            if (!prosRemoveMessage?.find(e => e === element) && mensagem.length > 0) {
                notification.error({
                    message: <span style={{ textAlign: "justify" }}>{mensagem}</span>,
                    duration: 10
                });
            }
        });


    } catch (e) {
        console.error("Erro ao exibir as messagem ", e);
    }
}