import { Associado } from "./Associado";

export interface Titular extends Associado {
    cpf?: string | null;
    email?: string | null;

    cep?: string | null;
    bairro?: string | null;
    endereco?: string | null;
    numero?: string | null;

    dependentes?: Associado[] | null;
}