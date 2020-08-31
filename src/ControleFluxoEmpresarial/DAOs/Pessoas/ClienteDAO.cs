using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Pessoas;

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

            return this.ExecuteGetFirstOrDefault(sql, new { cpfcpnj });
        }
    }
}
