import React, { useState, useEffect } from 'react'
import ContaPagar from '../../../../models/Movimentos/ContaPagar';
import { FormikHelpers } from 'formik';
import { ContaPagarApi } from '../../../../apis/Movimentos/ContasPagar/ContaPagarApi';
import { errorBack } from '../../../../utils/MessageApi';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { useParams, useHistory } from 'react-router-dom';
import GeralForm from './componets/GeralForm';

const FromContaPagar: React.FC = () => {
    const [contaPagar, setContaPagar] = useState<ContaPagar>({
        numero: null,
        multa: null,
        dataEmissao: null,
        dataVencimento: null,
        desconto: null,
        formaPagamento: null,
        formaPagamentoId: null,
        fornecedor: null,
        fornecedorId: null,
        juro: null,
        modelo: "55",
        parcela: null,
        serie: "1",
        valor: null,
        dataPagamento: null,
    })
    
    const [loading, setLoading] = useState(false);
    const { id } = useParams<{ id: string | undefined }>()
    const history = useHistory()

    useEffect(() => {
        getContaPagar(id!);
    }, [id])


    async function onSubmit(conta: ContaPagar, formikHelpers: FormikHelpers<ContaPagar>) {
        try {
            if (id) {
                await ContaPagarApi.Update(conta);
            } else {
                await ContaPagarApi.Save(conta);
            }
            history.push("/conta-pagar")
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    async function getContaPagar(id: string) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdpais = await ContaPagarApi.GetById(id);
            setContaPagar(bdpais.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }


    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/cliente"
            breadcrumbList={[{ displayName: "Clientes", URL: "/cliente" }, { displayName: id ? "Edição do Cliente" : "Novo Cliente", URL: undefined }]}
            initialValues={contaPagar}
            // validationSchema={ClienteSchema}
            onSubmit={onSubmit}
        >
            <GeralForm />

        </CrudFormLayout>
    )
}

export default FromContaPagar
