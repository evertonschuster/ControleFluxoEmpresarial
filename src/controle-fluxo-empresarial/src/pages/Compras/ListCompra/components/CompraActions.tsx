import { Tag, Tooltip } from 'antd';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import BasicLayoutContext, { FormMode } from '../../../../layouts/BasicLayout/BasicLayoutContext';
import { Compra } from '../../../../models/Compras/Compra'
import { FormCompraMode } from '../../FormCompra/FormCompra';


export interface Props {
    index: number;
    record: Compra
}

const CompraActions: React.FC<Props> = (props) => {
    const idUrl = `${props.record.modelo}/${props.record.serie}/${props.record.numero}/${props.record.fornecedorId}`;
    const { setFormMode } = useContext(BasicLayoutContext);

    function renderView() {
        return (
            <Link to={{ pathname: `compras/view/${idUrl}`, state: { formMode: FormCompraMode.VISUALIZACAO } }}
                onClick={() => { setFormMode(FormMode.View) }}>
                <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                    <Tag color="gold" key={props.index + "22"} className="custom-cursor-pointer" >Ver</Tag>
                </Tooltip>
            </Link>);
    }

    function renderCancelar() {
        return (
            <Link to={{ pathname: `compras/cancel/${idUrl}`, state: { formMode: FormCompraMode.CANCELAMENTO } }}
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

export default CompraActions
