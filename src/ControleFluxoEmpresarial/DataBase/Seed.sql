DO $$
DECLARE  
   userId text := (SELECT "Id" from "AspNetUsers" LIMIT 1);  
BEGIN  
   
    RAISE NOTICE'Value of c: %', userId;
	
--Pais
	INSERT INTO public.paises(id, nome, sigla, ddi, datacriacao, usercriacao)
	VALUES (1, 'Brasil', 'BR', '+55', '2020-01-01', userId);

--Estado
    INSERT INTO public.estados(id, nome, uf, paisid, datacriacao, usercriacao)
	VALUES (1, 'Paraná', 'PR', 1, '2020-01-01', userId);

    INSERT INTO public.estados(id, nome, uf, paisid, datacriacao, usercriacao)
	VALUES (2, 'São Paulo', 'SP', 1, '2020-01-01', userId);

    INSERT INTO public.estados(id, nome, uf, paisid, datacriacao, usercriacao)
	VALUES (3, 'Santa Catarina', 'SC', 1, '2020-01-01', userId);

--Cidade
	INSERT INTO public.cidades(id, nome, ddd, estadoid, datacriacao, usercriacao)
	VALUES (1, 'Missal', '45', 1, '2020-01-01', userId );

    INSERT INTO public.cidades(id, nome, ddd, estadoid, datacriacao, usercriacao)
	VALUES (2, 'Itaiulandia', '45', 1, '2020-01-01', userId );

    INSERT INTO public.cidades(id, nome, ddd, estadoid, datacriacao, usercriacao)
	VALUES (3, 'São Miguel do Iguaçu', '45', 1, '2020-01-01', userId );

    INSERT INTO public.cidades(id, nome, ddd, estadoid, datacriacao, usercriacao)
	VALUES (4, 'Santa Terezinha', '45', 1, '2020-01-01', userId );

    INSERT INTO public.cidades(id, nome, ddd, estadoid, datacriacao, usercriacao)
	VALUES (5, 'Foz do Iguaçu', '45', 1, '2020-01-01', userId );

    INSERT INTO public.cidades(id, nome, ddd, estadoid, datacriacao, usercriacao)
	VALUES (6, 'Santa Helena', '45', 1, '2020-01-01', userId );

--Categoria
    INSERT INTO public.categorias(id, nome, datacriacao, usercriacao)
	VALUES (1, 'Ferramenta', '2020-01-01', userId);

    INSERT INTO public.categorias(id, nome, datacriacao, usercriacao)
	VALUES (2, 'Varejo', '2020-01-01', userId);

    INSERT INTO public.categorias(id, nome, datacriacao, usercriacao)
	VALUES (3, 'Celular', '2020-01-01', userId);

    INSERT INTO public.categorias(id, nome, datacriacao, usercriacao)
	VALUES (4, 'Computador', '2020-01-01', userId);

--Forma de Pagamento
    INSERT INTO public.formapagamentos(id, nome, datacriacao, usercriacao)
	VALUES (1, 'Dinheiro', '2020-01-01', userId);

    INSERT INTO public.formapagamentos(id, nome, datacriacao, usercriacao)
	VALUES (2, 'Cartão', '2020-01-01', userId);


--condicaopagamentos
    INSERT INTO public.condicaopagamentos(id, nome, juro, multa, desconto, datacriacao, usercriacao)
	VALUES (1, 'à vista', 0, 0, 0, '2020-01-01', userId);

        INSERT INTO public.condicaopagamentoparcelas(id, numerodias, percentual, condicaopagamentosid, formapagamentoid, datacriacao, usercriacao)
        VALUES (1, 0, 100, 1, 1, '2020-01-01', userId);


    INSERT INTO public.condicaopagamentos(id, nome, juro, multa, desconto, datacriacao, usercriacao)
	VALUES (2, '30/60/90', 0, 0, 0, '2020-01-01', userId);

        INSERT INTO public.condicaopagamentoparcelas(id, numerodias, percentual, condicaopagamentosid, formapagamentoid, datacriacao, usercriacao)
        VALUES (2, 30, 33.33, 2, 1, '2020-01-01', userId);

        INSERT INTO public.condicaopagamentoparcelas(id, numerodias, percentual, condicaopagamentosid, formapagamentoid, datacriacao, usercriacao)
        VALUES (3, 60, 33.33, 2, 1, '2020-01-01', userId);

        INSERT INTO public.condicaopagamentoparcelas(id, numerodias, percentual, condicaopagamentosid, formapagamentoid, datacriacao, usercriacao)
        VALUES (4, 90, 33.34, 2, 1, '2020-01-01', userId);



--Unidade de Medida

    INSERT INTO public.unidadesmedida(id, nome, datacriacao, usercriacao)
	VALUES ('un', 'Unidade', '2020-01-01', userId);

    INSERT INTO public.unidadesmedida(id, nome, datacriacao, usercriacao)
	VALUES ('m', 'Metro', '2020-01-01', userId);

END $$;