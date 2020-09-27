using ControleFluxoEmpresarial.DTO.Filters;

namespace ControleFluxoEmpresarial.Filters.DTO
{
    public class PaginationQuery<TSituacaoType>: IPaginationQuery
    {
        public int PageSize { get; set; } = 10;

        public int CurrentPage { get; set; } = 1;

        public string Filter { get; set; }

        public string OrderByProps { get; set; }

        public TSituacaoType Situacao { get; set; }
    }

    public interface IPaginationQuery
    {
        int PageSize { get; set; }

        int CurrentPage { get; set; }

        string Filter { get; set; }

        string OrderByProps { get; set; }
    }
}
