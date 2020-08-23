import React, { useState, useEffect, useContext } from 'react';
import { errorBack } from '../../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { Input } from '../../../../../components/WithFormItem/withFormItem';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { UserApi } from '../../../../../apis/Pessoas/UserApi';
import { UserSchema } from '../UserSchema';
import BasicLayoutContext, { FormMode } from '../../../../../layouts/BasicLayout/BasicLayoutContext';
import CrudFormLayout from '../../../../../layouts/CrudFormLayout/CrudFormLayout';
import UserModel from '../../../../../models/Pessoas/UserModel';

const RegisterUserGeneral: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [userModel, setUserModel] = useState<UserModel>({ userName: "", email: "", phoneNumber: "", password: "", confirmPassword: "" })
    const [loading, setLoading] = useState(false);
    const { formMode } = useContext(BasicLayoutContext);

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id])

    async function getUser(id: string) {
        if (!id) {
            return;
        }

        try {
            setLoading(true);
            let bdUser = await UserApi.GetById(id);
            setUserModel(bdUser.data);
        }
        finally {
            setLoading(false);
        }
    }

    async function onSubmit(values: UserModel, formikHelpers: FormikHelpers<any>) {

        try {

            if (props.match.params.id) {
                await UserApi.Update(values);
            } else {
                await UserApi.Save(values);
            }
            props.history.push("/user")
        }
        
        catch (e) {
            errorBack(formikHelpers, e, ["passwordMismatch"]);

        }

    }

    return (

            <CrudFormLayout
                isLoading={loading}
                backPath="/user"
                breadcrumbList={[{ displayName: "Usuários", URL: "/user" }, { displayName: "Novo Usuario", URL: undefined }]}
                initialValues={userModel}
                validationSchema={UserSchema(formMode)}
                onSubmit={(onSubmit)}
            >

                <Row>
                    <Col span={2}>
                        <Input name="id" label="Código" placeholder="Codigo" readOnly />
                    </Col>
                    <Col span={12}>
                        <Input name="userName" label="Nome" placeholder="Nome" required />
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Input name="phoneNumber" label="Telefone" placeholder="(45) 9882932328" required />
                    </Col>
                    <Col span={12}>
                        <Input name="email" label="E-mail" placeholder="joao@gmai.com" required type="email" />
                    </Col>
                </Row>

                <Row hidden={!(formMode === FormMode.New)}>
                    <Col span={12}>
                        <Input name="password" label="Senha" required type="password" />
                    </Col>
                    <Col span={12}>
                        <Input name="confirmPassword" label="Confirmar Senha" required type="password" />
                    </Col>
                </Row>

            </CrudFormLayout>
    );

}

export default withRouter(RegisterUserGeneral);
