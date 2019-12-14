import React, { useContext, memo, useState, useEffect } from 'react';
import { Table } from 'antd';
import { Props } from '../ListForm';


const ListFormTable: React.FC<Props<any>> = (props) => {


    return (

        <Table
            pagination={{
                current: props.tableProps.requestResult.current,
                pageSize: props.tableProps.requestResult.pageSize,
                total: props.tableProps.requestResult.total,
                onChange: onChangePagination
            }}
            loading={props.tableProps.isLoading}
            rowSelection={isSelectMode ? rowSelection : undefined}
            onRow={(record: any, index: number) => { return { onClick: (arg: React.MouseEvent) => { onClick(record) } } }}
            columns={columns}
            dataSource={props.tableProps.requestResult.dataSource}
            bordered={true}
            rowKey={(record: any) => record[key]}
            // scroll={{ y: 3000 }}
            useFixedHeader={true}>

        </Table>

    );

}

export default (memo(ListFormTable));
