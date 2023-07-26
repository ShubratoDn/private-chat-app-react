import { axiosRequest } from "./Util";

import {getLoggedUser} from "../services/auth"

export const getOurMessage = (senderId,receiverId) => {
    if (receiverId) {
        return axiosRequest.get(`/get-our-message/${senderId}/${receiverId}` )
            .then(resp => resp.data);
    }
}

export const getChatStarted =()=>{
    const loggedUserId = getLoggedUser().id;
    return axiosRequest.get(`/chatStarted/${loggedUserId}` )
            .then(resp => resp.data);
}