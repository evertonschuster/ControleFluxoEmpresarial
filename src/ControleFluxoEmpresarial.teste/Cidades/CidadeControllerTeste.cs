using ControleFluxoEmpresarial.Models.Cidades;
using ControleFluxoEmpresarial.ModelView.Filters.Queries;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Xunit;

namespace ControleFluxoEmpresarial.teste.Cidades
{
    public class CidadeControllerTeste : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        public CustomWebApplicationFactory<Startup> _factory;
        private readonly HttpClient _client;

        public CidadeControllerTeste(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public void Create_Invalid_Cidade_CidadeController()
        {
            var pais = new Pais()
            {
                Nome = $"Brasil_test_1{DateTime.Now}",
                Sigla = "BR",
                DDI = "+55"
            };

            var json = JsonConvert.SerializeObject(pais);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            // Must be successful.
            var stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var createResult = JsonConvert.DeserializeObject<CreateResult>(stringResponse);

            Assert.True(createResult.Id > 0);
            pais.Id = createResult.Id;


            var estado = new Estado()
            {
                Nome = $"Parana_test_1{DateTime.Now}",
                UF = "PR",
                PaisId = pais.Id
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;
            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);


            // Must be successful.
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            createResult = JsonConvert.DeserializeObject<CreateResult>(stringResponse);


            Assert.True(createResult.Id > 0);
            estado.Id = createResult.Id;


            var cidade = new Cidade()
            {
                Nome = $"",
                DDD = "",
                EstadoId = 0
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            cidade = new Cidade()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                DDD = "",
                EstadoId = estado.Id,
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            cidade = new Cidade()
            {
                Nome = $"",
                DDD = "PR",
                EstadoId = estado.Id,

            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            cidade = new Cidade()
            {
                Nome = $"",
                EstadoId = estado.Id,
                DDD = "",
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            cidade = new Cidade()
            {
                Nome = $"",
                EstadoId = estado.Id,
                DDD = "55",
            };


            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            cidade = new Cidade()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                EstadoId = estado.Id,
                DDD = "",
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            cidade = new Cidade()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                EstadoId = 0,
                DDD = "PR",
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);

            cidade = new Cidade()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                EstadoId = estado.Id,
                DDD = "46464654654",
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);


            cidade = new Cidade()
            {
                Nome = $"Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_Parana_test_",
                EstadoId = estado.Id,
                DDD = "55",
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK);



            cidade = new Cidade()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                EstadoId = estado.Id,
                DDD = "PR",
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;


            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode != System.Net.HttpStatusCode.OK, "Cidade repetido");
        }

        [Fact]
        public void Create_Update_Delete_Cidade_CidadeController()
        {
            var pais = new Pais()
            {
                Nome = $"Brasil_test_{DateTime.Now}",
                Sigla = "BR",
                DDI = "+55"
            };

            var json = JsonConvert.SerializeObject(pais);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var httpResponse = _client.PostAsync("/api/Pais", data).Result;

            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            // Must be successful.
            var stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var createResult = JsonConvert.DeserializeObject<CreateResult>(stringResponse);

            Assert.True(createResult.Id > 0);
            pais.Id = createResult.Id;

            var estado = new Estado()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                UF = "PR",
                PaisId = pais.Id
            };

            json = JsonConvert.SerializeObject(estado);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Estado", data).Result;

            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            // Must be successful.
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            createResult = JsonConvert.DeserializeObject<CreateResult>(stringResponse);

            Assert.True(createResult.Id > 0);
            estado.Id = createResult.Id;

            var cidade = new Cidade()
            {
                Nome = $"Parana_test_{DateTime.Now}",
                DDD = "PR",
                EstadoId = estado.Id
            };

            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PostAsync("/api/Cidade", data).Result;

            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            // Must be successful.
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            createResult = JsonConvert.DeserializeObject<CreateResult>(stringResponse);

            Assert.True(createResult.Id > 0);


            cidade.Id = createResult.Id;
            cidade.Nome = "Novo Nome";
            cidade.DDD = "DDD";
            json = JsonConvert.SerializeObject(cidade);
            data = new StringContent(json, Encoding.UTF8, "application/json");
            httpResponse = _client.PutAsync("/api/Cidade", data).Result;
            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);


            httpResponse = _client.GetAsync($"/api/Cidade/{createResult.Id}").Result;
            httpResponse.EnsureSuccessStatusCode();
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var cidadeDb = JsonConvert.DeserializeObject<Cidade>(stringResponse);

            Assert.True(cidade.Nome == cidadeDb.Nome);

            httpResponse = _client.DeleteAsync($"/api/Cidade/{createResult.Id}").Result;
            Assert.True(httpResponse.StatusCode == System.Net.HttpStatusCode.OK);

            httpResponse = _client.GetAsync($"/api/Cidade/{createResult.Id}").Result;
            httpResponse.EnsureSuccessStatusCode();
            stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var cidadeDbDeleted = JsonConvert.DeserializeObject<Cidade>(stringResponse);

            Assert.Null(cidadeDbDeleted);
        }

    }
}
