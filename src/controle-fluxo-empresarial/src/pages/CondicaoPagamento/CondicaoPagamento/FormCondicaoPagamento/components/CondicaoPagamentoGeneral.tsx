import React, { useMemo } from 'react';
import { CondicaoPagamento } from '../../../../../models/CondicaoPagamento/CondicaoPagamento';
import { CondicaoPagamentoParcela } from '../../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';
import { CondicaoPagamentoParcelaSchema } from '../CondicaoPagamentoSchema';
import { FormaPagamento } from '../../../../../models/CondicaoPagamento/FormaPagamento';
import { Input, InputNumber } from '../../../../../components/WithFormItem/withFormItem';
import { Row, Col, Divider } from 'antd';
import { useField } from 'formik';
import EditableTable, { ColumnEditableProps } from '../../../../../components/EditableTable/EditableTable';
import InputSituation from '../../../../../components/Situation/InputSituation/InputSituation';
import NumeroDias from './NumeroDias';
import Percentual from './Percentual';
import RenderSelectionMode from './RenderSelectionFormaPagamento'


const CondicaoPagamentoGeneral: React.FC = () => {

    const [field] = useField("parcela");

    const columns: ColumnEditableProps<CondicaoPagamento>[] = useMemo(() => [
        { dataIndex: "id", title: "Código" },
        {
            dataIndex: "numeroDias", title: "Número de Dias", editable: true,
            renderEditable: (text: any, record: any, index: number) => <NumeroDias text={text} record={record} index={index} percelasSource={field.value} />
        },
        {
            dataIndex: "percentual", title: "Percentual (%)", editable: true,
            render: (text: any, record: any, index: number) => text.toLocaleString(),
            renderEditable: (text: any, record: any, index: number) => <Percentual text={text} record={record} index={index} percelasSource={field.value} />
        },
        {
            dataIndex: "formaPagamento",
            title: "Forma de Pagamento",
            editable: true,
            width: "500px",
            render: (text: FormaPagamento) => {
                return text?.nome;
            },
            renderEditable:
                () => {
                    return <RenderSelectionMode />
                },
        }
    ], [field.value]);



    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={11}>
                    <Input name="nome" label="Nome da Condição de Pagamento" placeholder="Pagamento em 30/60/90" required />
                </Col>
                <Col span={3}>
                    <InputNumber name="multa" label="Multa (%)" placeholder="0" required />
                </Col>
                <Col span={3}>
                    <InputNumber name="juro" label="Juro (%)" placeholder="0" required />
                </Col>
                <Col span={3}>
                    <InputNumber name="desconto" label="Desconto (%)" placeholder="0" required />
                </Col>
                <Col span={2}>
                    <InputSituation name="situacao" />
                </Col>
            </Row>

            <br></br>
            <Divider>Parcelas</Divider>
            <Row>
                <Col span={24}>
                    <EditableTable columns={columns}
                        initiallValues={{
                            numeroDias: null,
                            percentual: Math.round((100 - ((field.value as CondicaoPagamentoParcela[]) ?? []).reduce((e, a) => e + a.percentual, 0)) * 100) / 100,
                            formaPagamento: null,
                            formaPagamentoId: null,
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
