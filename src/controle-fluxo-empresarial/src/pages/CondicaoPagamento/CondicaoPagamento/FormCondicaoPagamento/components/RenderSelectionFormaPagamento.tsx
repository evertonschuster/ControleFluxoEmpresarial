import React, { memo } from 'react'
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import { FormaPagamentoApi } from '../../../../../apis/CondicaoPagamento/FormaPagamentoApi';

const RenderSelectionFormaPagamento: React.FC = () => {

    return (
        <SelectModelOne
            fetchMethod={FormaPagamentoApi.GetById.bind(FormaPagamentoApi)}
            name="formaPagamento.id"
            ObjectName="formaPagamento"
            keyDescription="nome"
            required={true}
            showLabel={false}
            label={{ title: "Seleção de Forma de Pagamento", label: "" }}
            errorMessage={{ noSelection: "Selecione uma Forma de Pagamento!" }}
            path="forma-pagamento" />
    )
}

export default memo(RenderSelectionFormaPagamento);