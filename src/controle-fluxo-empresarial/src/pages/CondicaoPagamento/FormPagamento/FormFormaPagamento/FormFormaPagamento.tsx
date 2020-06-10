import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { FormaPagamento } from '../../../../models/CondicaoPagamento/FormaPagamento';
import { FormaPagamentoSchema } from './FormaPagamentoSchema';
import { FormaPagamentoApi } from '../../../../apis/CondicaoPagamento/FormaPagamentoApi';

const FormFormaPagamento: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [formapagamento, setFormaPagamento] = useState<FormaPagamento>({ nome: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getFormaPagamento(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: FormaPagamento, formikHelpers: FormikHelpers<any>) {

        try {

            if (props.match.params.id) {
                await FormaPagamentoApi.Update(values);
            } else {
                await FormaPagamentoApi.Save(values);
            }

            props.history.push("/forma-pagamento")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getFormaPagamento(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdestado = await FormaPagamentoApi.GetById(id);
            setFormaPagamento(bdestado.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/forma-pagamento"
            breadcrumbList={[{ displayName: "Formas de Pagamento", URL: "/forma-pagamento" }, { displayName:props.match.params.id ? "Edição da Forma de Pagamento" : "Nova Forma de Pagamento", URL: undefined }]}
            initialValues={formapagamento}
            validationSchema={FormaPagamentoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={4}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>
                <Col span={12}>
                    <Input name="nome" label="Forma de Pagamento" placeholder="Dinheiro" required />
                </Col>
            </Row>


        </CrudFormLayout>
    );

}

export default FormFormaPagamento;
