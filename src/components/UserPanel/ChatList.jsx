import React, { useContext, useEffect, useState } from 'react'

import { getChatStarted } from '../../services/messageServices'
import { getLoggedUser } from '../../services/auth'
import ActiveChatContext from '../../context/ActiveChatContext'
import { BASE_URL_IMAGE } from '../../services/Util'
import { getUserById } from '../../services/userServices'
import MessageTransaction from '../../context/MessageTransaction'

export default function ChatList() {

    const [chatList, setChatList] = useState([])
    const activeChatUser = useContext(ActiveChatContext)
    const messageTransaction = useContext(MessageTransaction);


    useEffect(() => {
        getChatStarted()
            .then((data) => {
                setChatList(data);
            })
            .catch((err) => {
                console.log(err)
            })
    },[messageTransaction, activeChatUser])


    useEffect(() => {
        let getUserIdWhoSendedMsg = 0;
        try {
            if (messageTransaction.lastMessage.sender) {
                getUserIdWhoSendedMsg = messageTransaction.lastMessage.sender.id;

                // Find the element with id "USER_ID_**"
                const elementWithId = document.getElementById('USER_ID_' + getUserIdWhoSendedMsg);
                if (elementWithId) {
                    // Add the class "active" to the element
                    elementWithId.classList.add('active');
                }
            }

        } catch (err) {

        }

    }, [messageTransaction])



    const changeChatUser = (userId) => {
        getUserById(userId)
            .then((data) => {
                activeChatUser.updateActiveChatUser(data);
            })
            .catch((err) => console.log(err))
    }



    const removeListActive = (id) => {
        document.getElementById(id).classList.remove("active")
    }


    return (
        <ul className="chat-list">
            {/* <!-- chat item --> */}

            {chatList.length === 0 && <><p style={{ position: 'absolute', top: "50%", transform: "translate(0, -50%)" }}>No conversation Started!! <br></br>Start Conversation withsomone</p></>}

            {chatList.map((chatItem) => {
                const name = chatItem.user.username;
                let message = "";
                if (chatItem.lastMessage.sender.id === getLoggedUser().id) {
                    message = "ME: " + chatItem.lastMessage.content;
                } else {
                    message = chatItem.lastMessage.content;
                }



                return (<>
                    <li className="chat-item" id={'USER_ID_' + chatItem.user.id} onClick={() => { removeListActive('USER_ID_' + chatItem.user.id) }}>
                        <a href="#" onClick={(e) => { e.preventDefault(); changeChatUser(chatItem.user.id) }} className="chat-overview">
                            {/* <!-- sender image --> */}
                            <img src={BASE_URL_IMAGE + chatItem.user.image + ".jpg"} alt="" className="sender-img" />
                            <div className="msg-overview-box">
                                <div className="sender-info">
                                    <span className="active sender-name">{name} &nbsp;</span>
                                    <span>12:30</span>
                                </div>
                                <p className="last-message">{message}</p>
                            </div>
                        </a>
                    </li>
                </>);
            })}

        </ul>
    )
}
