import { useState, useEffect } from 'react';
import { TableProps } from '../components/ListForm/ListForm';
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
    reflesh: () => void;

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
        setIsLoading(true);
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
        getDataBack();
        console.error("Fui pro back")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.URL, filterRequest, props.valuesFilter])


    let result = {
        requestResult: responseBack,
        isLoading,
        filterRequest,
        setFilterRequest,
        reflesh: getDataBack
    };
    return result;
}