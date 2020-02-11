import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Row, Col, notification } from 'antd';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { ChangePasswordUser } from '../../../../apis/Users/UserApi';
import { FormikHelpers } from 'formik';
import UserChangePasswordModel from '../../../../models/Users/UserChangePasswordModel';
import { ErrorMessage } from '../../../../helpers/ErrorMessageForm';
import { errorBack } from '../../../../utils/MessageApi';
import { UserChangePasswor } from '../UserSchema';

const ChangePassword: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [loading, setLoading] = useState(false)

    async function onSubmit(values: UserChangePasswordModel, formikHelpers: FormikHelpers<any>) {


        try {
            setLoading(true);
            await ChangePasswordUser(values);
            props.history.push("/user")
        }
        catch (e) {
            errorBack(formikHelpers, e, ["passwordMismatch"]);
        }
        finally {
            setLoading(false);
        }

    }

    return (

        <CrudFormLayout
            isLoading={loading}
            initialErrors={{ password: "Senha deve conter no minimo 6 caracteres." }}
            backPath="/user"
            breadcrumbList={[{ displayName: "Usuários", URL: "/user" }, { displayName: "Novo Usuario", URL: undefined }]}
            initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "", password: "" }}
            validationSchema={UserChangePasswor}
            onSubmit={(onSubmit)}
        >

            <Row >
                <Col span={12}>
                    <Input name="currentPassword" label="Senha Atual" required type="password" />
                </Col>
            </Row>

            <Row >
                <Col span={12}>
                    <Input name="newPassword" label="Nova Senha" required type="password" />
                </Col>
            </Row>
            <Row >
                <Col span={12}>
                    <Input name="confirmPassword" label="Confirmar Senha" required type="password" />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default withRouter(ChangePassword);
