import React, { memo } from 'react';
import { Record, RowMode } from './../EditableTable'
import { Tooltip, Tag } from 'antd';
import { useFormikContext } from 'formik';


export interface Props {
    record: Record;
    index: number;
    handleRowMode: (record: Record, rowMode: RowMode) => void;
    handleRemove: (record: Record) => void;
}

const EditableCellAction: React.FC<Props> = (props) => {

    const { submitForm, errors } = useFormikContext();

    console.log("errors", errors)

    function handleCancel(record: Record) {
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

export default (EditableCellAction);
