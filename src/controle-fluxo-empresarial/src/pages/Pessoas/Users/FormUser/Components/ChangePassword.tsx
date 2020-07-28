import React, { useState } from 'react';
import { errorBack } from '../../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { Input } from '../../../../../components/WithFormItem/withFormItem';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { UserApi } from '../../../../../apis/Pessoas/UserApi';
import { UserChangePasswor } from '../UserSchema';
import CrudFormLayout from '../../../../../layouts/CrudFormLayout/CrudFormLayout';
import UserChangePasswordModel from '../../../../../models/Pessoas/UserChangePasswordModel';

const ChangePassword: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [loading, setLoading] = useState(false)

    async function onSubmit(values: UserChangePasswordModel, formikHelpers: FormikHelpers<any>) {


        try {
            setLoading(true);
            await UserApi.ChangePasswordUser(values);
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
