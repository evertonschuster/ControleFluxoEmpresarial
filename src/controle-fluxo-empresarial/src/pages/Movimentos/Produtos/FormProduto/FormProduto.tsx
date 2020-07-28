import React, { useState, useEffect } from 'react'
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { Modal } from 'antd';
import { Produto } from '../../../../models/Movimentos/Produto';
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi';
import { ProdutoSchema } from './ProdutoSchema';
import { RouteComponentProps } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import FormGeneral from './components/FormGeneral';

const FormProduto: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {
    const [produto, setProduto] = useState<Produto>({
        nome: undefined,
        categoriaId: undefined,
        quantidade: undefined,
        quantidadeMinima: undefined,
        valorCompra: undefined,
        valorVenda: undefined,
        taxa: undefined,
        unidadeMedidaId: undefined,
        codigoBarras: undefined,
        referencia: undefined,
        marcaId: undefined,
        descricao: undefined,
        observacao: undefined
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProduto(props.match.params.id);
    }, [props.match.params.id])

    async function onSubmitConfirm(produto: Produto, formikHelpers: FormikHelpers<Produto>) {

        if (produto.valorCompra && produto.valorVenda && (produto.valorCompra <= produto.valorVenda)) {
            await onSubmit(produto, formikHelpers);

            return;
        }

        Modal.confirm({
            title: "Valor de Venda inconsistente",
            content: "O Valor de Venda é inferior ao valor de compra",
            onOk: () => onSubmit(produto, formikHelpers)
        })
    }

    async function onSubmit(produto: Produto, formikHelpers: FormikHelpers<Produto>) {
        try {

            if (props.match.params.id) {
                await ProdutoApi.Update(produto);
            } else {
                await ProdutoApi.Save(produto);
            }

            props.history.push("/produto")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getProduto(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdProduto = await ProdutoApi.GetById(id);

            let valorVenda = bdProduto.data.valorVenda ?? 0;
            let valorCompra = bdProduto.data.valorCompra ?? 0;
            setProduto({ ...bdProduto.data, taxa: (valorVenda - valorCompra) / (valorCompra) * 100 });
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/produto"
            breadcrumbList={[{ displayName: "Produtos", URL: "/produto" }, { displayName: props.match.params.id ? "Edição do Produto" : "Novo Produto", URL: undefined }]}
            initialValues={produto}
            validationSchema={ProdutoSchema}
            onSubmit={onSubmitConfirm}
        >

            <FormGeneral />

        </CrudFormLayout>)
}

export default FormProduto
