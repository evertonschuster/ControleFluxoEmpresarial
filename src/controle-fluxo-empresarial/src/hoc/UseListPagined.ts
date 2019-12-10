import React, { useState, useEffect } from 'react';
import { TableProps } from '../components/ListForm/ListForm';

export interface Props {
    URL: string,
    filter: string,
}


function UseListPagined(props: Props): TableProps<any> {
    const [isOnline, setIsOnline] = useState<TableProps<any>>(null);

    //   useEffect(() => {
    //     function handleStatusChange(status) {
    //       setIsOnline(status.isOnline);
    //     }

    //     ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    //     return () => {
    //       ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    //     };
    //   });

    return isOnline;
}