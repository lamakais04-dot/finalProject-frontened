import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const fetchUser = async () => {
        try {
            const res = await axios.get("/api/auth/me", {
                withCredentials: true,
                headers: {
                    apiKey: "123456789apikeysecure"
                }
            })
            setUser(res.data)
        } catch{
            setUser(null)
        }finally{
            setLoading(false)
        }
        
}

useEffect(()=>{fetchUser()},[])

return(
    <AuthContext.Provider value={{user,setUser,fetchUser,loading}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)