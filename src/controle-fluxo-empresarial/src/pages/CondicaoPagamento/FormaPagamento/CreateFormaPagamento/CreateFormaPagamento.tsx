import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import SelectModel from '../../../../components/SelectModel/SelectModelOne';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { FormaPagamento } from '../../../../models/CondicaoPagamento/FormaPagamento';
import { UpdateFormaPagamento, SaveFormaPagamento, GetFormaPagamentoById } from '../../../../apis/CondicaoPagamento/FormaPagamento';
import { FormaPagamentoSchema } from './FormaPagamentoSchema';

const CreateFormaPagamento: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [formapagamento, setFormaPagamento] = useState<FormaPagamento>({ nome: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getFormaPagamento(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: FormaPagamento, formikHelpers: FormikHelpers<any>) {

        try {

            if (props.match.params.id) {
                await UpdateFormaPagamento(values);
            } else {
                await SaveFormaPagamento(values);
            }

            props.history.push("/forma-pagamento")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getFormaPagamento(id: number) {
        if (!id) {
            return;
        }

        setLoading(true);
        let bdestado = await GetFormaPagamentoById(id);
        setFormaPagamento(bdestado.data);
        setLoading(false);
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/forma-pagamento"
            breadcrumbList={[{ displayName: "Forma de Pagamento", URL: "/forma-pagamento" }, { displayName: "Nova Forma de Pagamento", URL: undefined }]}
            initialValues={formapagamento}
            validationSchema={FormaPagamentoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={4}>
                    <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                </Col>
                <Col span={12}>
                    <Input name="nome" label="Forma de Pagamento" placeholder="Dinheiro" required />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default CreateFormaPagamento;
