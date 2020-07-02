import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { Categoria } from '../../../../models/Movimentos/Categoria';
import { CategoriaSchema } from './CategoriaSchema';
import { CategoriaApi } from '../../../../apis/Movimentos/CategoriaApi';
import InputSituation from '../../../../components/Situation/InputSituation';
const FormCategoria: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [categoria, setCategoria] = useState<Categoria>({ nome: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getCategoria(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: Categoria, formikHelpers: FormikHelpers<any>) {
        try {
            if (props.match.params.id) {
                await CategoriaApi.Update(values);
            } else {
                await CategoriaApi.Save(values);
            }
            props.history.push("/categoria")
        }
        catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getCategoria(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdCategoria = await CategoriaApi.GetById(id);
            setCategoria(bdCategoria.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/categoria"
            breadcrumbList={[{ displayName: "Categorias", URL: "/categoria" }, { displayName: props.match.params.id ? "Edição da Categoria" : "Nova Categoria", URL: undefined }]}
            initialValues={categoria}
            validationSchema={CategoriaSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={9}>
                    <Input name="nome" label="Categoria" placeholder="Manutenção" required />
                </Col>
                <Col span={2}>
                    <InputSituation name="situacao"  />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default FormCategoria;
