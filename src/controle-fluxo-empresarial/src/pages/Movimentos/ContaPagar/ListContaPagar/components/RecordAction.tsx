import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FromContaPagarType } from '../../FromContaPagar/FromContaPagar';
import { Tooltip, Tag } from 'antd';
import BasicLayoutContext, { FormMode } from '../../../../../layouts/BasicLayout/BasicLayoutContext';
import ContaPagar from '../../../../../models/Movimentos/ContaPagar';

export interface Props {
    index: number;
    record: ContaPagar
}

const RecordAction: React.FC<Props> = (props) => {

    const { setFormMode } = useContext(BasicLayoutContext);
    const idUrl = `${props.record.modelo}/${props.record.serie}/${props.record.numero}/${props.record.fornecedorId}/${props.record.parcela}`;


    function renderDefaultOptions() {
        return (<>
            <Link to={{
                pathname: `contas-pagar/pay/${idUrl}`,
                state: {
                    formType: FromContaPagarType.Pagar
                }
            }}
                onClick={() => { setFormMode(FormMode.Edit); }}  >
                <Tooltip placement="top" title="Excluir Registro Selecionado." >
                    <Tag color="blue" key={props.index + "03"} className="custom-cursor-pointer" >Pagar</Tag>
                </Tooltip>
            </Link>

            <Link to={{
                pathname: (`contas-pagar/edit/${idUrl}`),
                state: {
                    formType: FromContaPagarType.Editar
                }
            }}
                onClick={() => { setFormMode(FormMode.Edit); }}>
                <Tooltip placement="top" title="Editar Registro Selecionado."  >
                    <Tag color="green" key={props.index + "12"} className="custom-cursor-pointer" >Editar</Tag>
                </Tooltip>
            </Link>

            <Link to={{
                pathname: `contas-pagar/cancel/${idUrl}`,
                state: {
                    formType: FromContaPagarType.Cancelar
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
        return (<Link to={{
            pathname: `contas-pagar/view/${idUrl}`,
            state: {
                formType: FromContaPagarType.VerCancelada
            }
        }}
            onClick={() => { setFormMode(FormMode.View); }}>
            <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                <Tag color="gold" key={props.index + "23"} className="custom-cursor-pointer" >Ver</Tag>
            </Tooltip>
        </Link>);
    }

    function renderPagoOptions() {
        return (<Link to={{
            pathname: `contas-pagar/view/${idUrl}`,
            state: {
                formType: FromContaPagarType.VerPaga
            }
        }}
            onClick={() => { setFormMode(FormMode.View); }}>
            <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                <Tag color="gold" key={props.index + "23"} className="custom-cursor-pointer" >Ver</Tag>
            </Tooltip>
        </Link>);
    }

    return (<>
        {props.record.dataPagamento && renderPagoOptions()}
        {props.record.dataCancelamento && renderCanceladOptions()}
        {!props.record.dataCancelamento && !props.record.dataPagamento && renderDefaultOptions()}
    </>)
}

export default RecordAction
