import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { Categoria } from '../../../../models/Movimentos/Categoria';
import { CategoriaSchema } from './CategoriaSchema';
import { UpdateCategoria, SaveCategoria, GetCategoriaById } from './../../../../apis/Movimentos/CategoriaApi';

const FormCategoria: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [categoria, setCategoria] = useState<Categoria>({ nome: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getCategoria(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: Categoria, formikHelpers: FormikHelpers<any>) {
        try {
            if (props.match.params.id) {
                await UpdateCategoria(values);
            } else {
                await SaveCategoria(values);
            }
            props.history.push("/categoria")
        }
        catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getCategoria(id: number) {
        if (!id) {
            return;
        }

        setLoading(true);
        let bdCategoria = await GetCategoriaById(id);
        setCategoria(bdCategoria.data);
        setLoading(false);
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/categoria"
            breadcrumbList={[{ displayName: "Categorias", URL: "/categoria" }, { displayName: "Nova categoria", URL: undefined }]}
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
            </Row>


        </CrudFormLayout>
    );

}

export default FormCategoria;
