import React, { useState, useEffect } from 'react'
import { FuncaoFuncionario } from '../../../../models/Pessoas/FuncaoFuncionario';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Row, Col } from 'antd';
import { Input, TextArea, Switch, InputNumber } from '../../../../components/WithFormItem/withFormItem';
import { FuncaoFuncionarioSchema } from './FuncaoFuncionarioSchema';
import { RouteComponentProps } from 'react-router-dom';
import { FuncaoFuncionarioApi } from '../../../../apis/Pessoas/FuncaoFuncionarioApi';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';

const FormFuncaoFuncionario: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [funcaofuncionario, setFuncaofuncionario] = useState<FuncaoFuncionario>({
        nome: "",
        requerCNH: false,
        descricao: "",
        cargaHoraria: undefined,
        observacao: ""
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getFuncaoFuncionario(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: FuncaoFuncionario, formikHelpers: FormikHelpers<FuncaoFuncionario>) {

        try {
            if (props.match.params.id) {
                await FuncaoFuncionarioApi.Update(values);
            } else {
                await FuncaoFuncionarioApi.Save(values);
            }
            props.history.push("/funcao-funcionario")
        }
        catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getFuncaoFuncionario(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdFuncaofuncionario = await FuncaoFuncionarioApi.GetById(id);
            setFuncaofuncionario(bdFuncaofuncionario.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/funcao-funcionario"
            breadcrumbList={[{ displayName: "Funções Funcionário", URL: "/funcao-funcionario" }, { displayName: props.match.params.id ? "Edição da Função Funcionário" :"Nova Função Funcionário", URL: undefined }]}
            initialValues={funcaofuncionario}
            validationSchema={FuncaoFuncionarioSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={7}>
                    <Input name="nome" label="Função Funcionário" placeholder="técnico" required />
                </Col>
                <Col span={2}>
                    <InputNumber name="cargaHoraria" label="Carga Horária" placeholder="8" required />
                </Col>

                <Col span={2}>
                    <Switch name="requerCNH" label="Requer CNH?" checkedChildren="Requer" unCheckedChildren="Opcional" ></Switch>
                </Col>
            </Row>

            <Row>
                <Col span={13}>
                    <TextArea name="descricao" label="Descrição" rows={4} />
                </Col>
            </Row>

            <Row>
                <Col span={13}>
                    <TextArea name="observacao" label="Observação" rows={4} />
                </Col>
            </Row>

        </CrudFormLayout>
    )
}

export default FormFuncaoFuncionario
