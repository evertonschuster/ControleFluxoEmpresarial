import React, { memo } from 'react';
import { RecordTable, RowMode } from './../EditableTable'
import { Tooltip, Tag } from 'antd';
import { useFormikContext } from 'formik';


export interface Props {
    record: RecordTable;
    index: number;
    handleRowMode: (record: RecordTable, rowMode: RowMode) => void;
    handleRemove: (record: RecordTable) => void;
}

const EditableCellAction: React.FC<Props> = (props) => {

    const { submitForm } = useFormikContext();

    function handleCancel(record: RecordTable) {
        if (record.rowMode === RowMode.new) {
            props.handleRemove(record);
            return;
        }

        props.handleRowMode(record, RowMode.view)
    }

    if (props.record.rowMode === RowMode.view) {
        return (
            <>
                <Tooltip placement="top" title="Editar Registro Selecionado."  >
                    <Tag color="green" key={props.index + "12"} className="custom-cursor-pointer" onClick={() => props.handleRowMode(props.record, RowMode.edit)} >Editar</Tag>
                </Tooltip>
                <Tooltip placement="top" title="Remove Registro Selecionado."  >
                    <Tag color="red" key={props.index + "13"} className="custom-cursor-pointer" onClick={() => props.handleRemove(props.record)} >Remover</Tag>
                </Tooltip>
            </>
        );
    }

    return (
        <>
            <Tooltip placement="top" title="Cancela Edição do Registro Selecionado."  >
                <Tag color="red" key={props.index + "13"} className="custom-cursor-pointer" onClick={() => handleCancel(props.record)}>Cancelar</Tag>
            </Tooltip>
            <Tooltip placement="top" title="Salva Registro Selecionado."  >
                <Tag color="green" key={props.index + "12"} className="custom-cursor-pointer" onClick={() => submitForm()} >Salvar</Tag>
            </Tooltip>
        </>
    )

}

export default memo(EditableCellAction, () => false);
