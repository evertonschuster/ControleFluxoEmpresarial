import React, { useMemo, memo } from 'react'
import Table, { ColumnProps } from 'antd/lib/table'
import { Row, Col } from 'antd';
import { WithItemNone } from '../../hoc/WithFormItem';
import { ParcelaPagamento } from '../../models/CondicaoPagamento/ParcelaPagamento';
import { FormaPagamento } from './../../models/CondicaoPagamento/FormaPagamento';
import { formatNumber2, formatDataWithHour, formatData } from './../../utils/FormatNumber';

interface Props {
    dataSource?: ParcelaPagamento[];
    loading?: boolean;
}

const ShowCondicaoPagamentoParcelas: React.FC<Props> = (prop) => {

    const columns: ColumnProps<ParcelaPagamento>[] = useMemo(() => [
        {
            align: "right",
            width: 150,
            dataIndex: "numeroParcela",
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
        {
            align: "right",
            dataIndex: "desconto",
            title: "Descontos",
            render: (desconto: number) => formatNumber2(desconto)
        },
        {
            align: "right",
            dataIndex: "valorTotal",
            title: "Valor Total",
            render: (valorTotal: number) => formatNumber2(valorTotal)
        },
    ] as ColumnProps<ParcelaPagamento>[], []);

    return (
        <Row>
            <Col>
                <WithItemNone showLabel={false}>
                    <Table
                        loading={prop.loading}
                        dataSource={prop.dataSource}
                        columns={columns}
                        size="small"
                        bordered
                        pagination={false} />
                </WithItemNone>
            </Col>
        </Row>
    )
}

export default memo(ShowCondicaoPagamentoParcelas)
