import React, { memo, useState, useContext, ReactNode } from 'react';
import { Input, Col, Button, Menu, Checkbox, Dropdown, Icon } from 'antd';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { ListItem } from '../../../../components/ListForm/ListForm';
import BasicLayoutContext, { FormMode } from '../../../../layouts/BasicLayout/BasicLayoutContext';


export interface Props<T> {
    tableProps: ListItem<T>;
}

export enum situationOrdemServico {
    PENDENTE = 1,
    EM_EXECUCAO = 2,
    DEVOLVIDO = 3,
    CANCELADA = 4,
}

const ListFormHeader: React.FC<Props<any> & RouteComponentProps> = (props) => {

    //#region Constantes

    const [filterValues, setFilterValues] = useState<string>()
    const [situacao, setSituacao] = useState<situationOrdemServico[]>([])
    const { setFormMode } = useContext(BasicLayoutContext);

    //#endregion

    function getValue(value: situationOrdemServico) {
        return !!situacao.find(e => e == value)
    }

    function setValue(value: situationOrdemServico) {
        if (situacao.find(e => e === value)) {
            return setSituacao(situacao.filter(e => e !== value));
        }

        setSituacao([...situacao, value]);
    }



    const menu = (
        <Menu >
            <Menu.Item key={situationOrdemServico.PENDENTE}>
                <Checkbox value={getValue(situationOrdemServico.PENDENTE)} onClick={() => { setValue(situationOrdemServico.PENDENTE) }}>Pendentes</Checkbox>
            </Menu.Item>
            <Menu.Item key={situationOrdemServico.EM_EXECUCAO}>
                <Checkbox value={getValue(situationOrdemServico.EM_EXECUCAO)} onClick={() => { setValue(situationOrdemServico.EM_EXECUCAO) }}>Em Execução</Checkbox>
            </Menu.Item>
            <Menu.Item key={situationOrdemServico.DEVOLVIDO}>
                <Checkbox value={getValue(situationOrdemServico.DEVOLVIDO)} onClick={(e) => { setValue(situationOrdemServico.DEVOLVIDO) }}>Devolvidos</Checkbox>
            </Menu.Item>
            <Menu.Item key={situationOrdemServico.CANCELADA}>
                <Checkbox value={getValue(situationOrdemServico.CANCELADA)} onClick={() => { setValue(situationOrdemServico.CANCELADA) }}>Canceladas</Checkbox>
            </Menu.Item>
        </Menu>
    );

    function renderOptions() {
        if (situacao.length === 0) {
            return "Situação da Ordem de serviço"
        }

        if (situacao.length === Object.keys(situationOrdemServico).length / 2) {
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


        if (situacao.find(e => e === situationOrdemServico.PENDENTE)) {
            add("Pendentes")
        }

        if (situacao.find(e => e === situationOrdemServico.CANCELADA)) {
            add("Canceladas")
        }

        if (situacao.find(e => e === situationOrdemServico.EM_EXECUCAO)) {
            add("Em Execução")
        }

        if (situacao.find(e => e === situationOrdemServico.DEVOLVIDO)) {
            add("Devolvidos")
        }

        return text;

    }

    return (
        <>
            <Col span={10}>
                <Input placeholder="Filtrar" value={filterValues}
                    onChange={(event) => { setFilterValues(event.target.value) }}
                    onPressEnter={() => {
                        props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues, situacao })
                    }} />
            </Col>

            <Col span={8} >
                <div style={{ flexDirection: "row", display: "flex" }}>
                    <div style={{ paddingLeft: 16 }}>
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
                </div>
            </Col>

            <Col span={6} style={{ textAlign: "right" }}>
                <div style={{ flexDirection: "row" }}>
                    <Button type="primary">
                        <Link to={("ordem-servico/new").replace("//", "/")} onClick={() => setFormMode(FormMode.New)}>
                            Adicionar
                        </Link>
                    </Button>
                </div>
            </Col>

        </>
    );

}

export default withRouter(memo(ListFormHeader));
