import { IBaseEntity2 } from "../BaseEntity";
import { ParcelaPagamento } from "../CondicaoPagamento/ParcelaPagamento";
import { CompraProduto } from "./CompraProduto";

export interface Compra extends IBaseEntity2 {
    numero?: string | null;
    modelo?: string | null;
    serie?: string | null;
    dataEmissao?: Date | null;
    dataChegada?: Date | null;

    fornecedorId?: number | null;
    observacao?: string | null;

    compraProdutos?: CompraProduto[] | null;
    parcelas?: ParcelaPagamento[] | null;
    total?: number | null;
}