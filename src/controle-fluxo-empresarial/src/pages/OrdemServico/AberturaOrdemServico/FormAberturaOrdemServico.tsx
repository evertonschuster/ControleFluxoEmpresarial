import React, { useState } from 'react'
import { errorBack } from '../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { OrdemServicoApi } from '../../../apis/OrdemServicos/OrdemServico';
import AberturaOrdemServico from '../../../models/OrdemServicos/AberturaOrdemServico';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './components/GeralForm';
import { OrdemServicoSchema } from './OrdemServicoSchema';
import { useHistory } from 'react-router-dom';

const FormAberturaOrdemServico: React.FC = () => {

    const [ordemSerico] = useState<AberturaOrdemServico>({
        clienteId: null,
        telefone: null,
        contato: null,
        numeroSerie: null,
        equipamentoId: null,
        problemaRelatadoId: null,
        descricaoAcessorio: null,
        descricaoObservacao: null,
    })

    const history = useHistory();

    async function onSubmit(os: AberturaOrdemServico, formikHelpers: FormikHelpers<AberturaOrdemServico>) {
        try {
            await OrdemServicoApi.New(os);
            history.push("/ordem-servico")
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    return (
        <CrudFormLayout
            isLoading={false}
            backPath="/ordem-servico"
            breadcrumbList={[{ displayName: "Ordem de Serviço", URL: "/ordem-servico" }, { displayName: "Abertura de Ordem de Serviço", URL: undefined }]}
            initialValues={ordemSerico}
            validationSchema={OrdemServicoSchema}
            onSubmit={onSubmit}
        >
            <GeralForm />

        </CrudFormLayout>
    )
}

export default FormAberturaOrdemServico
