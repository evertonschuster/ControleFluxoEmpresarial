import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import SelectModel from '../../../../components/SelectModel/SelectModelOne';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Cidade } from '../../../../models/Cidades/Cidade';
import { CidadeSchema } from './CidadeSchema';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { EstadoApi } from '../../../../apis/Cidades/EstadoApi';
import { CidadeApi } from '../../../../apis/Cidades/CidadeApi';

const CreateCidade: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


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
        if (!id) {
            return;
        }

        setLoading(true);
        let bdCidade = await CidadeApi.GetById(id);
        setCidade(bdCidade.data);
        setLoading(false);
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/cidade"
            breadcrumbList={[{ displayName: "Cidade", URL: "/Cidade" }, { displayName: "Novo Cidade", URL: undefined }]}
            initialValues={cidade}
            validationSchema={CidadeSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={12}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={12}>
                    <Input name="nome" label="Cidade" placeholder="Cidade" required />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Input name="ddd" label="DDD" placeholder="DDD" required />
                </Col>
                <Col span={12}>
                    <SelectModel
                        fetchMethod={EstadoApi.GetById.bind(EstadoApi)}
                        name="estadoId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Estado", label: "Estado" }}
                        errorMessage={{ noSelection: "Selecione ao menos um Estado!" }}
                        path="estado" />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default CreateCidade;
