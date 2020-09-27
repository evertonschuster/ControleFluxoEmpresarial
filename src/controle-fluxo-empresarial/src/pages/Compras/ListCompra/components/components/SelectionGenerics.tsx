import { Button, Checkbox, Dropdown, Icon } from 'antd';
import Menu, { ClickParam } from 'antd/lib/menu';
import { useField } from 'formik';
import React from 'react'
import { situationFilter } from '../ListFilterAdvanced';

export interface Props {
    situacao: situationFilter[];
    setSituacao: (value: situationFilter[]) => void
}

const SelectionGenerics: React.FC<Props> = (props) => {


    function getValue(value: situationFilter) {
        return !!props.situacao.find(e => e == value)
    }

    function setValue(value: situationFilter) {
        if (props.situacao.find(e => e === value)) {
            return props.setSituacao(props.situacao.filter(e => e !== value));
        }

        props.setSituacao([...props.situacao, value]);
    }



    const menu = (
        <Menu >
            <Menu.Item key={situationFilter.ATIVAS}>
                <Checkbox value={getValue(situationFilter.ATIVAS)} onClick={() => { setValue(situationFilter.ATIVAS) }}>Ativas</Checkbox>
            </Menu.Item>
            <Menu.Item key={situationFilter.CANCELADA}>
                <Checkbox value={getValue(situationFilter.CANCELADA)} onClick={() => { setValue(situationFilter.CANCELADA) }}>Canceladas</Checkbox>
            </Menu.Item>
            <Menu.Item key={situationFilter.CANCELADA_RECENTEMENTE}>
                <Checkbox value={getValue(situationFilter.CANCELADA_RECENTEMENTE)} onClick={() => { setValue(situationFilter.CANCELADA_RECENTEMENTE) }}>Canceladas Recentemente</Checkbox>
            </Menu.Item>
            <Menu.Item key={situationFilter.LANCADA_RECENTEMENTE}>
                <Checkbox value={getValue(situationFilter.LANCADA_RECENTEMENTE)} onClick={(e) => { setValue(situationFilter.LANCADA_RECENTEMENTE) }}>Lançadas Recentemente</Checkbox>
            </Menu.Item>
        </Menu>
    );

    function renderOptions() {
        if (props.situacao.length === 0) {
            return "Situação da Compra"
        }

        if (props.situacao.length === Object.keys(situationFilter).length / 2) {
            return "Todas"
        }

        let text = "";
        function add(key: string) {
            if (text.length === 0) {
                text = key;
                return;
            }
            text += `, ${key}`
        }


        if (props.situacao.find(e => e === situationFilter.ATIVAS)) {
            add("Ativas")
        }

        if (props.situacao.find(e => e === situationFilter.CANCELADA)) {
            add("Canceladas")
        }

        if (props.situacao.find(e => e === situationFilter.CANCELADA_RECENTEMENTE)) {
            add("Canceladas Rec")
        }

        if (props.situacao.find(e => e === situationFilter.LANCADA_RECENTEMENTE)) {
            add("Lançadas Rec")
        }

        return text;

    }

    return (
        <Dropdown overlay={menu} >
            <Button>
                {renderOptions()} <Icon type="down" />
            </Button>
        </Dropdown>
    )
}

export default SelectionGenerics
