﻿CREATE DATABASE GestaoPessoalPostgress;

CREATE TABLE "AspNetRoles" (
    "Id" text NOT NULL,
    "Name" character varying(256) NULL,
    "NormalizedName" character varying(256) NULL,
    "ConcurrencyStamp" text NULL,
    CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetUsers" (
    "Id" text NOT NULL,
    "UserName" character varying(256) NULL,
    "NormalizedUserName" character varying(256) NULL,
    "Email" character varying(256) NULL,
    "NormalizedEmail" character varying(256) NULL,
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text NULL,
    "SecurityStamp" text NULL,
    "ConcurrencyStamp" text NULL,
    "PhoneNumber" text NULL,
    "PhoneNumberConfirmed" boolean NOT NULL,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnd" TIMESTAMP with time zone NULL,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" integer NOT NULL,
    CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetRoleClaims" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "RoleId" text NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") 
);

CREATE TABLE "AspNetUserClaims" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "UserId" text NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") 
);

CREATE TABLE "AspNetUserLogins" (
    "LoginProvider" text NOT NULL,
    "ProviderKey" text NOT NULL,
    "ProviderDisplayName" text NULL,
    "UserId" text NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") 
);

CREATE TABLE "AspNetUserRoles" (
    "UserId" text NOT NULL,
    "RoleId" text NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") 
);

CREATE TABLE "AspNetUserTokens" (
    "UserId" text NOT NULL,
    "LoginProvider" text NOT NULL,
    "Name" text NOT NULL,
    "Value" text NULL,
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name"),
    CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") 
);

CREATE TABLE Paises (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
    Sigla text NULL,
    DDI text NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,
    CONSTRAINT PK_Paises PRIMARY KEY (Id)
);

CREATE TABLE Estados (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
    UF text NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,
    PaisId integer NOT NULL,
    CONSTRAINT PK_Estados PRIMARY KEY (Id),
    CONSTRAINT FK_Estados_Paises_PaisId FOREIGN KEY (PaisId) REFERENCES Paises (Id) 
);

CREATE TABLE Cidades (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
    DDD text NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,
    EstadoId integer NOT NULL,
    CONSTRAINT PK_Cidades PRIMARY KEY (Id),
    CONSTRAINT FK_Cidades_Estados_EstadoId FOREIGN KEY (EstadoId) REFERENCES Estados (Id) 
);

CREATE TABLE Associados (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text not NULL,
    RG text not NULL,
    Telefone text NULL,
	DataNascimento TIMESTAMP with time zone NULL,
    TitularId integer NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Associado PRIMARY KEY (Id),
    FOREIGN KEY (TitularId) REFERENCES Associados (Id) 
);

CREATE TABLE Titulares (
    Id integer NOT NULL,
    CPF text NOT NULL,
    Email text NULL,
    CEP text NULL,
    Bairro text NULL,
    Endereco text NULL,
    Numero text NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Titular PRIMARY KEY (Id),
    FOREIGN KEY (Id) REFERENCES Associados (Id) 
);

CREATE TABLE FormaPagamentos (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Forma_Pagamentos PRIMARY KEY (Id)
);

CREATE TABLE CondicaoPagamentos (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
	Juro decimal NOT NULL,
	Multa decimal NOT NULL,
	Desconto decimal NOT NULL,
	DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Condicao_Pagamentos PRIMARY KEY (Id)
);

CREATE TABLE CondicaoPagamentoParcelas (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	NumeroDias integer NOT NULL,
	Percentual decimal NOT NULL,
	CondicaoPagamentosId integer NOT NULL,
	FormaPagamentoId integer NOT NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,
	
    CONSTRAINT PK_Condicao_Pagamento_Parcelas PRIMARY KEY (Id),
	FOREIGN KEY (CondicaoPagamentosId) REFERENCES CondicaoPagamentos (Id) ,
	FOREIGN KEY (FormaPagamentoId) REFERENCES FormaPagamentos (Id) 
);

CREATE TABLE Categorias (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Categorias PRIMARY KEY (Id)
);

CREATE TABLE FuncaoFuncionarios (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
    CargaHoraria decimal NOT NULL,
    RequerCNH boolean NOT NULL,
    Descricao text NULL,
    Observacao text NULL,
    DataCriacao  TIMESTAMP with time zone,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_FuncaoFuncionarios PRIMARY KEY (Id)
);

CREATE TABLE Marcas (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome text NULL,
    DataCriacao  TIMESTAMP with time zone ,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Marcas PRIMARY KEY (Id)
);

CREATE TABLE UnidadesMedida (
    Id text NULL,
    Nome text NULL,
    DataCriacao  TIMESTAMP with time zone ,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_UnidadesMedida PRIMARY KEY (Id)
);

CREATE TABLE Clientes (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome varchar(60) NOT NULL,
    Apelido varchar(60) NULL,
    Bairro varchar(60) NOT NULL,
    Cep varchar(9) NOT NULL,
    CidadeId integer NOT NULL,
    Complemento VARCHAR(255) NULL,
    CondicaoPagamentoId  integer NOT NULL,
    CPFCPNJ varchar(18) NOT NULL,
    DataNascimento TIMESTAMP with time zone NOT NULL,
    Email varchar(60) NOT NULL,
    Endereco varchar(60) NOT NULL,
    Nacionalidade VARCHAR(20) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    RgInscricaoEstadual VARCHAR(19) NOT NULL,
    Telefone VARCHAR(30) NOT NULL,
    LimiteCredito decimal(10,2),
    Sexo VARCHAR(10) NULL,
    EstadoCivil VARCHAR(20) NULL,
    Tipo VARCHAR(10) NOT NULL,
	IsBrasileiro boolean NOT NULL,
	Observacao varchar(255) NULL,

    DataCriacao  TIMESTAMP with time zone ,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Clientes PRIMARY KEY (Id),
    FOREIGN KEY (CidadeId) REFERENCES Cidades (Id) ,
	FOREIGN KEY (CondicaoPagamentoId) REFERENCES CondicaoPagamentos (Id) 
);

