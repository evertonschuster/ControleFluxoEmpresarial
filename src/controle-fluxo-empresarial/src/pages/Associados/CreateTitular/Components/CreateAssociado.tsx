import React, {  } from 'react';
import { Row, Col, Modal } from 'antd';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Input, DatePicker } from '../../../../components/WithFormItem/withFormItem';
import { Associado } from '../../../../models/Associados/Associado';
import { AssociadoSchema } from '../TitularSchema';

export interface Porps {
    showModal: boolean,
    onCancel: () => void;
    onSave: (item: Associado) => void;
}

const CreateAssociado: React.FC<Porps> = (props) => {

    const { showModal, onSave, onCancel } = props;
    const associadoDefault: Associado = {
        nome: "",
        rg: "",
        telefone: "",
    };

    function onSaveForm(values: Associado, formikHelpers: FormikHelpers<Associado>) {
        onSave(values);
        formikHelpers.resetForm();
    }

    function onCancelForm(props: FormikProps<Associado>) {
        props.resetForm();
        onCancel();
    }

    return (
        <Formik
            initialValues={associadoDefault}
            enableReinitialize={true}
            validationSchema={AssociadoSchema}
            onSubmit={onSaveForm}>
            {props => (
                <Modal
                    title="Cadastro de Dependente"
                    width={800}
                    visible={showModal}
                    destroyOnClose={true}

                    okText="Salvar"
                    onOk={props.submitForm}

                    onCancel={() => onCancelForm(props)}
                >
                    <form onSubmit={props.handleSubmit}>
                        <Row>
                            <Col span={4}>
                                <Input name="id" label="Id" readOnly />
                            </Col>
                            <Col span={20}>
                                <Input name="nome" label="Nome" placeholder="João" required />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <Input name="rg" label="Rg" placeholder="0.000.000.0" required />
                            </Col>
                            <Col span={8}>
                                <Input name="telefone" label="Telefone" placeholder="(45)988293328" />
                            </Col>
                            <Col span={8}>
                                <DatePicker name="dataNascimento" label="Data de Nascimento" placeholder="10/10/2010" />
                            </Col>
                        </Row>
                    </form>
                </Modal >
            )}
        </Formik >
    );

}

export default CreateAssociado;
