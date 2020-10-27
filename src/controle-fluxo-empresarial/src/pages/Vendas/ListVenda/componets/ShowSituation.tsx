import { Badge } from 'antd'
import React from 'react'
import OrdemServico from '../../../../models/OrdemServicos/OrdemServico'

const ShowSituation: React.FC<OrdemServico> = (item) => {

    if (item.dataCancelamento) {
        return <Badge color={"red"} text={"Cancelada"} />
    }
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

export default ShowSituation
