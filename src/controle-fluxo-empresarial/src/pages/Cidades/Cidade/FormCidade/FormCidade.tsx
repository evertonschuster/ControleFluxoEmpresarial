import React, { useState, useEffect } from 'react';
import { Cidade } from '../../../../models/Cidades/Cidade';
import { CidadeApi } from '../../../../apis/Cidades/CidadeApi';
import { CidadeSchema } from './CidadeSchema';
import { errorBack } from '../../../../utils/MessageApi';
import { EstadoApi } from '../../../../apis/Cidades/EstadoApi';
import { FormikHelpers } from 'formik';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import InputSituation from '../../../../components/Situation/InputSituation/InputSituation';
import SelectModel from '../../../../components/SelectModel/SelectModelOne';

const FormCidade: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [cidade, setCidade] = useState<Cidade>({ nome: "", ddd: "", estadoId: undefined })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getCidade(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: Cidade, formikHelpers: FormikHelpers<Cidade>) {

        try {

            if (props.match.params.id) {
                await CidadeApi.Update(values);
            } else {
                await CidadeApi.Save(values);
            }

            props.history.push("/Cidade")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getCidade(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdCidade = await CidadeApi.GetById(id);
            setCidade(bdCidade.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/cidade"
            breadcrumbList={[{ displayName: "Cidade", URL: "/Cidade" }, { displayName: props.match.params.id ? "Edição da Cidade" : "Novo Cidade", URL: undefined }]}
            initialValues={cidade}
            validationSchema={CidadeSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={3}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={8}>
                    <Input name="nome" label="Cidade" placeholder="Cidade" required />
                </Col>
                <Col span={3}>
                    <Input name="ddd" label="DDD" placeholder="DDD" required />
                </Col>
                <Col span={8}>
                    <SelectModel
                        fetchMethod={EstadoApi.GetById.bind(EstadoApi)}
                        name="estadoId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Estado", label: "Estado" }}
                        errorMessage={{ noSelection: "Selecione ao menos um Estado!" }}
                        path="estado" />
                </Col>
                <Col span={2}>
                    <InputSituation name="situacao"  />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default FormCidade;
