import React, { useState, useEffect } from 'react'
import { ContaPagarApi } from '../../../../apis/Movimentos/ContaPagarApi';
import { ContaPagarSchema } from './ContaPagarSchema';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import ActionForm from './componets/ActionForm';
import ContaPagar from '../../../../models/Movimentos/ContaPagar';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './componets/GeralForm';
import { message, Modal } from 'antd';
import { idText } from 'typescript';
import ConfirmPassword from './componets/ConfirmPassword';
import ReactDOM from 'react-dom';


export enum FromContaPagarType {
    Pagar,
    Cancelar,
    Ativar,
    Editar,
    Novo,
    VerCancelada,
    VerPaga,
    CancelarBaixa
}

export interface FormContaPagarMode {
    formType: FromContaPagarType
}

const FromContaPagar: React.FC = () => {

    const [contaPagar, setContaPagar] = useState<ContaPagar>({
        numero: null,
        multa: null,
        dataEmissao: null,
        dataVencimento: null,
        desconto: null,
        formaPagamento: null,
        formaPagamentoId: null,
        fornecedor: null,
        fornecedorId: null,
        juro: null,
        modelo: "55",
        parcela: 1,
        serie: "1",
        valor: null,
        dataPagamento: null,
        descricao: null,
        dataBaixa: null,
    })

    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { modelo, serie, numero, fornecedorId, parcela } = useParams<{ modelo: string | undefined, serie: string | undefined, numero: string | undefined, fornecedorId: string | undefined, parcela: string | undefined }>()
    const { state } = useLocation<FormContaPagarMode>();
    const formType = state?.formType ?? FromContaPagarType.Novo;
    useEffect(() => {
        getContaPagar(modelo!, serie!, numero!, fornecedorId!, parcela!);
    }, [modelo, serie, numero, fornecedorId, parcela])


    async function onSubmit(conta: ContaPagar, formikHelpers: FormikHelpers<ContaPagar>) {

        try {
            if (formType === FromContaPagarType.Pagar) {
                await ContaPagarApi.Pagar(conta);
            }
            else if (formType === FromContaPagarType.Ativar) {
                await ContaPagarApi.Ativar(conta);
            }
            else if (modelo) {
                await ContaPagarApi.Update(conta);
            } else {
                await ContaPagarApi.Save(conta);
            }
            history.push("/contas-pagar")
        }
        catch (e) {
            errorBack(formikHelpers, e);


            if (e.code != 428) {
                return;
            }

            setShowModal(true);
            setErrors(e.errors)
        }
    }

    async function getContaPagar(modelo: string, serie: string, numero: string, fornecedorId: string, parcela: string) {
        try {
            if (!modelo) {
                return;
            }

            setLoading(true);
            let bdpais = await ContaPagarApi.GetById(modelo, serie, numero, fornecedorId, parcela);

            if (formType === FromContaPagarType.Pagar) {
                bdpais.data.dataBaixa = new Date();
                bdpais.data.dataPagamento = new Date();
            }

            setContaPagar(bdpais.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }


    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/contas-pagar"
            breadcrumbList={[{ displayName: "Conta a Pagar", URL: "/contas-pagar" }, { displayName: modelo ? "Edição de Conta a Pagar" : "Nova Conta a Pagar", URL: undefined }]}
            initialValues={contaPagar}
            validationSchema={ContaPagarSchema}
            renderFooter={() => <ActionForm />}
            onSubmit={onSubmit}
        >
            <GeralForm />
            <ConfirmPassword
                showModal={showModal}
                setShowModal={setShowModal}
                conta={contaPagar}
                errors={errors} />

        </CrudFormLayout>
    )
}

export default FromContaPagar
