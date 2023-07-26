import React from 'react'

import { Link } from 'react-router-dom'
import SearchUser from './SearchUser'
import ChatList from './ChatList'

function ChatFront() {
    return (
        <>
            {/* <!-- chat-front --> */}
            <div className="chat-front">
                {/* <!-- chat  navs --> */}
                <div className="chat-nav">
                    <ul className="chat-nav-ul">
                        <li className="chat-nav-item"><a href="#"><i className="fas fa-map-pin"></i>Pinned</a></li>
                        <li className="chat-nav-item active"><a href="#"><i className="far fa-comments"></i>All</a></li>
                        <li className="chat-nav-item"><a href="#"><i className="fas fa-headset"></i>Live Chats</a></li>
                        <li className="chat-nav-item"><a href="#"><i className="fas fa-archive"></i>Archived</a></li>
                        <li className="chat-nav-item"><a href="#"><i className="fas fa-ban"></i>Blocked</a></li>
                        <li className="chat-nav-item"><a href="#"><i className="fas fa-trash-alt"></i>Trash</a></li>
                        <li className="chat-nav-item">
                            <Link to={"/logout"}><i className="fas fa-sign-out-alt"></i>Log Out</Link>
                        </li>
                    </ul>
                </div>

                <SearchUser></SearchUser>


                {/* <!-- all chat list --> */}
                <div className="chat-list-div">
                    <span className="text-muted">MESSAGES</span>
                    <ChatList></ChatList>
                </div>
            </div>
        </>
    )
}

export default ChatFront