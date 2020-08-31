using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;
using System;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class Produto : BaseModelSituacao
    {
        public string Nome { get; set; }

        public string UnidadeMedidaId { get; set; }

        public string CodigoBarras { get; set; }

        public string Referencia { get; set; }

        public string Descricao { get; set; }

        public string Observacao { get; set; }

        public int MarcaId { get; set; }

        public Marca Marca { get; set; }

        public int CategoriaId { get; set; }

        public Categoria Categoria { get; set; }

        public decimal QuantidadeMinima { get; set; }

        public decimal ValorCompra { get; set; }

        public decimal ValorVenda { get; set; }

        public decimal Quantidade { get; set; }

    }
    public class ProdutoValidator : AbstractValidator<Produto>
    {
        public UnidadeMedidaDAO UnidadeMedidaDAO { get; set; }

        public CategoriaDAO CategoriaDAO { get; set; }

        public MarcaDAO MarcaDAO { get; set; }

        public ProdutoDAO ProdutoDAO { get; set; }

        public ProdutoValidator(UnidadeMedidaDAO unidadeMedidaDAO, CategoriaDAO categoriaDAO, MarcaDAO marcaDAO, ProdutoDAO produtoDAO)
        {
            this.UnidadeMedidaDAO = unidadeMedidaDAO ?? throw new ArgumentNullException(nameof(unidadeMedidaDAO));
            this.CategoriaDAO = categoriaDAO ?? throw new ArgumentNullException(nameof(categoriaDAO));
            this.ProdutoDAO = produtoDAO ?? throw new ArgumentNullException(nameof(produtoDAO));
            this.MarcaDAO = marcaDAO ?? throw new ArgumentNullException(nameof(marcaDAO));

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("Produto não pode ser vazio.")
                .MaximumLength(60).WithMessage("Produto não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("Produto deve possuir mais de 5 caracteres.");

            RuleFor(e => e.UnidadeMedidaId)
                .NotEmpty().WithMessage("Informe a Unidade de Medida.")
                .Must(ExistUnidadeMedida).WithMessage("Unidade de Medida não cadastrada.");

            RuleFor(e => e.CodigoBarras)
                    .MaximumLength(20).WithMessage("Código de Barras não deve possuir mais de 20 caracteres.");

            RuleFor(e => e.Referencia)
                .NotEmpty().WithMessage("Referência não pode ser vazia.")
                .MaximumLength(60).WithMessage("Referência não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("Referência deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Descricao)
                .MaximumLength(255).WithMessage("Descrição não deve possuir mais de 255 caracteres.");

            RuleFor(e => e.Observacao)
                .MaximumLength(255).WithMessage("Observação não deve possuir mais de 255 caracteres.");

            RuleFor(e => e.MarcaId)
                .NotEmpty().WithMessage("Informe a Marca.")
                .Must(ExistMarca).WithMessage("Marca não cadastrada.");

            RuleFor(e => e.CategoriaId)
                .NotEmpty().WithMessage("Informe a Categoria.")
                .Must(ExistCategoria).WithMessage("Categoria não cadastrada.");

            RuleFor(e => e.QuantidadeMinima)
                .NotEmpty().WithMessage("Informe a Quantidade Mínima.")
                .Must(e => e < 100000000).WithMessage("A Quantidade Mínima deve ser menor que 100000000.")
                .Must(e => e >= 0).WithMessage("Quantidade Mínima deve ser superior ou igual a 0.");

            RuleFor(e => e.ValorCompra)
                .NotEmpty().WithMessage("Informe o Valor de Compra.")
                .Must(e => e < 100000000).WithMessage("O Valor de Compra deve ser menor que 100000000.")
                .Must(e => e >= 0).WithMessage("Valor de Compra deve ser superior ou igual a 0.");

            RuleFor(e => e.ValorVenda)
                .NotEmpty().WithMessage("Informe o Valor de venda.")
                .Must(e => e < 100000000).WithMessage("O Valor de Venda deve ser menor que 100000000.")
                .Must(e => e >= 0).WithMessage("Valor de venda deve ser superior ou igual a 0.");

            RuleFor(e => e.Quantidade)
                .NotEmpty().WithMessage("Informe a Quantidade.")
                .Must(e => e < 100000000).WithMessage("A Quantidade deve ser menor que 100000000.")
                .Must(e => e >= 0).WithMessage("Quantidade deve ser superior ou igual a 0.");
        }


        private bool ExistUnidadeMedida(Produto produto, string id)
        {
            var unidadeMedidaDb = this.UnidadeMedidaDAO.GetByID(id);
            var produtoDb = this.ProdutoDAO.GetByID(produto.Id);
            if (produto.Id > 0 && unidadeMedidaDb != null && produtoDb.UnidadeMedidaId == produto.UnidadeMedidaId)
            {
                return true;
            }

            return unidadeMedidaDb != null && unidadeMedidaDb.Situacao == null;
        }

        private bool ExistMarca(Produto produto, int id)
        {
            var marcaDb = this.MarcaDAO.GetByID(id);
            var produtoDb = this.ProdutoDAO.GetByID(produto.Id);
            if (produto.Id > 0 && marcaDb != null && produtoDb.MarcaId == produto.MarcaId)
            {
                return true;
            }

            return marcaDb != null && marcaDb.Situacao == null;
        }

        private bool ExistCategoria(Produto produto, int id)
        {
            var categoriaDb = this.CategoriaDAO.GetByID(id);
            var produtoDb = this.ProdutoDAO.GetByID(produto.Id);
            if (produto.Id > 0 && categoriaDb != null && produtoDb.CategoriaId == produto.CategoriaId)
            {
                return true;
            }

            return categoriaDb != null && categoriaDb.Situacao == null;
        }
    }
}
