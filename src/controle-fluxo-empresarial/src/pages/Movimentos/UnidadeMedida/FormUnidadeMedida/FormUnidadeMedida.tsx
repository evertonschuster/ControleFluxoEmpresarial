import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { UnidadeMedida } from '../../../../models/Movimentos/UnidadeMedida';
import { UnidadeMedidaSchema } from './UnidadeMedidaSchema';

const FormUnidadeMedida: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [unidademedida, setUnidadeMedida] = useState<UnidadeMedida>({ nome: "", id: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getUnidadeMedida(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: UnidadeMedida, formikHelpers: FormikHelpers<any>) {


    }

    async function getUnidadeMedida(id: number) {

    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/unidade-medida"
            breadcrumbList={[{ displayName: "Unidade Medidas", URL: "/unidade-medida" }, { displayName: "Nova Unida de Medida", URL: undefined }]}
            initialValues={unidademedida}
            validationSchema={UnidadeMedidaSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" />
                </Col>
                <Col span={6}>
                    <Input name="nome" label="Unidade Medida" placeholder="Unidade" required />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default FormUnidadeMedida;
