import React, { useState, useEffect } from 'react'
import { Servico } from '../../../../models/Movimentos/Servico';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Row, Col } from 'antd';
import { Input, InputNumber } from '../../../../components/WithFormItem/withFormItem';
import { RouteComponentProps } from 'react-router-dom';
import { ServicoSchema } from './ServicoSchema';
import { TextArea } from './../../../../components/WithFormItem/withFormItem';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import SelectModelMoreWithTable from '../../../../components/SelectModel/SelectModelMoreWithTable';
import { ColumnProps } from 'antd/lib/table';
import { CategoriaApi } from '../../../../apis/Movimentos/CategoriaApi';
import { FuncaoFuncionarioApi } from '../../../../apis/Pessoas/FuncaoFuncionarioApi';
import { errorBack } from '../../../../utils/MessageApi';

const FormServico: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {
    const [servico] = useState<Servico>({
        nome: "",
        valor: undefined,
        categoriaId: undefined,
    });
    const [loading, setLoading] = useState(false);
    const columns: ColumnProps<any>[] = [
        {
            title: 'Funcionário',
            dataIndex: 'nome',
        },
        {
            title: 'Idade',
            dataIndex: 'idade',
        },
        {
            title: 'Função',
            dataIndex: 'funcaoFuncionario.nome',
        },
    ];


    useEffect(() => {
        getServico();
    }, [props.match.params.id])



    async function onSubmit() {

    }

    async function getServico() {
        try {


        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/servico"
            breadcrumbList={[{ displayName: "Serviços", URL: "/servico" }, { displayName: props.match.params.id ? "Edição do Serviço" : "Novo Serviço", URL: undefined }]}
            initialValues={servico}
            validationSchema={ServicoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={6}>
                    <Input name="nome" label="Serviço" placeholder="Serviço" required />
                </Col>

                <Col span={4}>
                    <InputNumber name="valor" label="Valor" required />
                </Col>

                <Col span={8}>
                    <SelectModelOne
                        fetchMethod={CategoriaApi.GetById.bind(CategoriaApi)}
                        name="categoriaId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Categoria", label: "Categoria" }}
                        errorMessage={{ noSelection: "Selecione ao menos uma Categoriaa!" }}
                        path="categoria" />
                </Col>
            </Row>


            <Row>
                <Col span={12}>
                    <TextArea name="descricao" label="Descrição" rows={3} />
                </Col>

                <Col span={12}>
                    <TextArea name="oservacao" label="Observação" rows={3} />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <SelectModelMoreWithTable
                        fetchMethod={FuncaoFuncionarioApi.GetById.bind(FuncaoFuncionarioApi)}
                        label={{ label: "Funcionários", title: "Selecione um Funcionário" }}
                        name="funcionarioIds"
                        columns={columns}
                        errorMessage={{ noSelection: "Selecione ao menos um funcionário" }}
                        path="funcionario"
                    />
                </Col>
            </Row>


        </CrudFormLayout>)
}

export default FormServico
