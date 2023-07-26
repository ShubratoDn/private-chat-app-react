import React, { useContext, useEffect, useState } from 'react'

import userImage from '../../assets/images/user.jpg'
import { searchUser } from '../../services/userServices';
import ActiveChatContext from '../../context/ActiveChatContext';
import { BASE_URL_IMAGE } from '../../services/Util';
function SearchUser() {

    const [searchQuery, setSearchQuery] = useState("");    
    const [searchResult, setSearchResult] = useState([]);
    const activeChatUser = useContext(ActiveChatContext);

    const handleChange = (e)=>{
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
         searchUserMethod();
    }, [searchQuery]);


    const searchUserMethod = ()=>{
        if(searchQuery===""){
            setSearchResult([])
        }else{
            searchUser(searchQuery)
            .then((data)=>{
                // console.log(data)
                setSearchResult(data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }


    const handleBlur = ()=>{
        setTimeout(()=>{
            setSearchQuery("")
        },500)
    }



    const handleSearch =(clickedUser)=>{        
        activeChatUser.updateActiveChatUser(clickedUser);
    }

    return (
        <>
            {/* <!-- search bar --> */}
            <div className="search-box-div">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input className="search-bar" onBlur={handleBlur} onChange={handleChange} value={searchQuery} type="search" placeholder="Search" />
                    <ul className='search-result-div'>
                        {
                            searchResult && searchResult.map((result)=> {
                                return <li onClick={()=>handleSearch(result)} key={result.id} className='search-item'><img src={BASE_URL_IMAGE+result.image+".jpg"} alt="name" />{result.username}</li>
                            })
                        }
                    </ul>
                </div>
            </div>

        </>
    )
}

export default SearchUser
