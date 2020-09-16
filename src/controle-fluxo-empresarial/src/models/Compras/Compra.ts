import { IBaseEntity2 } from "../BaseEntity";
import { ParcelaPagamento } from "../CondicaoPagamento/ParcelaPagamento";
import { CompraProduto } from "./CompraProduto";

export interface Compra extends IBaseEntity2 {
    numero?: string | null;
    modelo?: string | null;
    serie?: string | null;
    dataEmissao?: Date | null;
    dataChegada?: Date | null;

    
    frete?: number | null;
    seguro?: number | null;
    outrasDespesas?: number | null;
    
    fornecedorId?: number | null;
    observacao?: string | null;
    
    produtos?: CompraProduto[] | null;
    parcelas?: ParcelaPagamento[] | null;
    total?: number | null;
    
    dataCancelamento?: Date | null;
    userCancelamento?: string | null;
}