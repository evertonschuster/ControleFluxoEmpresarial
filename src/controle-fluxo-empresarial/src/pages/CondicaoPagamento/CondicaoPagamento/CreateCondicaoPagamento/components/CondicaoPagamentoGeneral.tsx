import React from 'react';
import { Row, Col, Divider } from 'antd';
import EditableTable, { ColumnEditableProps } from '../../../../../components/EditableTable/EditableTable';
import NumeroDias from './NumeroDias';
import Percentual from './Percentual';
import { FormaPagamento } from '../../../../../models/CondicaoPagamento/FormaPagamento';
import { GetFormaPagamentoById } from '../../../../../apis/CondicaoPagamento/FormaPagamento';
import { Input, InputNumber } from '../../../../../components/WithFormItem/withFormItem';
import { CondicaoPagamentoParcelaSchema } from '../CondicaoPagamentoSchema';
import { CondicaoPagamentoParcela } from '../../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import { useField } from 'formik';
import { CondicaoPagamento } from '../../../../../models/CondicaoPagamento/CondicaoPagamento';


const CondicaoPagamentoGeneral: React.FC = () => {

    const [field] = useField("parcela");

    const columns: ColumnEditableProps<CondicaoPagamento>[] = [
        { dataIndex: "id", title: "id" },
        {
            dataIndex: "numeroDias", title: "Número de Dias", editable: true,
            renderEditable: (text: any, record: any, index: number) => <NumeroDias text={text} record={record} index={index} percelasSource={field.value} />
        },
        {
            dataIndex: "percentual", title: "Percentual", editable: true,
            renderEditable: (text: any, record: any, index: number) => <Percentual text={text} record={record} index={index} percelasSource={field.value} />
        },
        {
            dataIndex: "formaPagamento",
            title: "Forma de Pagamento",
            editable: true,
            width: "700px",
            render: (text: FormaPagamento) => {
                return text?.nome;
            },
            renderEditable:
                () => {
                    return <SelectModelOne
                        fetchMethod={GetFormaPagamentoById}
                        name="formaPagamento.id"
                        ObjectName="formaPagamento"
                        keyDescription="nome"
                        required={true}
                        showLabel={false}
                        label={{ title: "Seleção de Forma de Pagamento", label: "" }}
                        errorMessage={{ noSelection: "Selecione uma Forma de Pagamento!" }}
                        path="forma-pagamento" />
                },
        }
    ];



    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                </Col>
                <Col span={13}>
                    <Input name="nome" label="Condição de Pagamento" placeholder="30/60/90" required />
                </Col>
                <Col span={3}>
                    <InputNumber name="multa" label="Multa" placeholder="0" required />
                </Col>
                <Col span={3}>
                    <InputNumber name="juro" label="Juro" placeholder="0" required />
                </Col>
                <Col span={3}>
                    <InputNumber name="desconto" label="Desconto" placeholder="0" required />
                </Col>
            </Row>


            <Row>
                <Col span={24}>
                    <Divider>Parcelas</Divider>
                    <EditableTable columns={columns}
                        initiallValues={{
                            numeroDias: undefined,
                            percentual: Math.round((100 - ((field.value as CondicaoPagamentoParcela[]) ?? []).reduce((e, a) => e + a.percentual, 0)) * 100) / 100,
                            formaPagamento: undefined
                        }}
                        name="parcela"
                        validationSchema={CondicaoPagamentoParcelaSchema}
                    />
                </Col>
            </Row>
        </>
    );

}

export default CondicaoPagamentoGeneral;
