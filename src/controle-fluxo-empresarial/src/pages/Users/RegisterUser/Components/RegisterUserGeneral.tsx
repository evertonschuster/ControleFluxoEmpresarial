import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Row, Col, Menu, Icon } from 'antd';
import UserModel from '../../../../models/Users/UserModel';
import { Input } from '../../../../components/WithFormItem/withFormItem';
import { GetUserById, UpdateUser, SaveUser } from '../../../../apis/Users/UserApi';
import BasicLayoutContext, { FormMode } from '../../../../layouts/BasicLayout/BasicLayoutContext';
import { UserSchema } from './../UserSchema';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../../utils/MessageApi';

const RegisterUserGeneral: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [userModel, setUserModel] = useState<UserModel>({ userName: "", email: "", phoneNumber: "", password: "", confirmPassword: "" })
    const [loading, setLoading] = useState(false);
    const { formMode } = useContext(BasicLayoutContext);

    useEffect(() => {
        getUser(props.match.params.id);
    }, [])

    async function getUser(id: number) {
        if (!id) {
            return;
        }

        try {
            setLoading(true);
            let bdestado = await GetUserById(id);
            setUserModel(bdestado.data);
        }
        finally {
            setLoading(false);
        }
    }

    async function onSubmit(values: UserModel, formikHelpers: FormikHelpers<any>) {

        try {

            if (props.match.params.id) {
                await UpdateUser(values);
            } else {
                await SaveUser(values);
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
                    <Col span={12}>
                        <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
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

                <Row hidden={!(formMode == FormMode.New)}>
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
