import React, { useState } from 'react'
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import { Compra } from '../../../models/Compras/Compra';
import { useParams } from 'react-router-dom';
import CompraPrincipal from './components/CompraPrincipal';
import { CompraSchema } from './CompraSchema';

export enum FormCompraMode {
    COMPRA, //Cadastrando Produtos
    PAGAMENTO //Gerando parcelas
}

const FormCompra: React.FC = () => {

    const { id } = useParams<{ id: string | undefined }>()
    const [compra] = useState<Compra & { formMode: FormCompraMode }>({
        numero: null,
        serie: null,
        modelo: null,
        fornecedorId: null,

        dataChegada: null,
        dataEmissao: null,

        compraProdutos: [],
        parcelas: null,
        total: null,
        formMode: FormCompraMode.COMPRA
    })
    const [loading] = useState(false);

    async function onSubmit() {
        // try {
        //     if (id) {
        //         await CategoriaApi.Update(values);
        //     } else {
        //         await CategoriaApi.Save(values);
        //     }
        //     props.history.push("/categoria")
        // }
        // catch (e) {
        //     errorBack(formikHelpers, e, ["nome"]);
        // }
    }


    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/compras"
            breadcrumbList={[{ displayName: "Compra", URL: "/compra" }, { displayName: id ? "Edição da Compra" : "Nova Compra", URL: undefined }]}
            initialValues={compra}
            validationSchema={CompraSchema}
            onSubmit={onSubmit}
        >
            <CompraPrincipal />

        </CrudFormLayout>
    )
}

export default FormCompra
