import React, { useContext, useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

import ActiveChatContext from '../../context/ActiveChatContext';
import { BASE_URL_IMAGE, ONLY_BASE_URL } from '../../services/Util';
import { getOurMessage } from '../../services/messageServices';
import { doLogout, getLoggedUser } from '../../services/auth';
import MessageTransaction from '../../context/MessageTransaction';


const Conversation = (props) => {
    const activeChatUser = useContext(ActiveChatContext);
    const messageTransaction = useContext(MessageTransaction);

    const [messageContent, setMessageContent] = useState('');
    const [stompClient, setStompClient] = useState(over(new SockJS(ONLY_BASE_URL + '/sdn-web-sock')));
    // const [stompClient, setStompClient] = useState(over(new SockJS('http://localhost:4444/ws')));
    const [allMessages, setAllMessages] = useState([]);
    const [id, setId] = useState(1000)

    const chatRoomRef = useRef(null);
    

    useEffect(() => {
        if (allMessages.length == 0) {
            return
        }
        if (activeChatUser.activeChatUser === null) {
            return;
        }

        scrollToBottom();

    }, [allMessages])

    const scrollToBottom = () => {
        // Scroll to the bottom of the div
        // Scroll chat-room to the end
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    };



    const onInputChange = (e) => {
        setMessageContent(e.target.value)
    }


    //message send korar por
    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageContent === "") {
            return;
        }
        sendPrivateMessage();

        setMessageContent("");
    }


    useEffect(() => {
        stompClient.connect({}, onConnected, onError);
    }, [])


    const onConnected = () => {
        stompClient.subscribe("/user/" + getLoggedUser().id + "/queue/message", onPrivatemessageReceived, onError)
    }

    const onError = () => {
        console.error("Kire vai!! Error in StompClient")
    }

    const onPrivatemessageReceived = (payload) => {
        const newMessage = JSON.parse(payload.body);
        // Combine the new message with the previous chat history
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
        messageTransaction.updateLastMessage(newMessage);

        console.log("===========================================")
        console.log(newMessage)
        console.log("===========================================")
    }


    //sending message
    const sendPrivateMessage = () => {
        var chatMessage = {
            senderId: getLoggedUser().id,
            receiverId: activeChatUser.activeChatUser.id,
            message: messageContent
        };

        const myMessage = {
            id: id,
            sender: getLoggedUser(),
            receiver: { id: activeChatUser.activeChatUser.id, username: '', password: null, image: null, joinDate: '' },
            content: messageContent,
            timestamp: '2023-07-20T16:45:29.023+00:00'
        }

        setId((myMessage.id+1))

        
        messageTransaction.updateLastMessage(myMessage);
        setAllMessages((prevMessages) => [...prevMessages, myMessage]);
        stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
    }












    //load all message with the Active Chat user
    useEffect(() => {
        if (!activeChatUser.activeChatUser) {
            return; // Return early if activeChatUser is not set
        }

        if (activeChatUser.activeChatUser) {
            getOurMessage(getLoggedUser().id, activeChatUser.activeChatUser.id)
                .then((data) => {
                    // console.log(data)
                    setAllMessages(data)
                })
                .catch((err) => {
                    console.log(err.response.data)
                    if (err.response.data === "User not logged in!") {
                        doLogout();
                    }
                })
        }

    }, [activeChatUser])





    //===========================
    //front end er button gula workable kortechi
    const [isReceiverInfoButtonClicked, setReceiverInfoButtonClicked] = useState(false);
    const conversationRef = useRef(null);

    const handleReceiverInfoButtonClick = () => {
        setReceiverInfoButtonClicked(!isReceiverInfoButtonClicked);
        console.log("Working");
    }

    useEffect(() => {
        props.handleReceiverInfoButtonClick(isReceiverInfoButtonClicked);

        if (conversationRef.current) {
            if (window.innerWidth > 1200) {
                if (isReceiverInfoButtonClicked) {
                    if (conversationRef.current.style.width = "70%") {
                        conversationRef.current.style.width = "100%"
                    }
                } else {
                    if (conversationRef.current.style.width = "100%") {
                        conversationRef.current.style.width = "70%"
                    }
                }
            }
        }


    }, [isReceiverInfoButtonClicked])

    useEffect(() => {
        if(props.handleToggleReceiverContainer){
            setReceiverInfoButtonClicked(!isReceiverInfoButtonClicked)
        }
    }, [props.handleToggleReceiverContainer])



    const handleConversationBackButton = () =>{
        activeChatUser.updateActiveChatUser(null);
    }




    //if active user set na hoy
    if (!activeChatUser.activeChatUser) {
        return (
            <>
                <div className="conversation" id="conversation" ref={conversationRef}>
                    <div className="user-info">

                        {/* <!-- buttons --> */}
                        <div className="conversation-buttons" style={{ userSelect: 'none', visibility: 'hidden' }}>
                            <button><i className="fas fa-phone-alt"></i></button>
                            <button><i className="fas fa-video"></i></button>
                            <button className="active" id="receiver-info-button"><i className="fas fa-info"></i></button>
                        </div>
                    </div>

                    {/* <!-- chats --> */}
                    <ul className="chat-room" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p>Start New Conversation</p>
                    </ul>
                    {/* <!-- all chat ends --> */}


                    {/* <!-- send messgae box --> */}
                    <div className="send-message-div">
                        <form>
                            <div className="input-group message">
                                <input disabled autoComplete='off' name='messageContent' onChange={onInputChange} value={messageContent} type="text" placeholder="Write message..." />
                            </div>
                            <div className="input-group file">
                                <i className="fas fa-paperclip"></i>
                                <input type="file" disabled />
                            </div>
                            <button className="send-btn" disabled type="submit"><i className="fas fa-paper-plane"></i></button>
                        </form>
                    </div>

                </div>
            </>
        )
    }











    return (
        <>
            <div className="conversation" id="conversation" ref={conversationRef}>
                <div className="user-info">
                    <div className="d-flex">
                        <button className="chat-back" onClick={handleConversationBackButton}>Back</button>
                        <img src={BASE_URL_IMAGE + activeChatUser.activeChatUser.image + ".jpg"} alt="" /> {activeChatUser.activeChatUser.username}
                        {/* https://github.com/SanderWieringa/dammen/tree/main/checkers */}
                    </div>
                    {/* <!-- buttons --> */}
                    <div className="conversation-buttons">
                        <button><i className="fas fa-phone-alt"></i></button>
                        <button><i className="fas fa-video"></i></button>
                        <button className="active" id="receiver-info-button" onClick={handleReceiverInfoButtonClick}><i className="fas fa-info"></i></button>
                    </div>
                </div>

                {/* <!-- chats --> */}
                <ul className="chat-room" ref={chatRoomRef}>
                    {allMessages.length === 0
                        ?
                        <h1 style={{ textAlign: 'center' }}>Start Conversation with him </h1>
                        :
                        allMessages.map((message) => {
                            if (message.sender.id === activeChatUser.activeChatUser.id) {
                                return (<>
                                    <li key={message.id} className="receiver-msg">
                                        <img src={BASE_URL_IMAGE + message.sender.image + ".jpg"} alt="" className="receiver-img" />
                                        <p>{message.content}</p>
                                    </li>
                                </>)
                            } else {
                                return (<>
                                    <li key={message.id} className="sender-msg">
                                        <p>{message.content}</p>
                                    </li>
                                </>)
                            }
                        })
                    }

                </ul>
                {/* <!-- all chat ends --> */}




                {/* <!-- send messgae box --> */}
                <div className="send-message-div">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group message">
                            <input autoComplete='off' name='messageContent' onChange={onInputChange} value={messageContent} type="text" placeholder="Write message..." />
                        </div>
                        <div className="input-group file">
                            <i className="fas fa-paperclip"></i>
                            <input type="file" />
                        </div>
                        <button className="send-btn" type="submit"><i className="fas fa-paper-plane"></i></button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Conversation