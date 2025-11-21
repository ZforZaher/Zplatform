import { createContext, useEffect, useState  } from "react";
import getLoggedUser from "../../Api/loggedUser.api";

export const tokenContext = createContext(null)

export default function TokenContextProvider( props ){
    const [token, setToken] = useState()
    const [userData, setUserData] = useState(null)
    console.log(token);
    async function getUserData(){
        const response = await getLoggedUser()
        console.log(response)
        setUserData(response.user)
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserData()
        }
    },[])
    
    return <tokenContext.Provider value={{token, setToken, userData}}>
        {props.children}
    </tokenContext.Provider>
}