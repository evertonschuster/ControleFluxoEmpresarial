﻿namespace ControleFluxoEmpresarial.DTO.Compras
{
    public class ProdutoCompraId
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public int FornecedorId { get; set; }
        public int ProdutoId { get; set; }
    }
}