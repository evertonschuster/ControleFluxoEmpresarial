import React from 'react';
import { Layout, Avatar, Row, Col, Badge, Breadcrumb, Icon } from 'antd';
import { BreadcrumbProp } from '../BasicLayout';
import { Link } from 'react-router-dom';

export interface Props {
    breadcrumbList?: BreadcrumbProp[]
}

const HeaderApp: React.FC<Props> = (props) => {

    const { Header } = Layout;

    return (
        <Header style={{ background: '#fff', padding: 0 }}>

            <Row type="flex" align="middle" gutter={20} >
                <Col span={18} className="gutter-row">
                    <Breadcrumb style={{ paddingLeft: "10px" }}>
                        <Breadcrumb.Item key={-1}>
                            <Link to="/">Inicial</Link>
                        </Breadcrumb.Item>
                        {
                            (props.breadcrumbList || []).map((e, index) =>
                                <Breadcrumb.Item key={index}>
                                    {e.URL == undefined ? e.displayName : <Link to={e.URL}>{e.displayName}</Link>}
                                </Breadcrumb.Item>)
                        }

                    </Breadcrumb>
                </Col>

                <Col span={6} >
                    <Row type="flex" justify="end" gutter={20} style={{ paddingRight: "30px" }}>
                        <Col>
                            <Icon type="loading" />
                        </Col>
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


export default React.memo(HeaderApp);
