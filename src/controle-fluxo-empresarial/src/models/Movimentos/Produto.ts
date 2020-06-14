export interface Produto {
    id?: number;
    nome: string;
    marcaId?: number;
    codigoBarras?: string;
    quantidade?: number;
    quantidadeMinima?: number;
    valorCompra?: number;
    taxa?: number;
    valorVenda?: number;
    categoriaId?: number;
    unidadeMedidaId?: string;
    referencia?: string;
    descricao?: string;
    observacao?: string;
}