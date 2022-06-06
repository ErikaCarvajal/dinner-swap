import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({})

    const userEmail = JSON.parse(window.sessionStorage.getItem("email"))

    useEffect(()=> {
        fetch(`/api/user/${userEmail}`)
        .then(res => res.json())
        .then((data) => console.log(data))
        .catch(err=> console.log(err))
    
    },[])


    return <>
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    </>
}