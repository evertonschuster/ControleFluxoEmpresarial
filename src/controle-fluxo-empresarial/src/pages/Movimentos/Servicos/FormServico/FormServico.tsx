import React, { useState, useEffect } from 'react'
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { Servico } from '../../../../models/Movimentos/Servico';
import { ServicoApi } from '../../../../apis/Movimentos/ServicoApi';
import { ServicoSchema } from './ServicoSchema';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import GeneralForm from './components/GeneralForm';

const FormServico: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {
    const [servico, setServico] = useState<Servico>({
        nome: "",
        valor: undefined,
        categoriaId: undefined,
        descricao: undefined,
        observacao: undefined,
        funcionarios: undefined
    });
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        getServico(props.match.params.id);
    }, [props.match.params.id])



    async function onSubmit(Servico: Servico, formikHelpers: FormikHelpers<Servico>) {
        try {

            if (props.match.params.id) {
                await ServicoApi.Update(Servico);
            } else {
                await ServicoApi.Save(Servico);
            }

            props.history.push("/Servico")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getServico(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdServico = await ServicoApi.GetById(id);

            setServico(bdServico.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/servico"
            breadcrumbList={[{ displayName: "Serviços", URL: "/servico" }, { displayName: props.match.params.id ? "Edição do Serviço" : "Novo Serviço", URL: undefined }]}
            initialValues={servico}
            validationSchema={ServicoSchema}
            onSubmit={onSubmit}
        >

            <GeneralForm />

        </CrudFormLayout>)
}

export default FormServico
