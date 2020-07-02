import React from 'react'
import { Badge } from 'antd'

export interface Props {
    Situacao?: Date | null
}

const ShowSituation: React.FC<Props> = (props) => {
    if (!props) {
        return <Badge color={"blue"} text={"Habilitado"} />
    }

    return <Badge color={"red"} text={"Desabilitado"} />
}

export default ShowSituation
