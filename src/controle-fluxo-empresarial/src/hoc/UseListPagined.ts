import { useState, useEffect } from 'react';
import { TableProps } from '../components/ListForm/ListForm';
import { PaginationQuery, PaginationResult, SITUACAO } from '../models/BaseEntity';
import { AxiosResponse } from 'axios';


export interface Props<TEntity> {
    getListPagined: (filter: PaginationQuery) => Promise<AxiosResponse<PaginationResult<TEntity>>>,
    valuesFilter?: any;
}

export interface RequestResult {
    requestResult: TableProps<any>,
    isLoading: boolean;
    filterRequest: PaginationQuery;
    setFilterRequest: (values: PaginationQuery) => void
    reflesh: () => void;

}

export function UseListPagined(props: Props<any>): RequestResult {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filterRequest, setFilterRequest] = useState<PaginationQuery>({ pageSize: 10, currentPage: 1, situacao: SITUACAO.HABILITADO })
    const [responseBack, setResponseBack] = useState<TableProps<any>>(
        {
            current: 0,
            pageSize: 0,
            total: 0,
            dataSource: []
        }
    );

    async function getDataBack() {
        setIsLoading(true);

        try {
            let response = await props.getListPagined(filterRequest);
            setResponseBack({
                current: response.data.currentPage,
                pageSize: response.data.pageSize,
                total: response.data.totalItem,
                dataSource: response.data.result
            });
        }
        finally {

            setIsLoading(false)
        }
    }

    useEffect(() => {
        getDataBack();
        // console.error("Fui pro back")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterRequest, props.valuesFilter])


    let result = {
        requestResult: responseBack,
        isLoading,
        filterRequest,
        setFilterRequest,
        reflesh: getDataBack
    };
    return result;
}