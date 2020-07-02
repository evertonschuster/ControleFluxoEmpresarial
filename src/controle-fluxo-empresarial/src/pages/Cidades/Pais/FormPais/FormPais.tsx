import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { PaisSchema } from './PaisSchema';
import { Pais } from '../../../../models/Cidades/Pais';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { PaisApi } from '../../../../apis/Cidades/PaisApi';
import InputSituation from '../../../../components/Situation/InputSituation';

const FormPais: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [loading, setLoading] = useState(false);
    const [pais, setPais] = useState<Pais>({ nome: "", ddi: "", sigla: "" })

    useEffect(() => {
        getPais(props.match.params.id);
    }, [props.match.params.id])

    async function onSubmit(values: Pais, formikHelpers: FormikHelpers<Pais>) {

        try {
            if (props.match.params.id) {
                await PaisApi.Update(values);
            } else {
                await PaisApi.Save(values);
            }
            props.history.push("/Pais")
        }
        catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getPais(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdpais = await PaisApi.GetById(id);
            setPais(bdpais.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            onSubmit={onSubmit}
            validationSchema={PaisSchema}
            breadcrumbList={[{ displayName: "Pais", URL: "/Pais" }, { displayName: props.match.params.id ? "Edição do Pais" : "Novo Pais", URL: undefined }]}
            backPath="/pais"
            initialValues={pais}>

            <Row>
                <Col span={3}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={8}>
                    <Input name="nome" label="Pais" placeholder="Pais" required />
                </Col>
                <Col span={4}>
                    <Input name="sigla" label="Sigla" placeholder="Sigla" required />
                </Col>
                <Col span={4}>
                    <Input name="ddi" label="DDI" placeholder="DDI" required />
                </Col>
                <Col span={4}>
                    <InputSituation name="situacao"  />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default withRouter(FormPais);
