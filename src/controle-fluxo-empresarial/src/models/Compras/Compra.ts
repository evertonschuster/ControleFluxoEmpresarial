import { IBaseEntity2 } from "../BaseEntity";
import { CompraProduto } from "./CompraProduto";

export interface Compra extends IBaseEntity2 {
    numero?: string | null;
    modelo?: string | null;
    serie?: string | null;
    fornecedorId?: number | null;

    compraProdutos?: CompraProduto[] | null;
    total?: number | null;
}