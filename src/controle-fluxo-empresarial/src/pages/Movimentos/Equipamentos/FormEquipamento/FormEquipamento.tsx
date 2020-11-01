import React, { useState, useEffect } from 'react';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { Equipamento } from '../../../../models/Movimentos/Equipamento';
import { EquipamentoApi } from '../../../../apis/Movimentos/EquipamentoApi';
import { EquipamentoSchema } from './FormEquipamentoSchema';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import InputSituation from '../../../../components/Situation/InputSituation/InputSituation';
import { MarcaApi } from '../../../../apis/Movimentos/MarcaApi';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';

const FormEquipamento: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [equipamento, setEquipamento] = useState<Equipamento>({ nome: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getEquipamento(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: Equipamento, formikHelpers: FormikHelpers<Equipamento>) {
        try {

            if (props.match.params.id) {
                await EquipamentoApi.Update(values);
            } else {
                await EquipamentoApi.Save(values);
            }

            props.history.push("/equipamentos")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getEquipamento(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdEquipamento = await EquipamentoApi.GetById(id);
            setEquipamento(bdEquipamento.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/equipamentos"
            breadcrumbList={[{ displayName: "Equipamentos", URL: "/equipamentos" }, { displayName: props.match.params.id ? "Edição da equipamento" : "Nova equipamento", URL: undefined }]}
            initialValues={equipamento}
            validationSchema={EquipamentoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={6}>
                    <Input name="nome" label="Equipamento" placeholder="Equipamento" required />
                </Col>
                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={MarcaApi.GetById.bind(MarcaApi)}
                        name="marcaId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Marca", label: "Marca" }}
                        errorMessage={{ noSelection: "Selecione uma Marca!" }}
                        path="marca" />
                </Col>
                <Col span={2}>
                    <InputSituation name="situacao" />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default FormEquipamento;
