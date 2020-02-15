import React from 'react';
import { Layout } from 'antd';

const ContentApp: React.FC = (props) => {

    const { Content } = Layout;

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
                overflow: "hidden"
            }}>


            {props.children}

        </Content>
    );
}

export default ContentApp;
