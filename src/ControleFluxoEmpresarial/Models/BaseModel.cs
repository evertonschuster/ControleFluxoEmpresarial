﻿using ControleFluxoEmpresarial.Entities;
using Newtonsoft.Json;
using System;

namespace ControleFluxoEmpresarial.Models
{
    public abstract class BaseModelSituacao : BaseModel, IBaseSituacao, IBaseModel<int>
    {
        public DateTime? Situacao { get; set; }
    }

    public abstract class BaseModel : IBaseModel<int>, IBaseAuditoria
    {
        public int Id { get; set; }

        public DateTime DataCriacao { get; set; }

        public string UserCriacao { get; set; }

        public DateTime? DataAtualizacao { get; set; }

        public string? UserAtualizacao { get; set; }
    }



    public interface IBaseSituacao
    {
        DateTime? Situacao { get; set; }
    }

    public interface IBaseModel<TId> : IBaseEntity
    {
        [JsonProperty(Order = 1)]
        TId Id { get; set; }
    }

    public interface IBaseAuditoria
    {
        DateTime DataCriacao { get; set; }
        string UserCriacao { get; set; }

        DateTime? DataAtualizacao { get; set; }
        string UserAtualizacao { get; set; }
    }

}
