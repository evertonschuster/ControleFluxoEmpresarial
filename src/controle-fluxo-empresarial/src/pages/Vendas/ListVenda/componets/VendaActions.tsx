import { Tag, Tooltip } from 'antd';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import BasicLayoutContext, { FormMode } from '../../../../layouts/BasicLayout/BasicLayoutContext';
import { Venda } from '../../../../models/Vendas/Venda'
import { FormModeVenda } from '../../FormVenda/FormVenda';


export interface Props {
    index: number;
    record: Venda
}

const VendaActions: React.FC<Props> = (props) => {
    const idUrl = `${props.record.modelo}/${props.record.serie}/${props.record.numero}`;
    const { setFormMode } = useContext(BasicLayoutContext);

    function renderView() {
        return (
            <Link to={{ pathname: `vendas/view/${idUrl}`, state: { formMode: FormModeVenda.VISUALIZACAO } }}
                onClick={() => { setFormMode(FormMode.View) }}>
                <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                    <Tag color="gold" key={props.index + "22"} className="custom-cursor-pointer" >Ver</Tag>
                </Tooltip>
            </Link>);
    }

    function renderCancelar() {
        return (
            <Link to={{ pathname: `vendas/cancel/${idUrl}`, state: { formMode: FormModeVenda.CANCELAMENTO } }}
                onClick={() => { setFormMode(FormMode.View) }}>
                <Tooltip placement="top" title="Cancela Registro Selecionado." >
                    <Tag color="red" key={props.index + "23"} className="custom-cursor-pointer" >Cancelar</Tag>
                </Tooltip>
            </Link>);
    }

    return (
        <>
            {renderView()}
            {!props.record.dataCancelamento && renderCancelar()}
        </>
    )
}

export default VendaActions
