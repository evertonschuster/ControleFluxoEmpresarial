import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { SignupSchema } from './PaisSchema';
import { SavePais, GetPais, UpdatePais } from '../../../../apis/cidades/PaisApi';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers, useFormikContext } from 'formik';
import { Pais } from '../../../../models/Cidades/Pais';

const RegisterPais: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [loading, setLoading] = useState(false);
    const [pais, setPais] = useState<Pais>({ nome: "", ddi: "", sigla: "" })

    useEffect(() => {
        getPais(props.match.params.id);
    }, [])

    async function onSubmit(values: any) {

        if (props.match.params.id) {
            await UpdatePais(values);
        } else {
            await SavePais(values);
        }

        props.history.push("/Pais")
    }

    async function getPais(id: number) {
        if (!id) {
            return;
        }

        setLoading(true);
        let bdpais = await GetPais(id);
        setPais(bdpais.data);
        setLoading(false);
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            onSubmit={onSubmit}
            validationSchema={SignupSchema}
            breadcrumbList={[{ displayName: "Pais", URL: "/Pais" }, { displayName: "Novo Pais", URL: undefined }]}
            initialValues={pais}>

            <Row>
                <Col span={12}>
                    <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                </Col>
                <Col span={12}>
                    <Input name="nome" label="Pais" placeholder="Pais" required />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Input name="sigla" label="Sigla" placeholder="Sigla" required />
                </Col>
                <Col span={12}>
                    <Input name="ddi" label="DDI" placeholder="DDI" required />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default withRouter(RegisterPais);
