import React, { useState, useEffect } from 'react';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { Marca } from '../../../../models/Movimentos/Marca';
import { MarcaApi } from '../../../../apis/Movimentos/MarcaApi';
import { MarcaSchema } from './FormMarcaSchema';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import InputSituation from '../../../../components/Situation/InputSituation/InputSituation';

const FormMarca: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [marca, setMarca] = useState<Marca>({ nome: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getMarca(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: Marca, formikHelpers: FormikHelpers<Marca>) {
        try {

            if (props.match.params.id) {
                await MarcaApi.Update(values);
            } else {
                await MarcaApi.Save(values);
            }

            props.history.push("/marca")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getMarca(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdMarca = await MarcaApi.GetById(id);
            setMarca(bdMarca.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/marca"
            breadcrumbList={[{ displayName: "Marcas", URL: "/marca" }, { displayName: props.match.params.id ? "Edição da marca" :"Nova marca", URL: undefined }]}
            initialValues={marca}
            validationSchema={MarcaSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={6}>
                    <Input name="nome" label="Marca" placeholder="Manutenção" required />
                </Col>
                <Col span={2}>
                    <InputSituation name="situacao"  />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default FormMarca;
