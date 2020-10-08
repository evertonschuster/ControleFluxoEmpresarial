import { Cliente } from './../Pessoas/Cliente';
import { OrdemServicoProduto, OrdemServicoServico } from './OrdemServicoItem';
import ContaReceber from '../Movimentos/ContaReceber';

export default interface OrdemServico {
    id?: number | null;
    clienteId?: number | null;
    cliente?: Cliente | null;
    
    condicaoPagamentoId?: number | null;

    descricaoEquipamento?: string | null;
    descricaoProblemaRelatado?: string | null;
    descricaoTecnico?: string | null;
    descricaoObservacaoTecnico?: string | null;

    dataAbertura?: Date | null;
    dataExecucao?: Date | null;
    dataDevolucaoCliente?: Date | null;

    produtos?: OrdemServicoProduto[] | null;
    servicos?: OrdemServicoServico[] | null;

    parcelas?: ContaReceber[];
}