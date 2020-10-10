import React, { memo, useState, useContext, ReactNode } from 'react';
import { Input, Col, Button, Dropdown, Icon, Menu, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { ListItem } from '../../../../../components/ListForm/ListForm';
import BasicLayoutContext, { FormMode } from '../../../../../layouts/BasicLayout/BasicLayoutContext';


export interface Props<T> {
    tableProps: ListItem<T>;
    filterAdvancedHeader?: ReactNode
}

export enum SituacaoReceberReceber {
    PAGA = 1,
    PENDENTE = 2,
    VENCIDA = 3,
    CANCELADA = 4
}

const FilterSimpleHeader: React.FC<Props<any>> = (props) => {

    //#region Constantes

    const [filterValues, setFilterValues] = useState<string>()
    const [situacao, setSituacao] = useState<SituacaoReceberReceber[]>([])
    const { setFormMode } = useContext(BasicLayoutContext);

    const menu = (
        <Menu >
            <Menu.Item key={SituacaoReceberReceber.PAGA}>
                <Checkbox value={getValue(SituacaoReceberReceber.PAGA)} onClick={() => { setValue(SituacaoReceberReceber.PAGA) }}>Pagas</Checkbox>
            </Menu.Item>
            <Menu.Item key={SituacaoReceberReceber.CANCELADA}>
                <Checkbox value={getValue(SituacaoReceberReceber.CANCELADA)} onClick={() => { setValue(SituacaoReceberReceber.CANCELADA) }}>Canceladas</Checkbox>
            </Menu.Item>
            <Menu.Item key={SituacaoReceberReceber.PENDENTE}>
                <Checkbox value={getValue(SituacaoReceberReceber.PENDENTE)} onClick={() => { setValue(SituacaoReceberReceber.PENDENTE) }}>Pendentes</Checkbox>
            </Menu.Item>
            <Menu.Item key={SituacaoReceberReceber.VENCIDA}>
                <Checkbox value={getValue(SituacaoReceberReceber.VENCIDA)} onClick={() => { setValue(SituacaoReceberReceber.VENCIDA) }}>Vencidas</Checkbox>
            </Menu.Item>
        </Menu>
    );

    function getValue(value: SituacaoReceberReceber) {
        return !!situacao.find(e => e == value)
    }

    function setValue(value: SituacaoReceberReceber) {

        setSituacao(old => {
            if (old.find(e => e === value)) {
                return old.filter(e => e !== value);
            }
            return [...old, value]
        })
    }


    function renderOptions() {
        if (situacao.length === 0) {
            return "Situação da Conta a Receber"
        }

        if (situacao.length === Object.keys(SituacaoReceberReceber).length / 2) {
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


        if (situacao.find(e => e === SituacaoReceberReceber.PAGA)) {
            add("Pagas")
        }

        if (situacao.find(e => e === SituacaoReceberReceber.PENDENTE)) {
            add("Pendentes")
        }

        if (situacao.find(e => e === SituacaoReceberReceber.VENCIDA)) {
            add("Vencidas")
        }

        if (situacao.find(e => e === SituacaoReceberReceber.CANCELADA)) {
            add("Canceladas")
        }

        return text;

    }
    //#endregion

    return (
        <>
            <Col span={10}>
                <Input placeholder="Filtrar" value={filterValues}
                    onChange={(event) => { setFilterValues(event.target.value) }}
                    onPressEnter={() => {
                        props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues, situacao })
                    }} />
            </Col>

            <Col span={8} style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ paddingLeft: 16 }} >
                    <Dropdown overlay={menu} >
                        <Button>
                            {renderOptions()} <Icon type="down" />
                        </Button>
                    </Dropdown>
                </div>

                <div style={{ paddingLeft: 16 }}>
                    <Button type="primary" icon="search"
                        onClick={() => {
                            props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues, situacao })
                        }} />
                </div>
            </Col>

            <Col span={6} style={{ textAlign: "right" }}>
                <div style={{ flexDirection: "row" }}>
                    {props.filterAdvancedHeader && <Button type="default" style={{ marginRight: 16 }} onClick={() => props.tableProps.setAdvancedFilter!(true)}>Filtro Avançado</Button>}

                    <Button type="primary">
                        <Link to={"contas-receber/new"} onClick={() => setFormMode(FormMode.New)}>
                            Adicionar
                        </Link>
                    </Button>
                </div>
            </Col>

        </>
    );

}

export default memo(FilterSimpleHeader);
