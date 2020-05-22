import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { Marca } from '../../../../models/Movimentos/Marca';
import { MarcaSchema } from './FormMarcaSchema';

const FormMarca: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [marca, setMarca] = useState<Marca>({ nome: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getMarca(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: Marca, formikHelpers: FormikHelpers<any>) {

       
    }

    async function getMarca(id: number) {
      
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/marca"
            breadcrumbList={[{ displayName: "Marcas", URL: "/marca" }, { displayName: "Nova marca", URL: undefined }]}
            initialValues={marca}
            validationSchema={MarcaSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                </Col>
                <Col span={6}>
                    <Input name="nome" label="Marca" placeholder="Manutenção" required />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default FormMarca;
