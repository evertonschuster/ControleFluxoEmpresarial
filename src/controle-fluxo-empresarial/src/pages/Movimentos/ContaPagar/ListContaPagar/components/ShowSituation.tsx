import React from 'react'
import { Badge } from 'antd'
import ContaPagar from '../../../../../models/Movimentos/ContaPagar';

export interface Props extends ContaPagar {
}

const ShowSituation = (props: Props | undefined | null) => {

    if (props?.dataCancelamento) {
        return <Badge color={"red"} text={"Cancelada"} />
    }

    if (props?.dataPagamento) {
        return <Badge color="green" text={"Paga"} />
    }

    if (new Date(props?.dataVencimento!).valueOf() < Date.now()) {
        return <Badge color={"red"} text={"Vencida"} />
    }

    return <Badge color={"blue"} text={"Pendente"} />
}

export default ShowSituation
