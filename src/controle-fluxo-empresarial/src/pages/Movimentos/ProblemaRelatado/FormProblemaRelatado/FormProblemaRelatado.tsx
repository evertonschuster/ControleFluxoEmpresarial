import React, { useState, useEffect } from 'react';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { ProblemaRelatado } from '../../../../models/Movimentos/ProblemaRelatado';
import { ProblemaRelatadoApi } from '../../../../apis/Movimentos/ProblemaRelatadoApi';
import { ProblemaRelatadoSchema } from './FormProblemaRelatadoSchema';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import InputSituation from '../../../../components/Situation/InputSituation/InputSituation';

const FormProblemaRelatado: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {
    const [problemarelatado, setProblemaRelatado] = useState<ProblemaRelatado>({ nome: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getProblemaRelatado(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: ProblemaRelatado, formikHelpers: FormikHelpers<ProblemaRelatado>) {
        try {

            if (props.match.params.id) {
                await ProblemaRelatadoApi.Update(values);
            } else {
                await ProblemaRelatadoApi.Save(values);
            }

            props.history.push("/problemas-relatado")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getProblemaRelatado(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdProblemaRelatado = await ProblemaRelatadoApi.GetById(id);
            setProblemaRelatado(bdProblemaRelatado.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/problemas-relatado"
            breadcrumbList={[{ displayName: "ProblemaRelatados", URL: "/problemas-relatado" }, { displayName: props.match.params.id ? "Edição da problemarelatado" :"Nova problemarelatado", URL: undefined }]}
            initialValues={problemarelatado}
            validationSchema={ProblemaRelatadoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={6}>
                    <Input name="nome" label="Problema Relatado" placeholder="Não liga" required />
                </Col>
                <Col span={2}>
                    <InputSituation name="situacao"  />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default FormProblemaRelatado;
