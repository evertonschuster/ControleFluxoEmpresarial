import { Badge } from 'antd'
import React from 'react'
import OrdemServico from '../../../../models/OrdemServicos/OrdemServico'

const ShowSituation: React.FC<OrdemServico> = (item) => {

    if (item.dataCancelamento) {
        return <Badge color={"red"} text={"Cancelada"} />
    }

    return <Badge color={"blue"} text={"Habilitado"} />
}

export default ShowSituation
