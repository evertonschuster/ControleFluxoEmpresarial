using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class FornecedorDAO : DAO<Fornecedor>
    {
        public FornecedorDAO(DataBaseConnection context) : base(context, "Fornecedores")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }

        public Fornecedor GetByCPFCNPJ(string cpfcpnj)
        {
            var sql = "SELECT * FROM Fornecedores WHERE cpfcpnj = @cpfcpnj";

            return this.ExecuteGetFirstOrDefault(sql, new { cpfcpnj });
        }
    }
}
