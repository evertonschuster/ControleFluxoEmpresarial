import React, { useState, useEffect } from 'react'
import { ContaReceberApi } from '../../../../apis/Movimentos/ContaReceberApi';
import { ContaReceberSchema } from './ContaReceberSchema';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import ActionForm from './componets/ActionForm';
import ConfirmPassword from './componets/ConfirmPassword';
import ContaReceber from '../../../../models/Movimentos/ContaReceber';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './componets/GeralForm';


export enum FromContaReceberType {
    Receber,
    Cancelar,
    Ativar,
    Editar,
    Novo,
    VerCancelada,
    VerPaga,
    CancelarBaixa
}

export interface FormContaReceberMode {
    formType: FromContaReceberType
}

const FormContaReceber: React.FC = () => {

    const [ContaReceber, setContaReceber] = useState<ContaReceber>({
        numero: null,
        multa: null,
        dataEmissao: null,
        dataVencimento: null,
        desconto: null,
        formaPagamento: null,
        formaPagamentoId: null,
        cliente: null,
        clienteId: null,
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
    const { modelo, serie, numero, parcela } = useParams<{ modelo: string | undefined, serie: string | undefined, numero: string | undefined, parcela: string | undefined }>()
    const { state } = useLocation<FormContaReceberMode>();
    const formType = state?.formType ?? FromContaReceberType.Novo;
    useEffect(() => {
        getContaReceber(modelo!, serie!, numero!, parcela!);
    }, [modelo, serie, numero, parcela])


    async function onSubmit(conta: ContaReceber, formikHelpers: FormikHelpers<ContaReceber>) {

        try {
            if (formType === FromContaReceberType.Receber) {
                await ContaReceberApi.Receber(conta);
            }
            else if (formType === FromContaReceberType.Ativar) {
                await ContaReceberApi.Ativar(conta);
            }
            else if (modelo) {
                await ContaReceberApi.Update(conta);
            } else {
                await ContaReceberApi.Save(conta);
            }
            history.push("/contas-receber")
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

    async function getContaReceber(modelo: string, serie: string, numero: string, parcela: string) {
        try {
            if (!modelo) {
                return;
            }

            setLoading(true);
            let bdpais = await ContaReceberApi.GetById(modelo, serie, numero, parcela);

            if (formType === FromContaReceberType.Receber) {
                bdpais.data.dataBaixa = new Date();
                bdpais.data.dataPagamento = new Date();
            }

            setContaReceber(bdpais.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }


    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/contas-receber"
            breadcrumbList={[{ displayName: "Conta a Receber", URL: "/contas-receber" }, { displayName: modelo ? "Edição de Conta a Receber" : "Nova Conta a Receber", URL: undefined }]}
            initialValues={ContaReceber}
            validationSchema={ContaReceberSchema}
            renderFooter={() => <ActionForm />}
            onSubmit={onSubmit}
        >
            <GeralForm />
            <ConfirmPassword
                showModal={showModal}
                setShowModal={setShowModal}
                conta={ContaReceber}
                errors={errors} />

        </CrudFormLayout>
    )
}

export default FormContaReceber
