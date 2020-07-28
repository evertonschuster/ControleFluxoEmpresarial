import React, { memo } from 'react';
import { CondicaoPagamentoParcela } from './../../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';
import { InputNumber } from '../../../../../components/WithFormItem/withFormItem';
import { RecordTable } from '../../../../../components/EditableTable/EditableTable';
import { useFormikContext } from 'formik';
import { validateNumeroDias } from '../CondicaoPagamentoSchema';

export interface Props {
    text: any;
    record: CondicaoPagamentoParcela & RecordTable;
    index: number;
    percelasSource: (CondicaoPagamentoParcela & RecordTable)[]
}

const NumeroDias: React.FC<Props> = (props) => {

    //Se remover esta linha, o react nao atualiza o componente, 
    //  assim não executando o validator

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const submitForm = useFormikContext();

    return (
        <InputNumber
            name="numeroDias" label="" placeholder="0" required
            validate={(value) => validateNumeroDias(value, props.record, props.percelasSource)} 
            />
    )

}

export default memo(NumeroDias);
