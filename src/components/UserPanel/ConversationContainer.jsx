import React, { useContext, useEffect, useRef, useState } from 'react'

import userImage from '../../assets/images/user.jpg'
import Conversation from './Conversation'
import ActiveChatContext from '../../context/ActiveChatContext'
import { BASE_URL_IMAGE } from '../../services/Util';

function ConversationContainer() {

    const activeChatUser = useContext(ActiveChatContext);

    const receiverInfoContainer = useRef(null);
    const toggleReceiverContainerButtonRef = useRef(null)
    const conversationContainerRef = useRef(null)

    const [clickedToggleReceiverContainerButton, setClickedToggleReceiverContainerButton] = useState(false);

    //child a click hole eikhane data asbe
    const [isReceiverInfoButtonClicked, setReceiverInfoButtonClicked] = useState(false)
    const handleReceiverInfoButtonClick = (value) => {
        setReceiverInfoButtonClicked(value);
    }


    useEffect(() => {
        // Make sure receiverInfoContainerRef.current is not null before accessing its style
        if (receiverInfoContainer.current) {
            // Now you can access the DOM element using receiverInfoContainerRef.current
            if (window.innerWidth > 1200) {
                if (isReceiverInfoButtonClicked) {
                    receiverInfoContainer.current.style.height = "100%";
                    if (receiverInfoContainer.current.clientWidth > 0) {
                        receiverInfoContainer.current.style.width = "0%";
                        receiverInfoContainer.current.style.opacity = "0";
                    }
                } else {
                    if (receiverInfoContainer.current.clientWidth <= 0) {
                        receiverInfoContainer.current.style.width = "30%";
                        receiverInfoContainer.current.style.opacity = "1";
                    }
                }
            } else {
                if (isReceiverInfoButtonClicked) {
                    toggleReceiverContainerButtonRef.current.style.display = "block";
                    receiverInfoContainer.current.style.height = "100%"
                } else {
                    toggleReceiverContainerButtonRef.current.style.display = "none";
                    receiverInfoContainer.current.style.height = "0%"
                }
            }
        }

        console.log(window.innerWidth)
        setClickedToggleReceiverContainerButton(false);
    }, [isReceiverInfoButtonClicked])


    const sendPropsToConversation = () => {        
        setClickedToggleReceiverContainerButton(true);
    }

    
    
    useEffect(()=>{
        if(activeChatUser.activeChatUser){
            if(window.innerWidth < 1024){
                conversationContainerRef.current.style.display = "block";
            }
        }
    },[activeChatUser])





    if (!activeChatUser.activeChatUser) {
        return <>
            <>
                {/* <!-- conversation containaer --> */}
                <div className="conversation-container" id="conversation-container" ref={conversationContainerRef}>

                    {/* <!-- conversation side --> */}
                    <Conversation handleReceiverInfoButtonClick={handleReceiverInfoButtonClick} />

                    {/* <!-- user --> */}
                    <div className="receiver-info-container" id="receiver-info-container">
                        <div className="div">
                            <div className="receiver-info-card">

                            </div>
                        </div>
                    </div>

                    <button id="toggleReceiverContainerButton">x</button>

                </div>
            </>
        </>
    }


    return (
        <>
            {/* <!-- conversation containaer --> */}
            <div className="conversation-container" id="conversation-container" ref={conversationContainerRef}>

                {/* <!-- conversation side --> */}
                <Conversation handleReceiverInfoButtonClick={handleReceiverInfoButtonClick} handleToggleReceiverContainer={clickedToggleReceiverContainerButton} />


                {/* <!-- user --> */}
                <div className="receiver-info-container" id="receiver-info-container" ref={receiverInfoContainer}>
                    <div className="div">
                        <div className="receiver-info-card">
                            <div className="info">
                                <img src={BASE_URL_IMAGE + activeChatUser.activeChatUser.image + ".jpg"} alt="" />
                                <div>
                                    {activeChatUser.activeChatUser ? <span className="name">{activeChatUser.activeChatUser.username}</span> : "nai"}
                                    {console.log(activeChatUser.activeChatUser)}

                                </div>
                            </div>
                            <div className="communicate-buttons">
                                <button><i className="fas fa-phone"></i></button>
                                <button><i className="fas fa-camera "></i></button>
                                <button><i className="fas fa-volume-mute"></i></button>
                                <button><i className="fab fa-facebook"></i></button>
                            </div>
                            <div className="about">
                                Hey I'm {activeChatUser.activeChatUser.username}. 👋 <br></br>
                                User of TalkStar
                            </div>
                        </div>
                    </div>
                </div>

                <button ref={toggleReceiverContainerButtonRef} onClick={sendPropsToConversation} id="toggleReceiverContainerButton">x</button>

            </div>
        </>
    )
}

export default ConversationContainer