export interface Produto {
    id?: number | null;
    nome?: string | null;
    marcaId?: number | null;
    codigoBarras?: string | null;
    quantidade?: number | null;
    quantidadeMinima?: number | null;
    valorCompra?: number | null;
    percentualLucro?: number | null;
    valorVenda?: number | null;
    categoriaId?: number | null;
    unidadeMedidaId?: string | null;
    referencia?: string | null;
    descricao?: string | null;
    observacao?: string | null;
}