import React, { useContext, useState } from 'react'
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import BasicLayoutContext, { FormMode } from '../../../../../layouts/BasicLayout/BasicLayoutContext';
import Button from 'antd/lib/button';
import CancelationForm from './CancelationForm';

const ActionForm: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const formik = useFormikContext<any>();
    const { formMode } = useContext(BasicLayoutContext);
    const formCancel = formMode === FormMode.CancelarEntity;

    return (
        <>
            <Button type="default" onClick={() => history.push("/contas-pagar")} style={{ marginRight: "10px" }}>Voltar</Button>
            {!formCancel && <Button type="primary" onClick={() => formik.submitForm()} >Salvar</Button>}
            {formCancel && <Button type="danger" onClick={() => { setShowModal(true) }} >Cancelar Conta a Pagar</Button>}
            <CancelationForm setShowModal={setShowModal} showModal={showModal} />
        </>
    )
}

export default ActionForm
