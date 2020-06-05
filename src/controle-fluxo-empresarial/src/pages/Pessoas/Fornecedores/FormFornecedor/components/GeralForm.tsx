import React, { useEffect } from 'react'
import { Row, Col, Select as SelectAntd } from 'antd';
import { Input, Select, DatePicker, InputNumber, TextArea } from '../../../../../components/WithFormItem/withFormItem';
import { TIPO_PESSOA } from '../../../../../models/Pessoas/Pessoa';
import { useField, useFormikContext } from 'formik';
import { Fornecedor } from './../../../../../models/Pessoas/Fornecedor';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import { GetCondicaoPagamentoById } from '../../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import { GetCidadeById } from '../../../../../apis/Cidades/CidadeApi';

const GeralForm: React.FC = () => {

    const [field,] = useField<TIPO_PESSOA>({ name: "tipo" });
    const { setFieldValue } = useFormikContext<Fornecedor>();

    useEffect(() => {

        setFieldValue("estadoCivil", undefined);
        setFieldValue("sexo", undefined);
        setFieldValue("dataNascimento", undefined);
        setFieldValue("nacionalidade", undefined);

    }, [field.value])

    return (
        <>

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={4}>
                    <Select name="tipo" label="Tipo" required>
                        <SelectAntd.Option key={TIPO_PESSOA.Fisica} value={TIPO_PESSOA.Fisica}>Pessoa Física.</SelectAntd.Option>
                        <SelectAntd.Option key={TIPO_PESSOA.Juridica} value={TIPO_PESSOA.Juridica}>Pessoa Jurídica.</SelectAntd.Option>
                    </Select>
                </Col>

                <Col span={7}>
                    <Input name="nome" label="Fornecedor" placeholder={field.value === TIPO_PESSOA.Fisica ? "João da silva" : "Eletrônicos do João"} required fast={false} />
                </Col>

                <Col span={7}>
                    <Input name="apelido" label={field.value === TIPO_PESSOA.Fisica ? "Apelido" : "Nome Fantasia"} placeholder={field.value === TIPO_PESSOA.Fisica ? "João" : "Eletrôjoão"} fast={false} />
                </Col>

            </Row>


            <Row>
                <Col span={5}>
                    <Input name="endereco" label="Endereço" placeholder="Av das americas." required />
                </Col>

                <Col span={2}>
                    <InputNumber name="numero" label="Número" placeholder="549" required />
                </Col>

                <Col span={5}>
                    <Input name="complemento" label="Complemento" placeholder="" />
                </Col>

                <Col span={4}>
                    <Input name="bairro" label="Bairro" placeholder="Jardim Horizonte." required />
                </Col>

                <Col span={3}>
                    <Input name="cep" label="CEP" placeholder="85890-000" required />
                </Col>

                <Col span={5}>
                    <SelectModelOne
                        fetchMethod={GetCidadeById}
                        name="cidadeId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Cidade", label: "Cidade" }}
                        errorMessage={{ noSelection: "Selecione uma Cidade!" }}
                        path="cidade" />
                </Col>
            </Row>

            <Row>
                <Col span={4}>
                    <Input name="telefone" label="Telefone" placeholder="(45)988293328" required />
                </Col>

                <Col span={5}>
                    <Input name="email" label="Email" placeholder="joao@gmail.com" required />
                </Col>

                <Col span={6}>
                    <Input name="contato" label="Contato" placeholder="João" required />
                </Col>
            </Row>

            <Row>
                <Col span={4}>
                    <Input name="rgInscricaoEstadual" label={field.value === TIPO_PESSOA.Fisica ? "RG" : "Inscrição Estadual"} placeholder={field.value === TIPO_PESSOA.Fisica ? "99.999.999-X" : "999.999.999.999"} required fast={false} />
                </Col>

                <Col span={4}>
                    <Input name="cPFCPNJ" label={field.value === TIPO_PESSOA.Fisica ? "CPF" : "CNPJ"} placeholder={field.value === TIPO_PESSOA.Fisica ? "000.000.000-00" : "99.999.999/0001-84"} required fast={false} />
                </Col>

                <Col span={3}>
                    <InputNumber name="limiteCredito" label="Limite de Crédito" placeholder="500,00" required />
                </Col>

                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={GetCondicaoPagamentoById}
                        name="condicaoPagamentoId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Condição de Pagamento", label: "Condição de Pagamento" }}
                        errorMessage={{ noSelection: "Selecione uma Condição de Pagamento!" }}
                        path="condicao-pagamento" />
                </Col>
            </Row>

            <Row>
                <Col span={13}>
                    <TextArea name="observacao" label="Observação" rows={4} />
                </Col>
            </Row>
        </>
    )
}

export default GeralForm
