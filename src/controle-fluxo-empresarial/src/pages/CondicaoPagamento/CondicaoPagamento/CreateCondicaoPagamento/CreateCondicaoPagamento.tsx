import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { CondicaoPagamento } from '../../../../models/CondicaoPagamento/CondicaoPagamento';
import { UpdateCondicaoPagamento, SaveCondicaoPagamento, GetCondicaoPagamentoById } from '../../../../apis/CondicaoPagamento/CondicaoPagamento';
import { CondicaoPagamentoSchema, CondicaoPagamentoParcelaSchema } from './CondicaoPagamentoSchema';
import EditableTable from '../../../../components/EditableTable/EditableTable';
import SelectModel from '../../../../components/SelectModel/SelectModelOne';
import { GetEstadoById } from '../../../../apis/Cidades/EstadoApi';

const CreateCondicaoPagamento: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [condicaopagamento, setCondicaoPagamento] = useState<CondicaoPagamento>({
        nome: "",
        juro: 0,
        multa: 0,
        desconto: 0,
        parcela: [
            {
                id: 1,
                numeroDias: 10,
                porcentual: 10,
                formaPagamento: null
            },
            {
                id: 2,
                numeroDias: 20,
                porcentual: 20,
                formaPagamento: null
            },
            {
                id: 3,
                numeroDias: 30,
                porcentual: 30,
                formaPagamento: null
            },
            {
                id: 4,
                numeroDias: 40,
                porcentual: 40,
                formaPagamento: null
            },
        ]
    })

    const columns = [
        { dataIndex: "id", title: "id" },
        { dataIndex: "numeroDias", title: "numeroDias", editable: true },
        { dataIndex: "porcentual", title: "porcentual", editable: true },
        {
            dataIndex: "formaPagamento", title: "formaPagamento", editable: true, renderEditable:
                (text: any, record: any, index: number) => {
                    console.log("Renderizei", text, record)

                    return <SelectModel
                        fetchMethod={GetEstadoById}
                        name="formaPagamento"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Estado", label: "Estado" }}
                        errorMessage={{ noSelection: "Selecione ao menos um Estado!" }}
                        path="estado" />
                }
        }
    ];
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
                    <Divider>Parcelas</Divider>
                    <EditableTable columns={columns}
                        initiallValues={{
                            numeroDias: 20,
                            porcentual: 20,
                            formaPagamento: 0
                        }}
                        name="parcela"
                        validationSchema={CondicaoPagamentoParcelaSchema}
                    />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default CreateCondicaoPagamento;
