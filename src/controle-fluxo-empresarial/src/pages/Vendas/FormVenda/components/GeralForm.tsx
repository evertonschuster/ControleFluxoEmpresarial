import { Button, Col, Row } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React, { useMemo, useState } from 'react'
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi'
import EditableTable, { ColumnEditableProps } from '../../../../components/EditableTable/EditableTable'
import InputDecimal from '../../../../components/InputDecimal/InputDecimal'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import Separator from '../../../../components/Separator/Separator'
import { Input, TextArea } from '../../../../components/WithFormItem/withFormItem'
import { WithItemNone } from '../../../../hoc/WithFormItem'
import { VendaProduto } from '../../../../models/Vendas/VendaProduto'
import { formatNumber2 } from '../../../../utils/FormatNumber'
import InserirProduto from '../innerForm/InserirProduto/InserirProduto'
import { VendaItemProdutoSchema } from '../VendaSchema'
import CondicaoPagamento from './CondicaoPagamento'
import { useField } from 'formik';
import { useEffect } from 'react';
import { FormModeVenda } from '../FormVenda'
import { getUserNameStorage } from '../../../../services/UserNameCache'
import { OrdemServicoServico } from '../../../../models/OrdemServicos/OrdemServicoItem'
import { Link } from 'react-router-dom'

