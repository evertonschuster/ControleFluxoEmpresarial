import React, { memo } from 'react'
import { FormaPagamentoApi } from '../../../../../apis/CondicaoPagamento/FormaPagamentoApi';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';

const RenderSelectionFormaPagamento: React.FC = () => {

    return (
        <SelectModelOne
            fetchMethod={FormaPagamentoApi.GetById.bind(FormaPagamentoApi)}
            name="formaPagamentoId"
            objectName="formaPagamento"
            keyDescription="nome"
            required={true}
            showLabel={false}
            label={{ title: "Seleção de Forma de Pagamento", label: "" }}
            errorMessage={{ noSelection: "Selecione uma Forma de Pagamento!" }}
            col={{
                inputId: 4,
                btnSearch: 2,
                inputDescription: 18
            }}
            path="forma-pagamento" />
    )
}

export default memo(RenderSelectionFormaPagamento);