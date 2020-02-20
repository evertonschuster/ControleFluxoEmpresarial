import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { CondicaoPagamento } from '../../../../models/CondicaoPagamento/CondicaoPagamento';
import { UpdateCondicaoPagamento, SaveCondicaoPagamento, GetCondicaoPagamentoById } from '../../../../apis/CondicaoPagamento/CondicaoPagamento';
import { CondicaoPagamentoSchema } from './CondicaoPagamentoSchema';
import EditableTable from '../../../../components/EditableTable/EditableTable';

const CreateCondicaoPagamento: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [condicaopagamento, setCondicaoPagamento] = useState<CondicaoPagamento>({ nome: "", juro: 0, multa: 0, desconto: 0, parcela: [] })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getCondicaoPagamento(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: CondicaoPagamento, formikHelpers: FormikHelpers<any>) {

        try {

            if (props.match.params.id) {
                await UpdateCondicaoPagamento(values);
            } else {
                await SaveCondicaoPagamento(values);
            }

            props.history.push("/forma-pagamento")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getCondicaoPagamento(id: number) {
        if (!id) {
            return;
        }

        setLoading(true);
        let bdestado = await GetCondicaoPagamentoById(id);
        setCondicaoPagamento(bdestado.data);
        setLoading(false);
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/forma-pagamento"
            breadcrumbList={[{ displayName: "Forma de Pagamento", URL: "/forma-pagamento" }, { displayName: "Nova Forma de Pagamento", URL: undefined }]}
            initialValues={condicaopagamento}
            validationSchema={CondicaoPagamentoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                </Col>
                <Col span={13}>
                    <Input name="nome" label="Forma de Pagamento" placeholder="Dinheiro" required />
                </Col>
                <Col span={3}>
                    <Input name="nome" label="Multa" placeholder="Dinheiro" required />
                </Col>
                <Col span={3}>
                    <Input name="nome" label="Juro" placeholder="Dinheiro" required />
                </Col>
                <Col span={3}>
                    <Input name="nome" label="Desconto" placeholder="Dinheiro" required />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <EditableTable columns={[
                        { dataIndex: "id", title: "id" },
                        { dataIndex: "nome", title: "nome", editable: true },
                        { dataIndex: "idade", title: "idade", editable: true }
                    ]}
                        initiallValues={{}}
                    />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}


export default CreateCondicaoPagamento;
