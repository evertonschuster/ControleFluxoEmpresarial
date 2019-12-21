
CREATE TABLE [AspNetRoles] (
    [Id] VARCHAR(450) NOT NULL,
    [Name] VARCHAR(256) NULL,
    [NormalizedName] VARCHAR(256) NULL,
    [ConcurrencyStamp] VARCHAR(max) NULL,
    CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [AspNetUsers] (
    [Id] VARCHAR(450) NOT NULL,
    [UserName] VARCHAR(256) NULL,
    [NormalizedUserName] VARCHAR(256) NULL,
    [Email] VARCHAR(256) NULL,
    [NormalizedEmail] VARCHAR(256) NULL,
    [EmailConfirmed] bit NOT NULL,
    [PasswordHash] VARCHAR(max) NULL,
    [SecurityStamp] VARCHAR(max) NULL,
    [ConcurrencyStamp] VARCHAR(max) NULL,
    [PhoneNumber] VARCHAR(max) NULL,
    [PhoneNumberConfirmed] bit NOT NULL,
    [TwoFactorEnabled] bit NOT NULL,
    [LockoutEnd] datetimeoffset NULL,
    [LockoutEnabled] bit NOT NULL,
    [AccessFailedCount] INT NOT NULL,
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
);

GO


CREATE TABLE [AspNetRoleClaims] (
    [Id] INT NOT NULL IDENTITY,
    [RoleId] VARCHAR(450) NOT NULL,
    [ClaimType] VARCHAR(max) NULL,
    [ClaimValue] VARCHAR(max) NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [AspNetUserClaims] (
    [Id] INT NOT NULL IDENTITY,
    [UserId] VARCHAR(450) NOT NULL,
    [ClaimType] VARCHAR(max) NULL,
    [ClaimValue] VARCHAR(max) NULL,
    CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [AspNetUserLogins] (
    [LoginProvider] VARCHAR(450) NOT NULL,
    [ProviderKey] VARCHAR(450) NOT NULL,
    [ProviderDisplayName] VARCHAR(max) NULL,
    [UserId] VARCHAR(450) NOT NULL,
    CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [AspNetUserRoles] (
    [UserId] VARCHAR(450) NOT NULL,
    [RoleId] VARCHAR(450) NOT NULL,
    CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [AspNetUserTokens] (
    [UserId] VARCHAR(450) NOT NULL,
    [LoginProvider] VARCHAR(450) NOT NULL,
    [Name] VARCHAR(450) NOT NULL,
    [Value] VARCHAR(max) NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO






CREATE TABLE [Paises] (
    [Id] INT NOT NULL IDENTITY,
    [Nome] VARCHAR(50) NOT NULL,
    [Sigla] VARCHAR(5) NOT NULL,
    [DDI] VARCHAR(5) NOT NULL,
    CONSTRAINT [PK_Paises] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [Estados] (
    [Id] INT NOT NULL IDENTITY,
    [Nome] VARCHAR(50) NOT NULL,
    [UF] VARCHAR(5) NOT NULL,
    [PaisId] INT NOT NULL,
    CONSTRAINT [PK_Estados] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Estados_Paises_PaisId] FOREIGN KEY ([PaisId]) REFERENCES [Paises] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [Cidades] (
    [Id] INT NOT NULL IDENTITY,
    [Nome] VARCHAR(50) NOT NULL,
    [DDD] VARCHAR(5) NOT NULL,
    [EstadoId] INT NOT NULL,
    CONSTRAINT [PK_Cidades] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Cidades_Estados_EstadoId] FOREIGN KEY ([EstadoId]) REFERENCES [Estados] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [Clients] (
    [Id] INT NOT NULL IDENTITY,
    [Nome] VARCHAR(144) NOT NULL,
    [CPF] VARCHAR(16) NOT NULL,
    [Telephone] VARCHAR(50) NOT NULL,
    [CellPhone] VARCHAR(50) NOT NULL,
    [Email] VARCHAR(144) NOT NULL,
    [CidadeId] INT NOT NULL,
    CONSTRAINT [PK_Clients] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Clients_Cidades_CidadeId] FOREIGN KEY ([CidadeId]) REFERENCES [Cidades] ([Id]) ON DELETE CASCADE
);

GO

--CREATE TABLE [Addresses] (
--    [Id] INT NOT NULL IDENTITY,
--    [Addess] VARCHAR(max) NULL,
--    [Number] VARCHAR(max) NULL,
--    [IsPrincipal] bit NOT NULL,
--    [ClientId] INT NOT NULL,
--    CONSTRAINT [PK_Addresses] PRIMARY KEY ([Id]),
--    CONSTRAINT [FK_Addresses_Clients_ClientId] FOREIGN KEY ([ClientId]) REFERENCES [Clients] ([Id]) ON DELETE CASCADE
--);

--GO
