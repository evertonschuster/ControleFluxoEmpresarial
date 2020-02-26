import React, { memo } from 'react';
import { Button } from 'antd';

export interface Props {
    onNewRow: () => void;
}

const EditableRowFooter: React.FC<Props> = (props) => {

    return (
        <div className="footer-action-editable-table">
            <Button type="primary" icon="plus-circle" onClick={() => props.onNewRow()}>Adicionar</Button>
        </div>
    )
}

export default memo(EditableRowFooter);
