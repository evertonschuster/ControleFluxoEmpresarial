import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { UnidadeMedida } from '../../../../models/Movimentos/UnidadeMedida';
import { UnidadeMedidaSchema } from './UnidadeMedidaSchema';
import { UnidadeMedidaApi } from '../../../../apis/Movimentos/UnidadeMedidaApi';
import InputSituation from '../../../../components/Situation/InputSituation';

const FormUnidadeMedida: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [unidademedida, setUnidadeMedida] = useState<UnidadeMedida>({ nome: "", id: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getUnidadeMedida(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: UnidadeMedida, formikHelpers: FormikHelpers<UnidadeMedida>) {
        try {

            if (props.match.params.id) {
                await UnidadeMedidaApi.Update(values);
            } else {
                await UnidadeMedidaApi.Save(values);
            }

            props.history.push("/unidade-medida")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }

    }

    async function getUnidadeMedida(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdCidade = await UnidadeMedidaApi.GetById(id);
            setUnidadeMedida(bdCidade.data);

        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/unidade-medida"
            breadcrumbList={[{ displayName: "Unidades de Medida", URL: "/unidade-medida" }, { displayName: props.match.params.id ? "Edição da Unida de Medida" : "Nova Unida de Medida", URL: undefined }]}
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
                <Col span={2}>
                    <InputSituation name="situacao"  />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default FormUnidadeMedida;
