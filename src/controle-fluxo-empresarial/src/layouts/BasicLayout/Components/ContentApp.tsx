import React from 'react';
import { Layout } from 'antd';

const ContentApp: React.FC = (props) => {

    const { Content } = Layout;

    return (
        <div style={{
            display: "flex",
            flex: "1",
            alignItems: "stretch",
            flexWrap: "wrap",
        }}>

            {props.children}

        </div>
    );
}

export default ContentApp;
