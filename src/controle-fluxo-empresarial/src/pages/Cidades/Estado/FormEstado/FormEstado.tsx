import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import SelectModel from '../../../../components/SelectModel/SelectModelOne';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Estado } from '../../../../models/Cidades/Estado';
import { EstadoSchema } from './EstadoSchema';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { PaisApi } from '../../../../apis/Cidades/PaisApi';
import { EstadoApi } from '../../../../apis/Cidades/EstadoApi';

const FormEstado: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [estado, setEstado] = useState<Estado>({ nome: "", uf: "", paisId: undefined })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEstado(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: Estado, formikHelpers: FormikHelpers<any>) {
        try {

            if (props.match.params.id) {
                await EstadoApi.Update(values);
            } else {
                await EstadoApi.Save(values);
            }

            props.history.push("/Estado")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getEstado(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdpais = await EstadoApi.GetById(id);
            setEstado(bdpais.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/estado"
            breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: props.match.params.id ? "Edição do Estado" : "Novo Estado", URL: undefined }]}
            initialValues={estado}
            validationSchema={EstadoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={3}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={10}>
                    <Input name="nome" label="Estado" placeholder="Estado" required />
                </Col>
                <Col span={3}>
                    <Input name="uf" label="UF" placeholder="UF" required />
                </Col>
                <Col span={8}>
                    <SelectModel
                        fetchMethod={PaisApi.GetById.bind(PaisApi)}
                        name="paisId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Pais", label: "Pais" }}
                        errorMessage={{ noSelection: "Selecione ao menos um Pais!" }}
                        path="pais" />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default FormEstado;
