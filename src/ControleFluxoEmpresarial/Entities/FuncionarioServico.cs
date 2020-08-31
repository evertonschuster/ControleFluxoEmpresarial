using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;

namespace ControleFluxoEmpresarial.Entities
{
    public class FuncionarioServico : BaseEntity
    {
        public Funcionario Funcionario { get; set; }

        public int FuncionarioId { get; set; }

        public Servico Servico { get; set; }

        public int ServicoId { get; set; }
    }
}
