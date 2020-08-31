using Microsoft.AspNetCore.Builder;

namespace ControleFluxoEmpresarial.DataBase
{
    public interface ISeedDataBase
    {
        IApplicationBuilder serviceProvider { get; set; }

        void Execute();
    }
}
