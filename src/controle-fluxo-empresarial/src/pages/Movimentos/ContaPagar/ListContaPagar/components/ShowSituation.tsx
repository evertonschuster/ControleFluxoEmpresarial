import React from 'react'
import { Badge } from 'antd'

export interface Props {
    dataCancelamento?: Date | null
}

const ShowSituation = (props : Props | undefined | null) => {

    if (!props) {
        return <Badge color={"blue"} text={"Ativa"} />
    }

    return <Badge color={"red"} text={"Cancelada"} />
}

export default ShowSituation
