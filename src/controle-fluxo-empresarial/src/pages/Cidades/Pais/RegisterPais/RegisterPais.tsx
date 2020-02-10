import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { PaisSchema } from './PaisSchema';
import { SavePais, GetPaisById, UpdatePais } from '../../../../apis/Cidades/PaisApi';
import { Pais } from '../../../../models/Cidades/Pais';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';

const RegisterPais: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [loading, setLoading] = useState(false);
    const [pais, setPais] = useState<Pais>({ nome: "", dDI: "", sigla: "" })

    useEffect(() => {
        getPais(props.match.params.id);
    }, [])

    async function onSubmit(values: any, formikHelpers: FormikHelpers<any>) {

        try {
            if (props.match.params.id) {
                await UpdatePais(values);
            } else {
                await SavePais(values);
            }
            props.history.push("/Pais")
        }
        catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getPais(id: number) {
        if (!id) {
            return;
        }

        setLoading(true);
        let bdpais = await GetPaisById(id);
        setPais(bdpais.data);
        setLoading(false);
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            onSubmit={onSubmit}
            validationSchema={PaisSchema}
            breadcrumbList={[{ displayName: "Pais", URL: "/Pais" }, { displayName: "Novo Pais", URL: undefined }]}
            backPath="/pais"
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
                    <Input name="dDI" label="DDI" placeholder="DDI" required />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default withRouter(RegisterPais);
