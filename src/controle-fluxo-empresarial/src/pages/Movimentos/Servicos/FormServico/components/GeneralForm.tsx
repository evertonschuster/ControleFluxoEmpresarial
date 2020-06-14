import React, {  } from 'react'
import { Row, Col } from 'antd';
import { Input, InputNumber } from '../../../../../components/WithFormItem/withFormItem';
import { TextArea } from './../../../../../components/WithFormItem/withFormItem';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import SelectModelMoreWithTable from '../../../../../components/SelectModel/SelectModelMoreWithTable';
import { CategoriaApi } from '../../../../../apis/Movimentos/CategoriaApi';
import { FuncaoFuncionarioApi } from '../../../../../apis/Pessoas/FuncaoFuncionarioApi';
import { ColumnProps } from 'antd/lib/table';
import { Funcionario } from './../../../../../models/Pessoas/Funcionario';

const columns: ColumnProps<Funcionario>[] = [
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

const GeneralForm: React.FC = () => {
    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={6}>
                    <Input name="nome" label="Serviço" placeholder="Serviço" required />
                </Col>

                <Col span={4}>
                    <InputNumber name="valor" label="Valor" required min={0}/>
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
        </>
    )
}

export default GeneralForm
