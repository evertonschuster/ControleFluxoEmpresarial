import React, { useState } from 'react'
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import { Compra } from '../../../models/Compras/Compra';
import { useParams } from 'react-router-dom';
import CompraPrincipal from './components/CompraPrincipal';

export enum FormCompraMode {
    COMPRA,
    PAGAMENTO
}

const FormCompra: React.FC = () => {

    const { id } = useParams<{ id: string | undefined }>()
    const [compra] = useState<Compra & { formMode: FormCompraMode }>({
        compraProdutos: [],
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
            // validationSchema={CategoriaSchema}
            onSubmit={onSubmit}
        >
            <CompraPrincipal />

        </CrudFormLayout>
    )
}

export default FormCompra
