import React, { useEffect, useState } from 'react'
import AndamentoOrdemServico from '../../../models/OrdemServicos/AndamentoOrdemServico';
import { FormikHelpers } from 'formik';
import { OrdemServicoApi } from '../../../apis/OrdemServicos/OrdemServico';
import { errorBack } from '../../../utils/MessageApi';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './components/GeralForm';
import FooterForm from './components/FooterForm';
import OrdemServico from '../../../models/OrdemServicos/OrdemServico';
import { useParams } from 'react-router-dom';
import { OrdemServicoItemSchema } from './OrdemServicoItemSchema';

const FormAndamentoOrdemServico: React.FC = () => {
    const [ordemSerico, setOrdemSerico] = useState<OrdemServico>({
        id: null,
        servicos: [],
        produtos: [],
        parcelas: []
    })

    const [loading, setLoading] = useState(false);
    let { id } = useParams<{ id: string }>();

    useEffect(() => {
        getOrdemServico(id);
    }, [])

    async function getOrdemServico(id: string) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let result = await OrdemServicoApi.getById(id);
            setOrdemSerico(result.data);

        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    async function onSubmit(os: AndamentoOrdemServico, formikHelpers: FormikHelpers<AndamentoOrdemServico>) {
        try {
            await OrdemServicoApi.Finalizar(os);
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
            validationSchema={OrdemServicoItemSchema}
            onSubmit={onSubmit}
        >
            <GeralForm />

        </CrudFormLayout>
    )
}

export default FormAndamentoOrdemServico
