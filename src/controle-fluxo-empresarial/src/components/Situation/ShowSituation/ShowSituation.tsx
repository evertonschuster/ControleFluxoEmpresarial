import React from 'react'
import { Badge } from 'antd'

export interface Props {
    Situacao?: Date | null
}

const ShowSituation = (props : Props | undefined | null) => {
    console.log(props)

    if (!props) {
        return <Badge color={"blue"} text={"Habilitado"} />
    }

    return <Badge color={"red"} text={"Desabilitado"} />
}

export default ShowSituation
