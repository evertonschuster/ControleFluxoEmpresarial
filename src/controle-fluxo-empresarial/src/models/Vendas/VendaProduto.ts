import { Produto } from "../Movimentos/Produto";

export interface VendaProduto{

    quantidade: number | null;
    valor?: number | null;
    
    produtoId?: number | null;
    produto?: Produto | null;
}