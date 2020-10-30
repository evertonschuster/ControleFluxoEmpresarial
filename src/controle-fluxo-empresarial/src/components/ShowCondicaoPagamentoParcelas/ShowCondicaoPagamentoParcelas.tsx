import { FormaPagamento } from './../../models/CondicaoPagamento/FormaPagamento';
import { formatNumber2, formatData } from './../../utils/FormatNumber';
import { ParcelaPagamento } from '../../models/CondicaoPagamento/ParcelaPagamento';
import { Row, Col, Form, Button } from 'antd';
import { WithItemNone } from '../../hoc/WithFormItem';
import React, { useMemo, memo } from 'react'
import Table, { ColumnProps } from 'antd/lib/table'
import { Link } from 'react-router-dom';
import ContaReceber from './../../models/Movimentos/ContaReceber';
import { FromContaReceberType } from '../../pages/Movimentos/ContaReceber/FormContaReceber/FormContaReceber';

interface Props {
    dataSource?: ParcelaPagamento[];
    loading?: boolean;
    hiddenDesconto?: boolean;
    hiddenTotal?: boolean;
    error?: string;
    action?: ColumnProps<ParcelaPagamento>[];
}

const ShowCondicaoPagamentoParcelas: React.FC<Props> = (prop) => {

    const columns: ColumnProps<ParcelaPagamento>[] = useMemo(() => {
        let columns = [
            {
                align: "right",
                width: 150,
                dataIndex: "parcela",
                title: "Número da Parcela"
            },
            {
                align: "right",
                width: 100,
                key: "formaPagamentoCodigo",
                dataIndex: "formaPagamento",
                title: "Código",
                render: (formaPagamento: FormaPagamento) => { return formaPagamento.id }
            },
            {
                key: "formaPagamentoNome",
                dataIndex: "formaPagamento",
                title: "Forma Pagamento",
                render: (formaPagamento: FormaPagamento) => { return formaPagamento.nome }
            },
            {
                align: "right",
                dataIndex: "dataVencimento",
                title: "Data Vencimento",
                render: (data: Date) => { return formatData(data) }
            },
            {
                align: "right",
                dataIndex: "valor",
                title: "Valor",
                render: (valor: number) => formatNumber2(valor)
            },
        ] as ColumnProps<ParcelaPagamento>[];

        if (prop.hiddenDesconto !== true) {
            columns.push({
                align: "right",
                dataIndex: "desconto",
                title: "Descontos",
                render: (desconto: number) => formatNumber2(desconto)
            })
        }

        if (prop.hiddenTotal !== true) {
            columns.push({
                align: "right",
                dataIndex: "valorTotal",
                title: "Valor Total",
                render: (valorTotal: number) => formatNumber2(valorTotal)
            })
        }

        if (prop.action) {
            columns = columns.concat(prop.action!)
        }

        return columns;

    }, [prop.hiddenDesconto, prop.hiddenTotal]);

    return (
        <Row>
            <Col>
                <WithItemNone showLabel={false}>
                    <Table
                        loading={prop.loading}
                        dataSource={prop.dataSource}
                        columns={columns}
                        size="small"
                        rowKey="parcela"
                        bordered
                        pagination={false} />

                    <Form.Item
                        validateStatus="error"
                        help={prop.error}
                    ></Form.Item>

                </WithItemNone>
            </Col>
        </Row>
    )
}

export default memo(ShowCondicaoPagamentoParcelas)
