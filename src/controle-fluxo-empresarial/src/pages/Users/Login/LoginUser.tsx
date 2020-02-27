import React, { } from 'react';
import { Form, Icon, Button, Card, Row, Col } from 'antd';
import { Input, FormItem } from "formik-antd"
import "./LoginUserStyle.less"
import { Formik, FormikHelpers } from 'formik';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { LoginUserSchema } from './LoginUserSchema';
import { tryLoginUser } from '../../../apis/Users/UserApi';
import { message } from 'antd';
import { login, getUserName } from '../../../services/Authenticate';
import { errorBack } from '../../../utils/MessageApi';

const LoginUser: React.FC<RouteComponentProps> = (props) => {

    const history = props.history;
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let redirectUrl = params.get('redirectUrl');

    async function handleSubmit(values: any, formikHelpers: FormikHelpers<any>) {

        try {

            let response = await tryLoginUser(values);
            login(response.data);
            message.success(`Bem vindo ${getUserName()}!!!`);
            history.push(redirectUrl || "/");

        } catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{ userName: "", password: "" }}
            validationSchema={LoginUserSchema}
            enableReinitialize={true}>
            {({ submitForm }) => (
                <Row type="flex" justify="space-around" align="middle" style={{ height: "100%" }}>
                    <Col xs={24} sm={20} md={15} lg={12} xl={6} xxl={6}>
                        <Card title="Credenciais do sistema" className="ant-card-ant-card-bordered">
                            <Form className="login-form">

                                <FormItem name="userName" required={true} className="form-custom-item-form" >
                                    <Input
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="on"
                                        name="userName"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Usuario"
                                    />
                                </FormItem>

                                <FormItem name="password" required={true} className="form-custom-item-form">
                                    <Input
                                        tabIndex={2}
                                        name="password"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Senha"
                                    />
                                </FormItem>

                                <Form.Item className="forget-password-item-form">
                                    <Link to="forget-password" className="login-form-forgot" > Esqueci a senha</Link>
                                </Form.Item>

                                <Form.Item className="form-custom-item-footer">
                                    <Button type="primary"
                                        htmlType="submit"
                                        onClick={() => submitForm()}
                                        style={{ width: "100%" }}
                                        tabIndex={2}
                                    >
                                        Logar
                                        </Button>
                                </Form.Item>

                            </Form>
                        </Card>
                    </Col>
                </Row>
            )}
        </Formik>
    );
}

export default withRouter(LoginUser);