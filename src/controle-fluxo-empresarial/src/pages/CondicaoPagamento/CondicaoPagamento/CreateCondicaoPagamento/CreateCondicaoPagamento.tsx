import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { Input, InputNumber } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';
import { CondicaoPagamento } from '../../../../models/CondicaoPagamento/CondicaoPagamento';
import { UpdateCondicaoPagamento, SaveCondicaoPagamento, GetCondicaoPagamentoById } from '../../../../apis/CondicaoPagamento/CondicaoPagamento';
import { CondicaoPagamentoSchema, CondicaoPagamentoParcelaSchema } from './CondicaoPagamentoSchema';
import EditableTable, { ColumnEditableProps, TypeAttribute } from '../../../../components/EditableTable/EditableTable';
import SelectModel from '../../../../components/SelectModel/SelectModelOne';
import { GetFormaPagamentoById } from '../../../../apis/CondicaoPagamento/FormaPagamento';
import { FormaPagamento } from '../../../../models/CondicaoPagamento/FormaPagamento';
import { CondicaoPagamentoParcela } from '../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';

const CreateCondicaoPagamento: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [condicaopagamento, setCondicaoPagamento] = useState<CondicaoPagamento>({
        nome: "",
        juro: 0,
        multa: 0,
        desconto: 0,
        parcela: [

        ]
    })

    const columns: ColumnEditableProps<CondicaoPagamento>[] = [
        { dataIndex: "id", title: "id" },
        { dataIndex: "numeroDias", title: "Número de Dias", editable: true, type: TypeAttribute.number },
        { dataIndex: "percentual", title: "Percentual", editable: true, type: TypeAttribute.number },
        {
            dataIndex: "formaPagamento", title: "Forma de Pagamento", editable: true,
            render: (text: FormaPagamento) => {
                return text?.nome;
            },
            renderEditable:
                () => {
                    return <SelectModel
                        fetchMethod={GetFormaPagamentoById}
                        name="formaPagamento.id"
                        ObjectName="formaPagamento"
                        keyDescription="nome"
                        required={true}
                        showLabel={false}
                        label={{ title: "Seleção de Forma de Pagamento", label: "" }}
                        errorMessage={{ noSelection: "Selecione uma Forma de Pagamento!" }}
                        path="forma-pagamento" />
                },
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

            props.history.push("/condicao-pagamento")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome", "parcela"]);
        }
    }

    async function getCondicaoPagamento(id: number) {
        if (!id) {
            return;
        }

        try {
            setLoading(true);
            let bdestado = await GetCondicaoPagamentoById(id);
            setCondicaoPagamento({ ...condicaopagamento, ...bdestado.data });

        } finally {
            setLoading(false);
        }

    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/condicao-pagamento"
            breadcrumbList={[{ displayName: "Condição de Pagamento", URL: "/condicao-pagamento" }, { displayName: "Nova Condição de Pagamento", URL: undefined }]}
            initialValues={condicaopagamento}
            validationSchema={CondicaoPagamentoSchema}
            onSubmit={onSubmit}
        >
            {(formik) => (
                <>
                    <Row>
                        <Col span={2}>
                            <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                        </Col>
                        <Col span={13}>
                            <Input name="nome" label="Condição de Pagamento" placeholder="30/60/90" required />
                        </Col>
                        <Col span={3}>
                            <InputNumber name="multa" label="Multa" placeholder="0" required />
                        </Col>
                        <Col span={3}>
                            <InputNumber name="juro" label="Juro" placeholder="0" required />
                        </Col>
                        <Col span={3}>
                            <InputNumber name="desconto" label="Desconto" placeholder="0" required />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Divider>Parcelas</Divider>
                            <EditableTable columns={columns}
                                initiallValues={{
                                    numeroDias: undefined,
                                    percentual: Math.round((100 - ((formik.values.parcela as CondicaoPagamentoParcela[]) ?? []).reduce((e, a) => e + a.percentual, 0)) * 100) / 100,
                                    formaPagamento: undefined
                                }}
                                name="parcela"
                                validationSchema={CondicaoPagamentoParcelaSchema}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </CrudFormLayout>
    );

}

export default CreateCondicaoPagamento;
