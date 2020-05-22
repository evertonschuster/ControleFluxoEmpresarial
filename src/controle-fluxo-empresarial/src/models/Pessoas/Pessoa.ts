export interface Pessoa {
    id?: string,
    nome?: string,
    apelido?: string,
    rgInscricaoEstadual?: string,
    cPFCPNJ?: string,
    endereco?: string,
    bairro?: string,
    complemento?: string,
    cep?: string,
    dataNascimento?: Date,
    nacionalidade?: string,
    telefone?: string,
    email?: string,
    observacoes?: string,
}

export enum SEXO {
    Masculino = "Masculino",
    Feminino = "Feminino",
    Outros = "Outros",
}

export enum ESTADO_CIVIL {
    Casado = "Casado",
    Divorciado = "Divorciado",
    Separadoo = "Separadoo",
    Solteiro = "Solteiro",
    Viuvo = "Viuvo",
    Outros = "Outros",
}

export enum TIPO_PESSOA {
    Fisica = "Fisica",
    Juridica = "Juridica",
}