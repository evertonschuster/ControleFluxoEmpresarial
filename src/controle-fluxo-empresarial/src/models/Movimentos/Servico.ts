import { BaseEntity } from './../BaseEntity';
import { Funcionario } from './../Pessoas/Funcionario';

export interface Servico extends BaseEntity {
    nome: string,
    valor?: number,
    categoriaId?: number,
    descricao?: string | null,
    observacao?: string | null,
    funcionarios?: Funcionario[]
}