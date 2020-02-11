import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import SelectModel from '../../../../components/SelectModel/SelectModelOne';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Estado } from '../../../../models/Cidades/Estado';
import { EstadoSchema } from './EstadoSchema';
import { UpdateEstado, SaveEstado, GetEstadoById } from '../../../../apis/Cidades/EstadoApi';
import { GetPaisById } from '../../../../apis/Cidades/PaisApi';
import BasicLayoutContext from '../../../../layouts/BasicLayout/BasicLayoutContext';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';

const RegisterEstado: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [estado, setEstado] = useState<Estado>({ nome: "", uf: "", paisId: undefined })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEstado(props.match.params.id);
    }, [])


    async function onSubmit(values: Estado, formikHelpers: FormikHelpers<any>) {
        try {

            if (props.match.params.id) {
                await UpdateEstado(values);
            } else {
                await SaveEstado(values);
            }

            props.history.push("/Estado")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getEstado(id: number) {
        if (!id) {
            return;
        }

        setLoading(true);
        let bdpais = await GetEstadoById(id);
        setEstado(bdpais.data);
        setLoading(false);
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/estado"
            breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: "Novo Estado", URL: undefined }]}
            initialValues={estado}
            validationSchema={EstadoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={12}>
                    <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                </Col>
                <Col span={12}>
                    <Input name="nome" label="Estado" placeholder="Estado" required />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Input name="uf" label="UF" placeholder="UF" required />
                </Col>
                <Col span={12}>
                    <SelectModel
                        fetchMethod={GetPaisById}
                        name="paisId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Pais", label: "Pais" }}
                        errorMessage={{ noSelection: "Selecione ao menos um Pais!" }}
                        path="pais" />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default RegisterEstado;
