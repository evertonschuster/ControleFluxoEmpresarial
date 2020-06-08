import React, { useState } from 'react';
import { Button, Table, Tooltip, Tag } from 'antd';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import { Associado } from '../../../../../models/Pessoas/Associado';
import CreateAssociado from './CreateAssociado';
import { ColumnProps } from 'antd/lib/table';
import { Titular } from '../../../../../models/Pessoas/Titular';

export interface Porps {
}

const Dependente: React.FC<Porps> = () => {

    const columns: ColumnProps<Associado>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
        },
        {
            title: 'RG',
            dataIndex: 'rg',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
        },
        {
            title: 'Data Nascimento',
            dataIndex: 'dataNascimento',
        },
        {
            title: "Ação",
            width: "90px",
            render: (text: any, record: Associado, index: number) => {

                return (
                    <Tooltip placement="top" title="Remove Registro Selecionado."  >
                        <Tag color="red" key={index + "13"} className="custom-cursor-pointer" onClick={() => onRemoveAssocido(index)} >Remover</Tag>
                    </Tooltip>)
                    ;
            }
        }
    ];

    const [showModal, setShowModal] = useState<boolean>(false);
    const formik = useFormikContext<Titular>();


    function onSaveAssociado(value: Associado, field: FieldArrayRenderProps) {
        field.insert(0, value);
        closeModalAssociado();
    }

    function onRemoveAssocido(indexEvent: number) {
        let dependentes = formik.values.dependentes?.filter((record, indexRow) => indexRow !== indexEvent);

        formik.setFieldValue("dependentes", dependentes)
    }

    function closeModalAssociado() {
        setShowModal(false);
    }

    return (
        <>
            <div style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end"
            }}>
                <Button type="primary" onClick={() => setShowModal(true)} >Adicionar dependente</Button>
            </div>

            <Table
                columns={columns}
                bordered
                size="small"
                dataSource={formik.values.dependentes || []}
                rowKey={(record: any, index: number) => index.toString()} />

            <FieldArray
                name="dependentes"
                render={arrayHelpers => (
                    <CreateAssociado
                        showModal={showModal}
                        onCancel={() => setShowModal(false)}
                        onSave={(item) => onSaveAssociado(item, arrayHelpers)}
                    />
                )} />
        </>
    );

}

export default Dependente;
