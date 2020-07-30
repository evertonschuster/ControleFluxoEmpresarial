using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class Servico : BaseModelSituacao
    {
        public string Nome { get; set; }

        public decimal Valor { get; set; }

        public int CategoriaId { get; set; }

        public Categoria Categoria { get; set; }

        public string Descricao { get; set; }

        public string Observacao { get; set; }

        public List<Funcionario> Funcionarios { get; set; }

    }

    public class ServicoValidator : AbstractValidator<Servico>
    {
        public CategoriaDAO CategoriaDAO { get; set; }
        public ServicoDAO ServicoDAO { get; set; }


        public ServicoValidator(CategoriaDAO categoriaDAO, ServicoDAO servicoDAO)
        {
            this.ServicoDAO = servicoDAO ?? throw new ArgumentNullException(nameof(servicoDAO));
            this.CategoriaDAO = categoriaDAO ?? throw new ArgumentNullException(nameof(categoriaDAO));

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("Servico não pode estar vazio.")
                .MaximumLength(60).WithMessage("Servico não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("Servico deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Descricao)
                .MaximumLength(255).WithMessage("Descrição não deve possuir mais de 255 caracteres.");

            RuleFor(e => e.Observacao)
                .MaximumLength(255).WithMessage("Observação não deve possuir mais de 255 caracteres.");

            RuleFor(e => e.CategoriaId)
                .NotEmpty().WithMessage("Informe a Categoria.")
                .Must(ExistCategoria).WithMessage("Categoria não cadastrada.");

            RuleFor(e => e.Valor)
                .NotEmpty().WithMessage("Informe o Valor.")
                .Must(e => e < 100000000).WithMessage("O Valor deve ser menor que 100000000.")
                .Must(e => e >= 0).WithMessage("Valor deve ser superior ou igual a 0.");

        }


        private bool ExistCategoria(Servico servico, int id)
        {
            var categoriaDb = this.CategoriaDAO.GetByID(id);
            var servicoDb = this.ServicoDAO.GetByID(servico.Id);
            if (servico.Id > 0 && categoriaDb != null && servico.CategoriaId == servicoDb.CategoriaId)
            {
                return true;
            }

            return categoriaDb != null && categoriaDb.Situacao == null;
        }
    }
}
