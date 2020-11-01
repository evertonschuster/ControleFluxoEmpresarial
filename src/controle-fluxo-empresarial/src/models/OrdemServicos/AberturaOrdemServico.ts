export default interface AberturaOrdemServico {
    clienteId?: number | null;
    telefone?: string | null;
    contato?: string | null;
    numeroSerie?: string | null;
    equipamentoId?: number | null;
    problemaRelatadoId?: number | null;
    descricaoAcessorio?: string | null;
    descricaoObservacao?: string | null;
}