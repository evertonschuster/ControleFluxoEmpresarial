import React, { memo } from 'react';
import { Layout, Breadcrumb, Avatar, Row, Col, Badge } from 'antd';
import { Link } from "react-router-dom";
import { BreadcrumbProp } from '../FormLayout';

export interface Props {
    breadcrumbList?: BreadcrumbProp[]
}

const HeaderApp: React.FC = () => {

    const { Header } = Layout;

    console.log("Me Chamaraaaaaaaa")

    return (
        <Header style={{ background: '#fff', padding: 0 }}>

            <Row type="flex" align="middle" gutter={20} >
                <Col span={18} className="gutter-row">
                    {/* <Breadcrumb style={{ paddingLeft: "10px" }}>
                        {
                            (props.breadcrumbList || []).map((e, index) => <Breadcrumb.Item key={index}>
                                <Link to={e.URL}>{e.displayName}</Link>
                            </Breadcrumb.Item>)
                        }

                    </Breadcrumb> */}
                </Col>

                <Col span={6} >
                    <Row type="flex" justify="end" gutter={20} style={{ paddingRight: "30px" }}>
                        <Col>
                            <Badge count={1}>
                                <Avatar size="large" icon="user" />
                            </Badge>
                        </Col>
                        <Col>
                            Everton
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Header>
    );
}

function arePropsEqual(prevProps: any, nextProps: any) {

    console.log("ME chamar")
    return false;
}

export default memo(HeaderApp, arePropsEqual);
