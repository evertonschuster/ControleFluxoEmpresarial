import React, { useState } from 'react'
import "./menu-situation.styles.less"
import ShowSituation from '../../ShowSituation/ShowSituation';
import { Checkbox } from 'antd';
import { SITUACAO } from '../../../../models/BaseEntity';

export interface Props {
    parent: HTMLElement | null;
    situation: SITUACAO;
    setSituacao: React.Dispatch<React.SetStateAction<SITUACAO>>
    onClose: () => void
}

const MenuSituation: React.FC<Props> = (props) => {

    if (!props.parent) {
        return null;
    }

    let rect = props.parent.getBoundingClientRect();

    let top = rect.top + 30;
    let left = rect.left;
    let width = rect.width;

    function onChangeHabilitado(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {

        event.preventDefault()

        if (props.situation === SITUACAO.TODOS) {
            return props.setSituacao(SITUACAO.DESABILITADO);
        }

        return props.setSituacao(SITUACAO.TODOS);
    }

    function onChangeDesabilitado(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {

        event.preventDefault()

        if (props.situation === SITUACAO.TODOS) {
            return props.setSituacao(SITUACAO.HABILITADO);
        }
        return props.setSituacao(SITUACAO.TODOS);
    }

    return (
        <>
            <div className="menu-selection-layer" onClick={props.onClose}>
            </div>
            <div style={{ top, left, width }} className="menu">
                <ul className="list-situation">
                    <li onClick={onChangeHabilitado} >
                        <Checkbox
                            checked={props.situation === SITUACAO.HABILITADO || props.situation === SITUACAO.TODOS}
                            onClick={onChangeHabilitado} />{ShowSituation(null)}
                    </li>

                    <li onClick={onChangeDesabilitado} >
                        <Checkbox
                            checked={props.situation === SITUACAO.DESABILITADO || props.situation === SITUACAO.TODOS}
                            onClick={onChangeDesabilitado} />{ShowSituation({ Situacao: new Date() })}
                    </li>
                </ul>
            </div>
        </>
    )
}

export default MenuSituation