CREATE TABLE Fornecedores (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome varchar(60) NOT NULL,
    Apelido varchar(60) NULL,
    Bairro varchar(60) NOT NULL,
    Cep varchar(9) NOT NULL,
    CidadeId integer NOT NULL,
    Complemento VARCHAR(255) NULL,
	Contato VARCHAR(60) NOT NULL,
    CondicaoPagamentoId  integer NOT NULL,
    CPFCPNJ varchar(18) NOT NULL,
    Email varchar(60) NOT NULL,
    Endereco varchar(60) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    RgInscricaoEstadual VARCHAR(19) NOT NULL,
    Telefone VARCHAR(30) NOT NULL,
	Tipo VARCHAR(10) NOT NULL,
    LimiteCredito decimal(10,2),
	Observacao varchar(255) NULL,
    DataCriacao  TIMESTAMP with time zone ,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Fornecedores PRIMARY KEY (Id),
    FOREIGN KEY (CidadeId) REFERENCES Cidades (Id) ,
	FOREIGN KEY (CondicaoPagamentoId) REFERENCES CondicaoPagamentos (Id) 
);

CREATE TABLE Produtos (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome varchar(60) NOT NULL,
	UnidadeMedidaId VARCHAR(3) NOT NULL,
	CodigoBarras VARCHAR(20) NULL,
	Referencia VARCHAR(60) NULL,
	MarcaId integer NOT NULL,
	CategoriaId integer NOT NULL,
	QuantidadeMinima DECIMAL(10,2) NOT NULL,
	ValorCompra  DECIMAL(10,2) NOT NULL,
	ValorVenda  DECIMAL(10,2) NOT NULL,
	Quantidade  DECIMAL(10,2) NOT NULL,
	Observacao varchar(255) NULL,
	Descricao varchar(255) NULL,

	DataCriacao  TIMESTAMP with time zone ,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Produtos PRIMARY KEY (Id),
    FOREIGN KEY (UnidadeMedidaId) REFERENCES UnidadesMedida (Id),
	FOREIGN KEY (MarcaId) REFERENCES Marcas (Id),
	FOREIGN KEY (CategoriaId) REFERENCES Categorias (Id) 
);

CREATE TABLE Funcionarios (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome varchar(60) NOT NULL,
    Apelido varchar(60) NULL,
    Bairro varchar(60) NOT NULL,
    Cep varchar(9) NOT NULL,
    CidadeId integer NOT NULL,
    Complemento VARCHAR(255) NULL,
    CPFCPNJ varchar(18) NOT NULL,
    Email varchar(60) NOT NULL,
    Endereco varchar(60) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    RgInscricaoEstadual VARCHAR(19) NOT NULL,
    Telefone VARCHAR(30) NOT NULL,
    Sexo VARCHAR(10) NOT NULL,
	Observacao varchar(255) NULL,
  	EstadoCivil VARCHAR(20) NULL,
	cnh VARCHAR(14) NULL,
	DataValidadeCNH TIMESTAMP with time zone NULL,
	
	IsBrasileiro boolean NOT NULL,
    Salario DECIMAL(10,2) NOT NULL,
    DataDemissao TIMESTAMP with time zone NULL,
    DataAdmissao TIMESTAMP with time zone NOT NULL,
    
	Nacionalidade VARCHAR(20) NOT NULL,
	DataNascimento TIMESTAMP with time zone NOT NULL,
	FuncaoFuncionarioId int NOT NULL,
	
  	DataCriacao TIMESTAMP with time zone ,
    DataAtualizacao TIMESTAMP with time zone,
	
    CONSTRAINT PK_Funcionarios PRIMARY KEY (Id),
    FOREIGN KEY (CidadeId) REFERENCES Cidades (Id),
	FOREIGN KEY (FuncaoFuncionarioId) REFERENCES FuncaoFuncionarios (Id)
);


CREATE TABLE Servicos (
    Id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    Nome varchar(60) NOT NULL,
	CategoriaId integer NOT NULL,
	Valor DECIMAL(10,2) NOT NULL,
	Observacao varchar(255) NULL,
	Descricao varchar(255) NULL,

	DataCriacao  TIMESTAMP with time zone ,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_Servicos PRIMARY KEY (Id),
	FOREIGN KEY (CategoriaId) REFERENCES Categorias (Id) 
);

CREATE TABLE FuncionarioServicos(
    ServicoId  integer NOT NULL,
    FuncionarioId  integer NOT NULL,

    DataCriacao  TIMESTAMP with time zone ,
    DataAtualizacao TIMESTAMP with time zone,

    CONSTRAINT PK_FuncionarioServicos PRIMARY KEY (FuncionarioId,ServicoId),
	FOREIGN KEY (ServicoId) REFERENCES Servicos (Id),
	FOREIGN KEY (FuncionarioId) REFERENCES Funcionarios (Id) 
);

