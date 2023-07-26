import React, { useState } from 'react'

import MessageTransaction from "./MessageTransaction"

export const MessageTransactionProvider = (props) => {

    const [lastMessage, setLastMessage] = useState([]);

    const updateLastMessage =(myLastMessage)=>{
        setLastMessage(myLastMessage);
    }


    return (
        <>
            <MessageTransaction.Provider value={{lastMessage, updateLastMessage}}>
                {props.children}
            </MessageTransaction.Provider>
        </>
    )
}
