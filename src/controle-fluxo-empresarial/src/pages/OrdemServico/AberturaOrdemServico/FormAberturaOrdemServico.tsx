import React, { useState } from 'react'
import { errorBack } from '../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { OrdemServicoApi } from '../../../apis/OrdemServicos/OrdemServico';
import AberturaOrdemServico from '../../../models/OrdemServicos/AberturaOrdemServico';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './components/GeralForm';

const FormAberturaOrdemServico: React.FC = () => {

    const [ordemSerico, setOrdemSerico] = useState({

    })

    const [loading, setLoading] = useState(false);

    async function onSubmit(os: AberturaOrdemServico, formikHelpers: FormikHelpers<AberturaOrdemServico>) {
        try {
            await OrdemServicoApi.New(os);
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }


    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/ordem-servico"
            breadcrumbList={[{ displayName: "Ordem de Serviço", URL: "/ordem-servico" }, { displayName: "Abertura de Ordem de Serviço", URL: undefined }]}
            initialValues={ordemSerico}
            // validationSchema={ClienteSchema}
            onSubmit={onSubmit}
        >
            <GeralForm />

        </CrudFormLayout>
    )
}

export default FormAberturaOrdemServico
