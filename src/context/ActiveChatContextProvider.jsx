import React, { useState } from 'react'
import ActiveChatContext from './ActiveChatContext'
const ActiveChatContextProvider =(props)=> {

    // setting default values
    const [activeChatUser, setActiveChatUser] = useState(null)

    const updateActiveChatUser = (user)=>{
        setActiveChatUser(user);
    }
    
    return (
        <>
            <ActiveChatContext.Provider value={{activeChatUser, updateActiveChatUser}}>                
                {props.children}
            </ActiveChatContext.Provider>   
        </>

    )
}

export default ActiveChatContextProvider