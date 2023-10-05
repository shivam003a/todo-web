import { createContext, useState } from "react";


export const AppContext = createContext();

export default function AppContextProvider({children}){

    const [changed, setChanged] = useState(null)
    const [logged, setLogged] = useState(false)
    const [ isLoading, setLoading ] = useState(false)


    const value = {
        changed,
        setChanged,
        logged,
        setLogged,
        isLoading,
        setLoading
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}