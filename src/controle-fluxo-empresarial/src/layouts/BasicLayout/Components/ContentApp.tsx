import React, { useState } from 'react';
import { Layout } from 'antd';

const ContentApp: React.FC = (props) => {

    const { Content } = Layout;
    const [] = useState<boolean>(false)

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
