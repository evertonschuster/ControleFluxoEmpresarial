﻿using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class ClienteDAO : DAO<Cliente>
    {
        public ClienteDAO(DataBaseConnection context) : base(context, "Clientes")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }

        internal Cliente GetByCPFCNPJ(string cpfcpnj)
        {
            var sql = "SELECT * FROM clientes WHERE cpfcpnj = @cpfcpnj";

            return this.ExecuteGetFirstOrDefault(sql, new { cpfcpnj});
        }
    }
}
