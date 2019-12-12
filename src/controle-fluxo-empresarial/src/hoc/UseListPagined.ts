import React, { useState, useEffect } from 'react';
import { TableProps } from '../components/ListForm/ListForm';
import { AxiosResponse } from 'axios'
import api from './../apis/Api';


export interface Props {
    URL: string,
    valuesFilter?: any;
}

export interface RequestResult {
    requestResult: TableProps<any>,
    isLoading: boolean;
    filterRequest: PaginationQuery;
    setFilterRequest: (values: PaginationQuery) => void
}

export interface PaginationQuery {
    pageSize: number;
    currentPage: number;
    filter?: string
}

export function UseListPagined(props: Props): RequestResult {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filterRequest, setFilterRequest] = useState<PaginationQuery>({ pageSize: 10, currentPage: 1 })
    const [responseBack, setResponseBack] = useState<TableProps<any>>(
        {
            current: 0,
            pageSize: 0,
            total: 0,
            dataSource: []
        }
    );

    function getDataBack() {
        api.post(props.URL, { ...filterRequest, ...props.valuesFilter })
            .then(response => {
                setResponseBack({
                    current: response.data.currentPage,
                    pageSize: response.data.pageSize,
                    total: response.data.totalItem,
                    dataSource: response.data.result
                });
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        setIsLoading(true);
        getDataBack();
        console.error("Fui por back")
    }, [props.URL, filterRequest, props.valuesFilter])





    //   useEffect(() => {
    //     function handleStatusChange(status) {
    //       setIsOnline(status.isOnline);
    //     }

    //     ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    //     return () => {
    //       ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    //     };
    //   });

    let result = {
        requestResult: responseBack,
        isLoading,
        filterRequest,
        setFilterRequest
    };
    return result;
}