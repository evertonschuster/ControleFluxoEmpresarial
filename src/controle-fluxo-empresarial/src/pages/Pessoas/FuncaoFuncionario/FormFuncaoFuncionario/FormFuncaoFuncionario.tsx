import React, { useState, useEffect } from 'react'
import { FuncaoFuncionario } from '../../../../models/Pessoas/FuncaoFuncionario';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Row, Col } from 'antd';
import { Input, TextArea, Switch, InputNumber } from '../../../../components/WithFormItem/withFormItem';
import { FuncaoFuncionarioSchema } from './FuncaoFuncionarioSchema';
import { RouteComponentProps } from 'react-router-dom';

const FormFuncaoFuncionario: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [funcaofuncionario] = useState<FuncaoFuncionario>({
        nome: "",
        requerCNH: false,
        descricao: "",
    });
    const [loading] = useState(false);


    useEffect(() => {
        getFuncaoFuncionario();
    }, [props.match.params.id])


    async function onSubmit() {

    }

    async function getFuncaoFuncionario() {

    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/funcao-funcionario"
            breadcrumbList={[{ displayName: "Funções Funcionário", URL: "/funcao-funcionario" }, { displayName: "Nova Função Funcionário", URL: undefined }]}
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
