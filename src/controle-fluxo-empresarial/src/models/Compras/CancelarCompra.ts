export interface CancelarCompra {
    numero?: string | null;
    modelo?: string | null;
    serie?: string | null;
    fornecedorId?: number | null;

    justificativa?: string | null;
    senha?: string | null;
}