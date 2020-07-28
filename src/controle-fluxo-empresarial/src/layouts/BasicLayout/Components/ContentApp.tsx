import React from 'react';

const ContentApp: React.FC = (props) => {

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
