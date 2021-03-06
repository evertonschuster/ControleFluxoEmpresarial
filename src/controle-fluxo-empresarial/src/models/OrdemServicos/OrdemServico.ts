import { Cliente } from './../Pessoas/Cliente';
import { OrdemServicoProduto, OrdemServicoServico } from './OrdemServicoItem';
import ContaReceber from '../Movimentos/ContaReceber';

export default interface OrdemServico {
    id?: number | null;
    clienteId?: number | null;
    cliente?: Cliente | null;

    condicaoPagamentoId?: number | null;

    equipamentoId?: number | null;
    problemaRelatadoId?: number | null;
    descricaoTecnico?: string | null;
    descricaoObservacaoTecnico?: string | null;
    descricaoAcessorio?: string | null;
    descricaoObservacao?: string | null;

    dataAbertura?: Date | null;
    dataExecucao?: Date | null;
    dataCancelamento?: Date | null;
    dataDevolucaoCliente?: Date | null;

    produtos?: OrdemServicoProduto[] | null;
    servicos?: OrdemServicoServico[] | null;

    parcelasProduto?: ContaReceber[];
    parcelasServico?: ContaReceber[] | null;
}