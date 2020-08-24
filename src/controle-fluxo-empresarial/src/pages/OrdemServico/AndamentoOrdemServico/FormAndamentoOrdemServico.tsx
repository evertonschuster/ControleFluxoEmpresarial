import React, { useState } from 'react'
import AndamentoOrdemServico from '../../../models/OrdemServicos/AndamentoOrdemServico';
import { FormikHelpers, FormikProps } from 'formik';
import { OrdemServicoApi } from '../../../apis/OrdemServicos/OrdemServico';
import { errorBack } from '../../../utils/MessageApi';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './components/GeralForm';
import FooterForm from './components/FooterForm';
import OrdemServico from '../../../models/OrdemServicos/OrdemServico';

const FormAndamentoOrdemServico: React.FC = () => {
    const [ordemSerico, setOrdemSerico] = useState<OrdemServico>({
        id: null,
        dataInicio: null,
        dataFinilizacao: null,
        items: []
    })

    const [loading, setLoading] = useState(false);

    async function onSubmit(os: AndamentoOrdemServico, formikHelpers: FormikHelpers<AndamentoOrdemServico>) {
        try {
            await OrdemServicoApi.Andamento(os);
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/ordem-servico"
            breadcrumbList={[{ displayName: "Ordem de Serviço", URL: "/ordem-servico" }, { displayName: "Andamento de Ordem de Serviço", URL: undefined }]}
            initialValues={ordemSerico}
            renderFooter={() => <FooterForm />}
            // validationSchema={ClienteSchema}
            onSubmit={onSubmit}
        >
            <GeralForm />

        </CrudFormLayout>
    )
}

export default FormAndamentoOrdemServico
