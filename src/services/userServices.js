import { axiosRequest } from "./Util";


export  const userRegister = async (username, password)=>{
    var userdetails = {
        username: username,
        password: password
    }

    return axiosRequest.post("/register", userdetails)
        .then(resp=>resp.data);
}


export const userLogin = async (username, password)=>{
    var userdetails = {
        username: username,
        password: password
    }

    return axiosRequest.post("/login", userdetails)
        .then(resp=>resp.data);
}


export const searchUser = async (username)=>{    
    return axiosRequest.get("search/"+username)
        .then((response)=>response.data)
}


export const getUserById = (userId) =>{
    return axiosRequest.get("/getUser/"+userId)
        .then((response)=>response.data)
}