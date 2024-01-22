import { useContext, useState, createContext } from "react";

const DataContext = createContext()

export const DataProvider = ({children}) =>{
    
    const [url, setUrl] = useState('')
    const setUrlLink = (url) =>{
        alert('In setUrlLink with url : '+url)
        setUrl(url);
    }

    return(
        <>
            <DataContext.Provider value={{url, setUrlLink}}>
            {children}
            </DataContext.Provider>
        </>
    );
    
}


export const useData = () =>{
    return useContext(DataContext)
}