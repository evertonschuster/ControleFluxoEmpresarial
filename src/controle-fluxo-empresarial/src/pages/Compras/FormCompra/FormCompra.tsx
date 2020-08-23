import React, { useState } from 'react'
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import { Compra } from '../../../models/Compras/Compra';
import { useParams } from 'react-router-dom';
import { FormikHelpers, FormikProps } from 'formik';
import CompraPrincipal from './components/CompraPrincipal';
import { formatDataWithHour } from '../../../utils/FormatNumber';
import { Row, Col } from 'antd';

const FormCompra: React.FC = () => {

    const { id } = useParams<{ id: string | undefined }>()
    const [compra, setCompra] = useState<Compra>({
        compraProdutos: [],
        total: null
    })
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: Compra, formikHelpers: FormikHelpers<Compra>) {
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

    function renderFooter(formik: FormikProps<Compra>) {
        return (
            <Row>
                <div>
                    <span style={{ textAlign: "end" }} >
                        Data Criação: {formik.values?.dataCriacao ? formatDataWithHour(formik.values?.dataCriacao) : "  /  /"}
                    </span>
                    <span style={{ textAlign: "end" }} >
                        Data Atualização: {formik.values?.dataAtualizacao ? formatDataWithHour(formik.values?.dataAtualizacao) : "  /  /"}
                    </span>
                </div>
            </Row>
        )
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/categoria"
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
