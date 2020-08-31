namespace ControleFluxoEmpresarial.DTO.Movimentos
{
    public class ContaPagarId
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public int FornecedorId { get; set; }
        public int Parcela { get; set; }
    }
}
