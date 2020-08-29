import React, { useMemo } from 'react'
import { FuncionarioApi } from '../../../../../../apis/Pessoas/FuncionarioApi'
import { InserirServicoSchema } from './InserirServicoSchema'
import { Row, Col } from 'antd'
import { ServicoApi } from '../../../../../../apis/Movimentos/ServicoApi'
import { SubmitButton } from 'formik-antd'
import { useField, FormikHelpers } from 'formik'
import InnerForm from '../../../../../../components/InnerForm/InnerForm'
import InputDecimal from '../../../../../../components/InputDecimal/InputDecimal'
import SelectModelOne from '../../../../../../components/SelectModel/SelectModelOne'
import { OrdemServicoServico } from './../../../../../../models/OrdemServicos/OrdemServicoItem';

const InserirServico: React.FC = () => {

    const initialValues = useMemo(() => ({
        id: null,
        quantidade: 1,
        funcionario: null,
        funcionarioId: null,
    } as OrdemServicoServico), []);

    const [{ value: servicos }, , { setValue: setServicos }] = useField<OrdemServicoServico[]>("servicos");

    function onSave(item: OrdemServicoServico, formikHelpers: FormikHelpers<OrdemServicoServico>) {

        if (servicos?.findIndex(e => e.servicoId === item.servicoId) >= 0) {
            formikHelpers.setFieldError("servicoId", "Serviço já Adicionado.")
            return formikHelpers.setSubmitting(false);
        }

        setServicos([...servicos, item]);
        formikHelpers.resetForm({ values: initialValues })
    }

    return (
        <InnerForm
            key="servico-form"
            initialValues={initialValues}
            onSubmit={onSave}
            validationSchema={InserirServicoSchema}
        >
            <Row>
                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={ServicoApi.GetById.bind(ServicoApi)}
                        name="servicoId"
                        objectName="servico"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Serviço", label: "Serviço" }}
                        errorMessage={{ noSelection: "Selecione um Serviço!" }}
                        path="servico" />
                </Col>

                <Col span={3}>
                    <InputDecimal name="quantidade" label="Quantidade" placeholder="10,00" required />
                </Col>

                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={FuncionarioApi.GetById.bind(FuncionarioApi)}
                        name="funcionarioId"
                        objectName="funcionario"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Funcionário", label: "Funcionário" }}
                        errorMessage={{ noSelection: "Selecione um Funcionário!" }}
                        path="funcionario" />
                </Col>

                <Col span={2}  >
                    <div className="ant-row ant-form-item select-model-one-style-item">
                        <div className="ant-col ant-form-item-label">
                            &nbsp;
                            </div>

                        <div className="ant-col ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <span className="ant-form-item-children" style={{ display: "flex", flex: 1, justifyContent: "flex-end", paddingTop: 4 }}>
                                    <SubmitButton >Adicionar</SubmitButton >
                                </span>
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>
        </InnerForm >
    )
}

export default InserirServico
