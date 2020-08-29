import React, { useContext, memo, useState, useMemo } from 'react';
import { Table, Tooltip, Tag, Modal, notification } from 'antd';
import { ListItem } from '../ListForm';
import { ColumnProps, TableRowSelection } from 'antd/lib/table';
import BasicLayoutContext, { FormMode } from '../../../layouts/BasicLayout/BasicLayoutContext';
import ModalFormContext from '../../ModalForm/ModalFormContext';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { errorBack } from '../../../utils/MessageApi';
import { ValidationError } from '../../../apis/Api.configure';

export interface Props<T> {
    keyProp?: string;
    columns: ColumnProps<T>[];
    tableProps: ListItem<T>;
    deleteFunction?: (id: number) => void;
    desativarFunction?: (id: number) => void;
    keyDescription?: string;
    hiddenAction?: boolean
}

const ListFormTable: React.FC<Props<any> & RouteComponentProps> = (props) => {

    const { formMode, setFormMode, sharedState } = useContext(BasicLayoutContext);
    const { setState, state } = useContext(ModalFormContext);
    const isSelectMode = formMode === FormMode.SelectMultiple || formMode === FormMode.SelectOne;
    const key = props.keyProp || "id";
    const ListSelectedItem: any[] = state ? [].concat(state) : [];
    const [showModal, setShowModal] = useState(false)
    const [record, setRecord] = useState<any>()
    const [loading, setLoading] = useState(false)

    const keyDescription = props.keyDescription || "nome";

    const columns = useMemo(() => {

        if (props.hiddenAction) {
            return props.columns
        }

        return props.columns.concat({
            title: 'Ações',
            key: 'action',
            width: "150px",
            render: (text: any, record: any, index: number) => (
                <>
                    <Link to={(props.location.pathname + "/edit/" + record[key]).replace("//", "/")} onClick={() => { setFormMode(FormMode.Edit); setState(undefined) }}>
                        <Tooltip placement="top" title="Editar Registro Selecionado."  >
                            <Tag color="green" key={index + "12"} className="custom-cursor-pointer" >Editar</Tag>
                        </Tooltip>
                    </Link>

                    {props.deleteFunction ?
                        <Tooltip placement="top" title="Excluir Registro Selecionado." >
                            <Tag color="red" key={index + "23"} className="custom-cursor-pointer" onClick={() => { setFormMode(FormMode.Delete); showExluir(record) }} >Excluir</Tag>
                        </Tooltip>
                        : null}

                </>
            ),
        })
    }, [props, setFormMode, showExluir, setState, key])




    const rowSelection: TableRowSelection<any> = {
        // selections: false,
        type: formMode === FormMode.SelectMultiple ? "checkbox" : "radio",
        onChange: onChangeRowSelection,
        selectedRowKeys: ListSelectedItem.map(e => e[key])
    }

    function onChangePagination(page: number) {
        props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: page })
    }

    function onChangeRowSelection<T>(selectedRowKeys: string[] | number[], selectedRows: T[]) {
        setState(selectedRows);
    }

    function showExluir(record: any) {
        setShowModal(true);
        setRecord(record);
    }

    function hidenExluir() {
        setShowModal(false);
        setState(undefined)

        if (sharedState && sharedState.savedFormMode) {
            setFormMode(sharedState.savedFormMode);
        }
    }

    function showDisableSituation(e: ValidationError) {
        Modal.confirm({
            title: e.message,
            content: "Deseja desativar?",
            cancelText: "Cancelar",
            okText: "Desativar",
            onOk: async () => {
                setLoading(true);
                try {

                    props.desativarFunction && await props.desativarFunction((record || {})[key])
                    props.tableProps.reflesh();

                    notification.success({
                        message: "Registro desativado com sucesso!",
                        duration: 10
                    });
                }
                catch (e) {
                    errorBack(null, e);
                }
                finally {
                    setLoading(false);
                    setFormMode(FormMode.List)
                    hidenExluir();
                }
            }
        })

    }


    function onClick(record: any) {
        if (!isSelectMode) return;

        if (FormMode.SelectOne === formMode) {
            setState([record]);
            return;
        }


        let newState = ListSelectedItem;

        if (ListSelectedItem.find(e => e[key] === record[key]) === undefined) {
            newState = ListSelectedItem.concat(record);
        }
        else {
            newState = ListSelectedItem.filter(e => e[key] !== record[key]);
        }

        setState(newState);
    }

    return (

        <>
            <Modal
                title="Atenção!!"
                visible={showModal}
                onOk={async () => {
                    setLoading(true);
                    try {

                        props.deleteFunction && await props.deleteFunction((record || {})[key])
                        props.tableProps.reflesh();

                        notification.success({
                            message: "Registro excluido com sucesso!",
                            duration: 10
                        });
                    }
                    catch (e) {
                        errorBack(null, e);

                        if (e.code === 409 && props.desativarFunction && !(record || {})["situacao"]) {
                            return showDisableSituation(e);
                        }
                    }
                    finally {
                        setLoading(false);
                        setFormMode(FormMode.List)
                        hidenExluir();
                    }
                }}
                onCancel={hidenExluir}
                okText="Excluir"
                cancelText="Cancelar"
                okType="danger"
                okButtonProps={{
                    loading: loading,
                    autoFocus: true,
                }}
                cancelButtonProps={{
                    loading: loading
                }}
            >
                <span>
                    Você está prestes a excluir '{(record || {})[keyDescription]}'.
                <br />
                    Está certo disso?
                </span>
            </Modal>

            <Table
                pagination={{
                    current: props.tableProps.requestResult.current,
                    pageSize: props.tableProps.requestResult.pageSize,
                    total: props.tableProps.requestResult.total,
                    onChange: onChangePagination
                }}
                loading={props.tableProps.isLoading}
                rowSelection={isSelectMode ? rowSelection : undefined}
                onRow={(record: any) => { return { onClick: () => { onClick(record) } } }}
                columns={columns}
                dataSource={props.tableProps.requestResult.dataSource}
                bordered={true}
                rowKey={(record: any) => record[key]}
                // scroll={{ y: 3000 }}
                size="small"
                useFixedHeader={true}>

            </Table>
        </>
    );

}

export default withRouter(memo(ListFormTable));
