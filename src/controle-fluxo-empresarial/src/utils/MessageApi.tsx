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

        if (!response?.errors) {
            return;
        }

        formik?.setErrors(response.errors);
        notification.error({
            message: response["message"],
            duration: 10
        });

        const errors = response.errors;

        Object.keys(errors).forEach(element => {
            let mensagem = errors[element];

            if (Array.isArray(mensagem)) {
                let errorArray: any[] = errors[element]

                mensagem = errorArray.map(e => <span style={{ textAlign: "justify" }}>- {e} <br /></span>);
                formik?.setFieldError(element, errorArray.reduce((p, c) => p + "\n" + c, ""));
            }

            if (!prosRemoveMessage?.find(e => e === element)) {
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