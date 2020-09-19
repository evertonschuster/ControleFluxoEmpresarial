import React, { useEffect, useState } from 'react'
import { Badge, Tooltip } from 'antd'
import { Compra } from '../../../../models/Compras/Compra'
import { formatDataWithHour } from './../../../../utils/FormatNumber';
import { getUserNameStorage } from '../../../../services/UserNameCache';

export interface Props extends Compra {
}

const ShowSituation: React.FC<Props> = (props ) => {
    const [userCancelamento, setUserCancelamento] = useState<string | undefined | null>(undefined)

    useEffect(() => {
        loadUserName()
    }, [props?.userCancelamento]);

    async function loadUserName() {
        if (props?.userCancelamento) {
            let userName = await getUserNameStorage(props?.userCancelamento)
            setUserCancelamento(userName ?? null)
        } else {
            setUserCancelamento(null)
        }
    }

    if (!props?.dataCancelamento) {
        return <Badge color={"blue"} text={"Ativa"} />
    }

    return <Tooltip title={`Cancelada em ${formatDataWithHour(props.dataCancelamento)} por ${userCancelamento}`} >
        <Badge color={"red"} text={"Cancelada"} />
    </Tooltip>
}

export default ShowSituation
