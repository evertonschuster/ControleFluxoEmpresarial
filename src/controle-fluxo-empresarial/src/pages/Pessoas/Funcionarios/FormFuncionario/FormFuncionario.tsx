import React, { useState, useEffect } from 'react';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { Funcionario } from '../../../../models/Pessoas/Funcionario';
import { FuncionarioApi } from '../../../../apis/Pessoas/FuncionarioApi';
import { FuncionarioSchema } from './FuncionarioSchema';
import { NATIONALITY_TYPE } from '../../../../components/NationalitySelect/NationalitySelect';
import { RouteComponentProps } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './components/GeralForm';

const FormFuncionario: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [funcionario, setFuncionario] = useState<Funcionario>({
        apelido: undefined,
        bairro: undefined,
        cep: undefined,
        cidadeId: undefined,
        cnh: undefined,
        complemento: undefined,
        cpfcpnj: undefined,
        dataAdmissao: undefined,
        dataDemissao: undefined,
        dataNascimento: undefined,
        dataValidadeCNH: undefined,
        email: undefined,
        endereco: undefined,
        estadoCivil: undefined,
        funcaoFuncionarioId: undefined,
        isBrasileiro: undefined,
        nacionalidade: NATIONALITY_TYPE.BRASILEIRO,
        nome: undefined,
        numero: undefined,
        observacao: undefined,
        rgInscricaoEstadual: undefined,
        salario: undefined,
        sexo: undefined,
        telefone: undefined,
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getFuncionario(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(Funcionario: Funcionario, formikHelpers: FormikHelpers<Funcionario>) {
        try {
            if (props.match.params.id) {
                await FuncionarioApi.Update(Funcionario);
            } else {
                await FuncionarioApi.Save(Funcionario);
            }
            props.history.push("/funcionario")
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    async function getFuncionario(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdFuncionario = await FuncionarioApi.GetById(id);
            setFuncionario(bdFuncionario.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/funcionario"
            breadcrumbList={[{ displayName: "Funcionários", URL: "/funcionario" }, { displayName: props.match.params.id ? "Edição do Funcionário" : "Novo Funcionário", URL: undefined }]}
            initialValues={funcionario}
            validationSchema={FuncionarioSchema}
            onSubmit={onSubmit}
        >
            <GeralForm />

        </CrudFormLayout>
    );

}

export default FormFuncionario;
