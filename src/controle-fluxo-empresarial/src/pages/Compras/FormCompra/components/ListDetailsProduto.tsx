import { Spin } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { CompraApi } from '../../../../apis/Compras/CompraApi'
import { CompraProduto } from '../../../../models/Compras/CompraProduto'
import { CompraProdutoSchema } from '../CompraProdutoSchema'
import { formatNumber2 } from '../../../../utils/FormatNumber'
import { message } from 'antd';
import { Produto } from '../../../../models/Movimentos/Produto'
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi'
import { UnidadeMedida } from '../../../../models/Movimentos/UnidadeMedida'
import { UnidadeMedidaApi } from '../../../../apis/Movimentos/UnidadeMedidaApi'
import { useDebouncedCallback } from './../../../../hoc/useDebouncedCallback';
import { useEffect } from 'react';
import { useField } from 'formik'
import EditableTable, { ColumnEditableProps, RowMode } from '../../../../components/EditableTable/EditableTable'
import InputDecimal from '../../../../components/InputDecimal/InputDecimal'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'

export interface Props {
    disabled: boolean;
    initialValues: CompraProduto;
}

export interface ListHandle {
    refeshValues: (produtos: CompraProduto[]) => void
}

const ListDetailsProduto: React.ForwardRefRenderFunction<ListHandle, Props> = (props, ref) => {

    const columns: ColumnProps<CompraProduto>[] = useMemo(() => [
        {
            title: 'Código',
            width: 90,
            dataIndex: 'produto',
            key: 'produto-codigo',
            render: (produto: Produto) => {
                return produto?.id
            },
        },
        {
            title: 'Produto',
            dataIndex: 'produto',
            key: 'produto',
            editable: true,
            render: (produto: Produto) => {
                return produto?.nome
            },
            renderEditable: (text, record) => {
                if (record.rowMode === RowMode.new) {
                    return (<SelectModelOne
                        fetchMethod={ProdutoApi.GetById.bind(ProdutoApi)}
                        name="produtoId"
                        objectName="produto"
                        keyDescription="nome"
                        required={true}
                        showLabel={false}
                        label={{ title: "Seleção de Produto", label: "Produto" }}
                        errorMessage={{ noSelection: "Selecione um Produto!" }}
                        path="Produto" />)
                }

                return record.produto?.nome;
            },
        },
        {
            width: 150,
            title: 'Und. Med.',
            dataIndex: 'unidadeMedida',
            key: 'unidadeMedida',
            editable: true,
            render: (unidadeMed: UnidadeMedida) => {
                return unidadeMed?.id
            },
            renderEditable: () => <SelectModelOne
                fetchMethod={UnidadeMedidaApi.GetById.bind(UnidadeMedidaApi)}
                name="unidadeMedidaId"
                keyDescription="nome"
                objectName="unidadeMedida"
                required={true}
                showLabel={false}
                idIsInt={false}
                showDescription={false}
                label={{ title: "Seleção de Unidade de Medida", label: "Unidade de Medida" }}
                errorMessage={{ noSelection: "Selecione uma Unidade de Medida!" }}
                path="unidade-medida" />
        },
        {
            align: "right",
            dataIndex: 'quantidade',
            width: 130,
            editable: true,
            key: 'quantidade',
            title: 'Qtde.',
            render: (quantidade: number) => {
                return formatNumber2(quantidade)
            },
            renderEditable: () => <InputDecimal name="quantidade" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 130,
            dataIndex: 'valorUnitario',
            editable: true,
            key: 'valorUnitario',
            title: 'Valor',
            render: (valor: number) => {
                return formatNumber2(valor)
            },
            renderEditable: () => <InputDecimal name="valorUnitario" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 100,
            title: 'Custo Unit.',
            dataIndex: 'custoUnitario',
            key: 'custoUnitario',
            render: (custo: number) => {
                if (custo === null) {
                    return <Spin size="small" />
                }

                if (custo === 0) {
                    return "-";
                }

                return custo ? formatNumber2(custo) : "-"
            },
        },
        {
            align: "right",
            width: 100,
            key: 'Total Quantidade',
            title: 'Total Prod',
            render: (item: CompraProduto) => {
                if (!item.custoUnitario) {
                    return <Spin size="small" />
                }

                return formatNumber2(item.quantidade! * item.custoUnitario!)
            },
        },
        {
            align: "right",
            width: 120,
            title: 'Desconto',
            dataIndex: 'desconto',
            key: 'desconto',
            editable: true,
            render: (desconto: number) => {
                return desconto ? formatNumber2(desconto) : "-"
            },
            renderEditable: () => <InputDecimal name="desconto" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 120,
            title: 'IPI',
            dataIndex: 'ipi',
            key: 'ipi',
            editable: true,
            render: (ipi: number) => {
                return ipi ? formatNumber2(ipi) : "-"
            },
            renderEditable: () => <InputDecimal name="ipi" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 100,
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (_: number, record: CompraProduto) => {
                if (!record.custoUnitario) {
                    return <Spin size="small" />
                }

                let total = (record.quantidade! * record.custoUnitario!) - record.desconto! + record.ipi!;

                return formatNumber2(total)
            }
        },

    ] as ColumnEditableProps<CompraProduto>[], [])
    const [{ value: produtos }, , { setValue: setProdutos }] = useField<CompraProduto[]>("compraProdutos");
    const [{ value: frete }] = useField<number>("frete")
    const [{ value: seguro }] = useField<number>("seguro")
    const [{ value: outrasDispesas }] = useField<number>("outrasDispesas")

    const refeshValuesDebounce = useDebouncedCallback((produtos: CompraProduto[]) => {
        refeshValues(produtos)
    }, 500)

    useEffect(() => {
        setFormLoading();
        refeshValuesDebounce(produtos);
    }, [frete, seguro, outrasDispesas])

    async function refeshValues(produtos: CompraProduto[]) {
        try {
            //Deixo nulo o custo e total, pois precisa ser recalculado pelo backend
            let list = produtos.map(e => ({ ...e, custoUnitario: null }));
            setProdutos(list);

            let response = await CompraApi.CalcularValorRatiado(produtos, frete, seguro, outrasDispesas);
            setProdutos(response.data);
        }
        catch (e) {
            message.error("Error de calculo: " + JSON.stringify(e))
        }
    }

    function setFormLoading() {

        //Deixo nulo o custo e total, pois precisa ser recalculado pelo backend
        let list = produtos.map(e => ({ ...e, custoUnitario: null }));
        setProdutos(list);
    }

    useImperativeHandle(ref, () => ({
        refeshValues
    }));

    return (
        <EditableTable
            disabled={props.disabled}
            showNewAction={false}
            columns={columns}
            validationSchema={CompraProdutoSchema}
            name="compraProdutos"
            initiallValues={props.initialValues}
            afterChangedValues={refeshValues}
            rowKey={(itme) => itme.produtoId + ""} />
    )
}

export default forwardRef(ListDetailsProduto)
