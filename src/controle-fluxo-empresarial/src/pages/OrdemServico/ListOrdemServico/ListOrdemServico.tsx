import React, { useMemo } from 'react'
import { Badge, Tooltip, Tag } from 'antd'
import { Cliente } from './../../../models/Pessoas/Cliente';
import { ColumnProps } from 'antd/lib/table'
import { formatData } from './../../../utils/FormatNumber';
import { Link } from 'react-router-dom'
import { OrdemServicoApi } from '../../../apis/OrdemServicos/OrdemServico'
import { UseListPagined } from '../../../hoc/UseListPagined'
import FormBasicLayout from '../../../layouts/FormBasicLayout/FormBasicLayout'
import ListForm from '../../../components/ListForm/ListForm'
import OrdemServico from '../../../models/OrdemServicos/OrdemServico'


const ListOrdemServico: React.FC = () => {
    const response = UseListPagined({ getListPagined: OrdemServicoApi.GetListPagined.bind(OrdemServicoApi) });

    const columns = useMemo(() => [
        {
            width: 70,
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Cliente',
            dataIndex: 'cliente',
            render: (record: Cliente) => record.nome
        },
        {
            title: 'Equipamento',
            dataIndex: 'descricaoEquipamento',
        },
        {
            title: 'Descrição',
            dataIndex: 'descricaoProblemaRelatado',
        },
        {
            width: 100,
            title: 'Dt. Abertura',
            dataIndex: 'dataAbertura',
            render: (data: Date) => formatData(data),
        },
        {
            align: "center",
            width: 100,
            title: 'Dt. Dev.',
            dataIndex: 'dataDevolucaoCliente',
            render: (data: Date) => data ? formatData(data) : "-",
        },
        {
            width: 100,
            title: 'Situação',
            render: renderSituation
        },
        {
            title: 'Ações',
            key: 'action',
            width: "100px",
            render: (text: any, record: any, index: number) => (
                <>
                    <Link to={("ordem-servico/andamento/" + record.id).replace("//", "/")} >
                        <Tooltip placement="top" title="Visualiza OS Selecionada."  >
                            <Tag color="gold" key={index + "12"} className="custom-cursor-pointer" >Ver OS</Tag>
                        </Tooltip>
                    </Link>
                </>
            ),
        }
    ] as ColumnProps<OrdemServico>[], []);

    response.requestResult.dataSource = [
        {
            id: 1,
            cliente: { nome: "Everton schuster" },
            descricaoEquipamento: "Notbook Acer",
            descricaoProblemaRelatado: "Notbook não quer ligar",
            dataAbertura: new Date(),
            dataExecucaoFim: new Date(),
            dataAprovacao: new Date(),
            dataExecucao: new Date(),
            dataFinilizacao: new Date(),
        },
        {
            id: 2,
            cliente: { nome: "Everton schuster" },
            descricaoEquipamento: "Notbook Acer",
            descricaoProblemaRelatado: "Notbook não quer ligar",
            dataAbertura: new Date(),
        },
        {
            id: 3,
            cliente: { nome: "Everton schuster" },
            descricaoEquipamento: "Notbook Acer",
            descricaoProblemaRelatado: "Notbook não quer ligar",
            dataAbertura: new Date(),
            dataExecucao: new Date(),
        },
        {
            id: 4,
            cliente: { nome: "Everton schuster" },
            descricaoEquipamento: "Notbook Acer",
            descricaoProblemaRelatado: "Notbook não quer ligar",
            dataAbertura: new Date(),
            dataExecucao: new Date(),
            dataExecucaoFim: new Date(),
        },
        {
            id: 5,
            cliente: { nome: "Everton schuster" },
            descricaoEquipamento: "Notbook Acer",
            descricaoProblemaRelatado: "Notbook não quer ligar",
            dataAbertura: new Date(),
            dataExecucao: new Date(),
            dataExecucaoFim: new Date(),
            dataAprovacao: new Date(),
            dataDevolucaoCliente: new Date(),
        },
        {
            id: 6,
            cliente: { nome: "Everton schuster" },
            descricaoEquipamento: "Notbook Acer",
            descricaoProblemaRelatado: "Notbook não quer ligar",
            dataAbertura: new Date(),
            dataExecucao: new Date(),
            dataExecucaoFim: new Date(),
            dataRejeitado: new Date(),
        }
    ] as OrdemServico[];

    function renderSituation(item: OrdemServico) {

        if (item?.dataDevolucaoCliente) {
            return <Badge color={"lime"} text={"Devolvido"} />
        }
        if (item?.dataExecucao) {
            return <Badge color={"geekblue"} text={"Em Exec"} />
        }
        if (item?.dataAbertura) {
            return <Badge color={"blue"} text={"Na fila"} />
        }

        return <Badge color={"red"} text={"Desabilitado"} />
    }


    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "OrdemServico", URL: "/OrdemServico" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                hiddenAction
                tableProps={response}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListOrdemServico
