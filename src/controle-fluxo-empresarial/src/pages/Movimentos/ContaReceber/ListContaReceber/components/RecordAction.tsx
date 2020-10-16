import React, { useContext } from 'react'
import { FromContaReceberType } from '../../FormContaReceber/FormContaReceber';
import { Link } from 'react-router-dom';
import { Tooltip, Tag } from 'antd';
import BasicLayoutContext, { FormMode } from '../../../../../layouts/BasicLayout/BasicLayoutContext';
import ContaReceber from '../../../../../models/Movimentos/ContaReceber';

export interface Props {
    index: number;
    record: ContaReceber
}

const RecordAction: React.FC<Props> = (props) => {

    const { setFormMode } = useContext(BasicLayoutContext);
    const idUrl = `${props.record.modelo}/${props.record.serie}/${props.record.numero}/${props.record.parcela}`;


    function renderDefaultOptions() {
        return (<>
            <Link to={{
                pathname: `contas-receber/receive/${idUrl}`,
                state: {
                    formType: FromContaReceberType.Receber
                }
            }}
                onClick={() => { setFormMode(FormMode.Edit); }}  >
                <Tooltip placement="top" title="Excluir Registro Selecionado." >
                    <Tag color="blue" key={props.index + "03"} className="custom-cursor-pointer" >Receber</Tag>
                </Tooltip>
            </Link>

            <Link to={{
                pathname: (`contas-receber/edit/${idUrl}`),
                state: {
                    formType: FromContaReceberType.Editar
                }
            }}
                onClick={() => { setFormMode(FormMode.Edit); }}>
                <Tooltip placement="top" title="Editar Registro Selecionado."  >
                    <Tag color="green" key={props.index + "12"} className="custom-cursor-pointer" >Editar</Tag>
                </Tooltip>
            </Link>

            <Link to={{
                pathname: `contas-receber/cancel/${idUrl}`,
                state: {
                    formType: FromContaReceberType.Cancelar
                }
            }}
                onClick={() => { setFormMode(FormMode.Edit); }}>
                <Tooltip placement="top" title="Excluir Registro Selecionado." >
                    <Tag color="red" key={props.index + "23"} className="custom-cursor-pointer" >Cancelar</Tag>
                </Tooltip>
            </Link>
        </>)
    }

    function renderCanceladOptions() {
        return (
            <>
                <Link to={{
                    pathname: `contas-receber/view/${idUrl}`,
                    state: {
                        formType: FromContaReceberType.VerCancelada
                    }
                }}
                    onClick={() => { setFormMode(FormMode.View); }}>
                    <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                        <Tag color="gold" key={props.index + "23"} className="custom-cursor-pointer" >Ver</Tag>
                    </Tooltip>
                </Link>
                <Link to={{
                    pathname: `contas-receber/view/${idUrl}`,
                    state: {
                        formType: FromContaReceberType.Ativar
                    }
                }}
                    onClick={() => { setFormMode(FormMode.View); }}>
                    <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                        <Tag color="blue" key={props.index + "23"} className="custom-cursor-pointer" >Ativar</Tag>
                    </Tooltip>
                </Link>
            </>);
    }

    function renderPagoOptions() {
        return (
            <>
                <Link to={{
                    pathname: `contas-receber/view/${idUrl}`,
                    state: {
                        formType: FromContaReceberType.VerPaga
                    }
                }}
                    onClick={() => { setFormMode(FormMode.View); }}>
                    <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                        <Tag color="gold" key={props.index + "23"} className="custom-cursor-pointer" >Ver</Tag>
                    </Tooltip>
                </Link>


                {/* <Link to={{
                    pathname: `contas-receber/view/${idUrl}`,
                    state: {
                        formType: FromContaReceberType.CancelarBaixa
                    }
                }}
                    onClick={() => { setFormMode(FormMode.View); }}>
                    <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                        <Tag color="blue" key={props.index + "23"} className="custom-cursor-pointer" >Cancelar Baixa</Tag>
                    </Tooltip>
                </Link> */}
            </>);
    }

    return (<>
        {props.record.dataPagamento && renderPagoOptions()}
        {props.record.dataCancelamento && renderCanceladOptions()}
        {!props.record.dataCancelamento && !props.record.dataPagamento && renderDefaultOptions()}
    </>)
}

export default RecordAction
