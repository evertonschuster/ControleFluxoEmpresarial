import React, { useEffect } from 'react'
import { CidadeApi } from '../../../../../apis/Cidades/CidadeApi';
import { CondicaoPagamentoApi } from '../../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import { Input, Select, DatePicker, TextArea } from '../../../../../components/WithFormItem/withFormItem';
import { Row, Col, Select as SelectAntd } from 'antd';
import { TIPO_PESSOA } from '../../../../../models/Pessoas/Pessoa';
import { useField } from 'formik';
import { useParams } from 'react-router-dom';
import InputCEP from '../../../../../components/InputCEP/InputCEP';
import InputCPFCNPJ from '../../../../../components/InputCPFCNPJ/InputCPFCNPJ';
import InputDecimal from '../../../../../components/InputDecimal/InputDecimal';
import InputRG from '../../../../../components/InputRG/InputRG';
import InputSituation from '../../../../../components/Situation/InputSituation/InputSituation';
import InputTelefone from '../../../../../components/InputTelefone/InputTelefone';
import NationalitySelect, { NATIONALITY_TYPE } from '../../../../../components/NationalitySelect/NationalitySelect';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';

const GeralForm: React.FC = () => {
    const [fieldTipoPessoa] = useField<TIPO_PESSOA>("tipo");
    const [, , helperIsBrasileiro] = useField<boolean>("IsBrasileiro");
    const [fieldNacionalidade, , helperNacionalidade] = useField<NATIONALITY_TYPE>("nacionalidade");
    const [, , helperEstadoCivil,] = useField("estadoCivil");
    const [, , helperSexo] = useField("sexo");
    let { id } = useParams();

    useEffect(() => {

        helperEstadoCivil.setValue(undefined);
        helperSexo.setValue(undefined);
        helperNacionalidade.setValue(NATIONALITY_TYPE.BRASILEIRO);
        helperIsBrasileiro.setValue(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldTipoPessoa.value]);


    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={4}>
                    <Select name="tipo" label="Tipo" required disabled={!!id}>
                        <SelectAntd.Option key={TIPO_PESSOA.Fisica} value={TIPO_PESSOA.Fisica}>Pessoa Física.</SelectAntd.Option>
                        <SelectAntd.Option key={TIPO_PESSOA.Juridica} value={TIPO_PESSOA.Juridica}>Pessoa Jurídica.</SelectAntd.Option>
                    </Select>
                </Col>

                <Col span={6}>
                    <Input name="nome" label="Cliente" placeholder={fieldTipoPessoa.value === TIPO_PESSOA.Fisica ? "João da silva" : "Eletrônicos do João"} required fast={false} />
                </Col>

                <Col span={6}>
                    <Input name="apelido" label={fieldTipoPessoa.value === TIPO_PESSOA.Fisica ? "Apelido" : "Nome Fantasia"} placeholder={fieldTipoPessoa.value === TIPO_PESSOA.Fisica ? "João" : "Eletrôjoão"} fast={false} />
                </Col>

                <Col span={4} hidden={fieldTipoPessoa.value === TIPO_PESSOA.Juridica}>
                    <Select name="estadoCivil" label="Estado Civíl" placeholder="Solteiro(a)" defaultValue={undefined}>
                        <SelectAntd.Option key="Casado" value="Casado">Casado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Divorciado" value="Divorciado">Divorciado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Separadoo" value="Separado">Separado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Solteiro" value="Solteiro">Solteiro(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Viuvo" value="Viuvo">Viúvo(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Outros" value="Outros">Outros.</SelectAntd.Option>
                    </Select>
                </Col>
                <Col span={2}>
                    <InputSituation name="situacao" />
                </Col>
            </Row>


            <Row>
                <Col span={5}>
                    <Input name="endereco" label="Endereço" placeholder="Av das americas." required />
                </Col>

                <Col span={2}>
                    <Input name="numero" label="Número" placeholder="549" required />
                </Col>

                <Col span={5}>
                    <Input name="complemento" label="Complemento" placeholder="" />
                </Col>

                <Col span={4}>
                    <Input name="bairro" label="Bairro" placeholder="Jardim Horizonte." required />
                </Col>

                <Col span={3}>
                    <InputCEP name="cep" label="CEP" placeholder="85890-000" required />
                </Col>

                <Col span={5}>
                    <SelectModelOne
                        fetchMethod={CidadeApi.GetById.bind(CidadeApi)}
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
                    <InputTelefone name="telefone" label="Telefone" placeholder="(45)988293328" required />
                </Col>

                <Col span={5}>
                    <Input name="email" label="Email" placeholder="joao@gmail.com" required />
                </Col>

                <Col span={3} hidden={fieldTipoPessoa.value === TIPO_PESSOA.Juridica}>
                    <Select name="sexo" label="Sexo" placeholder="Masculino"  >
                        <SelectAntd.Option key="Masculino" value="Masculino">Masculino.</SelectAntd.Option>
                        <SelectAntd.Option key="Feminino" value="Feminino">Feminino.</SelectAntd.Option>
                        <SelectAntd.Option key="Outros" value="Outros">Outros.</SelectAntd.Option>
                    </Select>
                </Col>

                <Col span={3}>
                    <DatePicker name="dataNascimento" label={fieldTipoPessoa.value === TIPO_PESSOA.Fisica ? "Data Nascimento" : "Data de Fundação"} placeholder="01/01/2001" format="DD/MM/yyyy" />
                </Col>

                <Col span={6} hidden={fieldTipoPessoa.value === TIPO_PESSOA.Juridica}>
                    <NationalitySelect name="nacionalidade" label="Nacionalidade" nameIsBrasileiro="isBrasileiro" placeholder="Brasileiro." ></NationalitySelect>
                </Col>

            </Row>

            <Row>
                <Col span={4}>
                    <InputRG
                        name="rgInscricaoEstadual"
                        label={fieldTipoPessoa.value === TIPO_PESSOA.Fisica ? `RG${fieldNacionalidade.value === NATIONALITY_TYPE.BRASILEIRO ? "" : " (Documento)"}` : `Inscrição Estadual`}
                        placeholder={fieldTipoPessoa.value === TIPO_PESSOA.Fisica ? "99.999.999-X" : "999.999.999.999"} />
                </Col>

                <Col span={4}>
                    <InputCPFCNPJ name="cpfcpnj" label={fieldTipoPessoa.value === TIPO_PESSOA.Fisica ? "CPF" : "CNPJ"} placeholder={fieldTipoPessoa.value === TIPO_PESSOA.Fisica ? "000.000.000-00" : "99.999.999/0001-84"} required={fieldNacionalidade.value === NATIONALITY_TYPE.BRASILEIRO} />
                </Col>

                <Col span={3}>
                    <InputDecimal name="limiteCredito" label="Limite de Crédito" placeholder="500,00" required prefix="R$" />
                </Col>

                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={CondicaoPagamentoApi.GetById.bind(CondicaoPagamentoApi)}
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
