import React, { memo } from 'react';
import { InputNumber } from '../../../../../components/WithFormItem/withFormItem';
import { useFormikContext } from 'formik';
import { RecordTable } from '../../../../../components/EditableTable/EditableTable';
import { CondicaoPagamentoParcela } from './../../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';
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
    console.log(submitForm.errors);



    return (
        <InputNumber
            name="numeroDias" label="" placeholder="0" required
            validate={(value) => validateNumeroDias(value, props.record, props.percelasSource)} 
            />
    )

}

export default memo(NumeroDias);
