
export const doLogin = (userInfo, next) =>{
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        next();
}

export const doLogout = (next) =>{        
        localStorage.removeItem("userInfo");
        next();
}

export const isUserLoggedIn = ()=>{
    let userInfo = localStorage.getItem("userInfo");    
    if(userInfo != null){
        return true;
    }else{
        return false;
    }
}

export const getLoggedUser =()=>{
    return JSON.parse(localStorage.getItem("userInfo"));
}