import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OrdemServicoApi } from '../../../apis/OrdemServicos/OrdemServico'
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout'
import OrdemServico from '../../../models/OrdemServicos/OrdemServico'
import { errorBack } from '../../../utils/MessageApi'
import FooterForm from './components/FooterForm'
import GeralForm from './components/GeralForm'

const FromResumoOrdemServico:React.FC = () => {
    const [ordemSerico, setOrdemSerico] = useState<OrdemServico>({
        id: null,
        servicos: [],
        produtos: [],
        parcelasServico: [],
        parcelasProduto: []
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

    async function onSubmit() {
       
    }


    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/ordem-servico"
            breadcrumbList={[{ displayName: "Ordem de Serviço", URL: "/ordem-servico" }, { displayName: "Ordem de Serviço", URL: undefined }]}
            initialValues={ordemSerico}
            renderFooter={() => <FooterForm />}
            onSubmit={onSubmit}
        >
            <GeralForm />

        </CrudFormLayout>
    )
}

export default FromResumoOrdemServico
