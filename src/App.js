import './assets/css/style.css'
import './assets/css/responsive.style.css'


import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatDashboard from './components/UserPanel/ChatDashboard';
import Login from './components/Login';
import Register from './components/Register';
import PrivateUserPanelGate from './components/UserPanel/PrivateUserPanelGate';
import ActiveChatContextProvider from './context/ActiveChatContextProvider';
import Logout from './components/Logout';
import { MessageTransactionProvider } from './context/MessageTransactionProvider';

function App() {
    return (
        <>
            <BrowserRouter>

                <MessageTransactionProvider>
                    <ActiveChatContextProvider>
                        <Routes>
                            <Route>

                                <Route path='/' element={<PrivateUserPanelGate></PrivateUserPanelGate>}>
                                    <Route path='' element={<Navigate to={"/chat-dashboard"}></Navigate>}></Route>
                                    <Route path='chat-dashboard' element={<ChatDashboard></ChatDashboard>}></Route>
                                </Route>

                                <Route path='/login' element={<Login></Login>}></Route>
                                <Route path='/logout' element={<Logout></Logout>}></Route>
                                <Route path='/register' element={<Register></Register>}></Route>

                                <Route path='/test' element={<ActiveChatContextProvider></ActiveChatContextProvider>}></Route>


                                {/* <Route path='/blog' element={<BlogPirvateGate></BlogPirvateGate>}>
                            <Route path='' element={<Navigate to='/user/dashboard'></Navigate>}></Route>
                            <Route path="/blog/:blogId" element={<Blog />} />
                            <Route path='write-blog' element={<WriteBlog></WriteBlog>}></Route>
                            </Route> */}
                            </Route>
                        </Routes>
                    </ActiveChatContextProvider>
                </MessageTransactionProvider>

            </BrowserRouter>

        </>
    );
}

export default App;
