import React, { useEffect, useState } from 'react'
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import { Compra } from '../../../models/Compras/Compra';
import { useParams, useHistory } from 'react-router-dom';
import CompraPrincipal from './components/CompraPrincipal';
import { CompraSchema } from './CompraSchema';
import { CompraApi } from '../../../apis/Compras/CompraApi';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../utils/MessageApi';
import FormAction from './components/FormAction';

export enum FormCompraMode {
    COMPRA, //Cadastrando Produtos
    PAGAMENTO, //Gerando parcelas
    VISUALIZACAO,
    CANCELAMENTO
}

const FormCompra: React.FC = () => {

    const { modelo, serie, numero, fornecedorId } = useParams<{ modelo: string | undefined, serie: string | undefined, numero: string | undefined, fornecedorId: string | undefined }>()
    const history = useHistory<{ formMode: FormCompraMode }>();
    const [compra, setCompra] = useState<Compra & { formMode: FormCompraMode }>({
        numero: null,
        serie: null,
        modelo: null,
        fornecedorId: null,

        dataChegada: null,
        dataEmissao: null,

        produtos: [],
        parcelas: null,
        total: null,
        formMode: FormCompraMode.COMPRA
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (numero) {
            getCompra(modelo!, serie!, numero!, fornecedorId!);
        }

    }, [modelo, serie, numero, fornecedorId])

    async function getCompra(modelo: string, serie: string, numero: string, fornecedorId: string) {
        try {
            setLoading(true)
            let response = await CompraApi.GetById(modelo!, serie!, numero!, fornecedorId!);

            setCompra({ ...response.data, formMode: history.location.state.formMode ?? FormCompraMode.COMPRA })

        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
        // history.location.state
    }

    async function onSubmit(values: Compra, formikHelpers: FormikHelpers<Compra>) {
        try {
            if (numero) {
                await CompraApi.Update(values);
            } else {
                await CompraApi.Save(values);
            }
            history.push("/compras")
        }
        catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/compras"
            breadcrumbList={[{ displayName: "Compras", URL: "/compra" }, { displayName: numero ? "Compra" : "Nova Compra", URL: undefined }]}
            initialValues={compra}
            renderFooter={() => <FormAction />}
            validationSchema={CompraSchema}
            onSubmit={onSubmit}
        >
            <CompraPrincipal />

        </CrudFormLayout>
    )
}

export default FormCompra
