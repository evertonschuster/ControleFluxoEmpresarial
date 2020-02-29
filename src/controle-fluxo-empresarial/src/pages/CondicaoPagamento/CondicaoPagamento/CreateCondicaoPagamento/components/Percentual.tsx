import React from 'react';
import { InputNumber } from '../../../../../components/WithFormItem/withFormItem';
import { useFormikContext } from 'formik';
import { CondicaoPagamentoParcela } from '../../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';
import { RecordTable } from '../../../../../components/EditableTable/EditableTable';
import { validatePercentual } from '../CondicaoPagamentoSchema';

export interface Props {
    text: any;
    record: CondicaoPagamentoParcela & RecordTable;
    index: number;
    percelasSource: (CondicaoPagamentoParcela & RecordTable)[]
}

const Percentual: React.FC<Props> = (props) => {

    //Se remover esta linha, o react nao atualiza o componente, 
    //  assim não executando o validator

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const submitForm = useFormikContext();



    return (
        <InputNumber name="percentual" label="" placeholder="0" required
        validate={(value) => validatePercentual(value, props.record, props.percelasSource)} 
        />
    )

}

export default Percentual;
