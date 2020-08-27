import React, { useState } from 'react'
import AndamentoOrdemServico from '../../../models/OrdemServicos/AndamentoOrdemServico';
import { FormikHelpers, FormikProps } from 'formik';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './components/GeralForm';
import FooterForm from './components/FooterForm';
import OrdemServico from '../../../models/OrdemServicos/OrdemServico';
import { OrdemServicoItemType } from '../../../models/OrdemServicos/OrdemServicoItem';

const FormOrcamentoOrdemServico: React.FC = () => {
    const [ordemSerico, setOrdemSerico] = useState<OrdemServico>({
        id: null,
        condicaoPagamentoId: 1,
        items: [
            {
                produtoId: 2,
                produto: { nome: "Parafuso" },
                quantidade: 1,
                tipo: OrdemServicoItemType.Produto,
            },
            {
                servicoId: 2,
                servico: { nome: "Mão de obra" },
                quantidade: 1,
                tipo: OrdemServicoItemType.Servico,
            }
        ]
    })

    const [loading, setLoading] = useState(false);

    async function onSubmit(os: AndamentoOrdemServico, formikHelpers: FormikHelpers<AndamentoOrdemServico>) {

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

export default FormOrcamentoOrdemServico
