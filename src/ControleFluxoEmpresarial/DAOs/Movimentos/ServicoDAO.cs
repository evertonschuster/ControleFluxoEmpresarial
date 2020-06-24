using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ServicoDAO : DAO<Servico>
    {
        protected override string SqlListPagined { get; set; } = @"
                SELECT Servicos.Id, Servicos.Nome, Servicos.Valor, Servicos.CategoriaId, Servicos.Descricao, Servicos.Observacao, Servicos.DataCriacao, Servicos.DataAtualizacao,
		                categorias.id AS ""categoria.id"", categorias.nome AS ""categoria.nome"", categorias.datacriacao AS ""categoria.datacriacao"", 
		                        categorias.dataatualizacao AS ""categorias.dataatualizacao""

                FROM Servicos
	                INNER JOIN categorias ON categorias.id = Servicos.CategoriaId
        ";

        public ServicoDAO(ApplicationContext context) : base(context, "Servicos")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }
    }
}
