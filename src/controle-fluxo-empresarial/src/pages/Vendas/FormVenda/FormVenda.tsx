import React, { useEffect, useState } from 'react'
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../utils/MessageApi';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Venda } from '../../../models/Vendas/Venda';
import { VendaApi } from '../../../apis/Vendas/VendaAPI';
import { VendaSchema } from './VendaSchema';
import GeralForm from './components/GeralForm';
import FooterForm from './components/FooterForm';

export enum FormModeVenda {
    VENDA,
    PAGAMENTO,
    CANCELAMENTO,
    VISUALIZACAO
}


const FormVenda: React.FC = () => {
    const [ordemSerico, setOrdemSerico] = useState<Venda>({
        cliente: null,
        clienteId: null,
        condicaoPagamentoId: null,
        descricao: null,
        modelo: "55",
        numero: null,
        ordemServicoId: null,
        serie: "1",
        userAtualizacao: null,
        userCriacao: null,
        produtos: [],
        parcelas: null,
        forMode: FormModeVenda.VENDA
    } as Venda)

    const [loading, setLoading] = useState(false);
    const { modelo, serie, numero } = useParams<{ modelo: string | undefined, serie: string | undefined, numero: string | undefined }>()
    const history = useHistory<{ formMode: FormModeVenda }>();

    useEffect(() => {

        getVenda(modelo, serie, numero);
    }, [])

    async function getVenda(modelo?: string, serie?: string, numero?: string) {
        try {
            if (!modelo) {
                return;
            }

            setLoading(true);
            let result = await VendaApi.GetById(modelo, serie!, numero!);
            setOrdemSerico({ ...result.data, forMode: history.location.state.formMode } as Venda);

        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    async function onSubmit(os: Venda, formikHelpers: FormikHelpers<Venda>) {
        try {
            await VendaApi.Save(os);
            history.push("/vendas")
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/vendas"
            breadcrumbList={[{ displayName: "Venda", URL: "/vendas" }, { displayName: "Venda", URL: undefined }]}
            initialValues={ordemSerico}
            renderFooter={() => <FooterForm />}
            validationSchema={VendaSchema}
            onSubmit={onSubmit}
        >
            <GeralForm />

        </CrudFormLayout>
    )
}

export default FormVenda