const GeralForm: React.FC = () => {

    const columnsProduto: ColumnProps<VendaProduto>[] = useMemo(() => [
        {
            title: 'Código',
            width: 100,
            dataIndex: 'items',
            key: 'produto-servico-codigo',
            render: (text, item: VendaProduto) => {
                return item?.produtoId
            },
        },
        {
            title: 'Produto',
            dataIndex: 'items',
            key: 'produto-servico-nome1',
            render: (text, item: VendaProduto) => {
                return item?.produto?.nome
            },
        },
        {
            align: "right",
            dataIndex: 'quantidade',
            width: 100,
            editable: true,
            key: 'quantidade',
            title: 'Quantidade',
            render: (quantidade: number) => {
                return formatNumber2(quantidade)
            },
            renderEditable: () => <InputDecimal name="quantidade" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 100,
            dataIndex: 'tipo',
            key: 'valor',
            title: 'Valor',
            render: (text, item: VendaProduto) => {
                return formatNumber2(item?.valor!)
            },
        },
        {
            align: "right",
            width: 100,
            title: 'Total',
            dataIndex: 'tipo',
            key: 'total',
            render: (text, item: VendaProduto) => {
                return formatNumber2(item?.produto?.valorVenda! * item.quantidade!)
            },
        },
    ] as ColumnEditableProps<any>[], [])
    const columnsServico: ColumnProps<OrdemServicoServico>[] = useMemo(() => [
        {
            title: 'Código',
            width: 100,
            dataIndex: 'items',
            key: 'produto-servico-codigo',
            render: (text, item: OrdemServicoServico) => {
                return item?.servicoId
            },
        },
        {
            title: 'Serviço',
            dataIndex: 'items',
            key: 'produto-servico-nome1',
            render: (text, item: OrdemServicoServico) => {
                return item?.servico?.nome
            },
        },
        {
            title: 'Funcionário',
            dataIndex: 'items',
            key: 'produto-servico-nome2',
            render: (text, item: OrdemServicoServico) => {
                return item?.funcionario?.nome
            },
        },
        {
            align: "right",
            dataIndex: 'quantidade',
            width: 100,
            editable: true,
            key: 'quantidade',
            title: 'Quantidade',
            render: (quantidade: number) => {
                return formatNumber2(quantidade)
            },
        },
        {
            align: "right",
            width: 100,
            dataIndex: 'tipo',
            key: 'valor',
            title: 'Valor',
            render: (text, item: OrdemServicoServico) => {
                return formatNumber2(item?.valor!)
            },
        },
        {
            align: "right",
            width: 100,
            title: 'Total',
            dataIndex: 'tipo',
            key: 'total',
            render: (text, item: OrdemServicoServico) => {
                return formatNumber2(item?.valor! * item.quantidade!)
            },
        },
    ] as ColumnEditableProps<any>[], [])

    const [{ value: formMode }] = useField<FormModeVenda>("forMode");
    const [{ value: userCancelamento }, ,] = useField<string>("userCancelamento");
    const [, , { setValue: SetTotalCompra }] = useField("totalCompra");
    const [{ value: produtos }] = useField<VendaProduto[]>("produtos");
    const [{ value: servicos }] = useField<VendaProduto[]>("servicos");
    const [{ value: ordemServicoId }] = useField<VendaProduto[]>("ordemServicoId");

    const [userCancelamentoStr, setUserCancelamentoStr] = useState<string | undefined | null>(undefined)
    const disableForm = formMode === FormModeVenda.PAGAMENTO || formMode === FormModeVenda.CANCELAMENTO || formMode === FormModeVenda.VISUALIZACAO;

    useEffect(() => {
        let totalProduto = (produtos ?? []).reduce((a, e) => a + (e.quantidade! * e.valor!), 0);
        let totalServico = (servicos ?? []).reduce((a, e) => a + (e.quantidade! * e.valor!), 0);

        SetTotalCompra(totalProduto + totalServico)
    }, [produtos])

    useEffect(() => {
        loadUserName()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCancelamento]);

    async function loadUserName() {
        if (userCancelamento) {
            let userName = await getUserNameStorage(userCancelamento)
            setUserCancelamentoStr(userName ?? null)
        } else {
            setUserCancelamentoStr(null)
        }
    }

    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="modelo" label="Modelo" placeholder="05" required disabled />
                </Col>
                <Col span={2}>
                    <Input name="serie" label="Série" placeholder="1" required disabled />
                </Col>
                <Col span={2}>
                    <Input name="numero" label="Número" disabled />
                </Col>
                <Col span={7}>
                    <SelectModelOne
                        disabled={disableForm}
                        fetchMethod={ClienteApi.GetById.bind(ClienteApi)}
                        name="clienteId"
                        keyDescription="nome"
                        objectName="cliente"
                        required={true}
                        label={{ title: "Seleção de Cliente", label: "Cliente" }}
                        errorMessage={{ noSelection: "Selecione um Cliente!" }}
                        path="cliente" />
                </Col>

                {ordemServicoId && <Col>
                    <WithItemNone  >
                        <Link to={{ pathname: `/ordem-servico/view/${ordemServicoId}` }}>
                            <Button>Ver OS</Button>
                        </Link>
                    </WithItemNone>
                </Col>}
            </Row>


            <Separator />
            <Separator />
            {(formMode !== FormModeVenda.VISUALIZACAO && formMode !== FormModeVenda.CANCELAMENTO) && <InserirProduto disableForm={disableForm} />}
            {produtos?.length > 0 && <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            disabled={disableForm}
                            showNewAction={false}
                            rowKey={(item) => item.produtoId}
                            columns={columnsProduto}
                            validationSchema={VendaItemProdutoSchema}
                            name="produtos"
                            initiallValues={{}}
                        />
                    </WithItemNone>
                </Col>
            </Row>}

            {servicos?.length > 0 && <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            disabled
                            showNewAction={false}
                            rowKey={(item) => item.servicoId}
                            columns={columnsServico}
                            name="servicos"
                            initiallValues={{}}
                        />
                    </WithItemNone>
                </Col>
            </Row>}

            <Row>
                <Col push={21} span={3}>
                    <InputDecimal name="totalCompra" label="Total" placeholder="0,00" disabled />
                </Col>
            </Row>

            <CondicaoPagamento />

            {userCancelamento && <Row>
                <Row>
                    <Col span={12}>
                        <TextArea name="justificativaCancelamento" label="Justificativa Cancelamento" rows={5} disabled={true} />
                    </Col>
                    <Col span={5}>
                        <Input name="userCancelamento" label="Cancelado por" disabled={true} value={userCancelamentoStr ?? ""} />
                    </Col>
                </Row>
            </Row>}
        </>
    )
}

export default GeralForm
