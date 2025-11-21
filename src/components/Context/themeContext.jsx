import { createContext, useState } from "react";

export const themeContext = createContext();

export default function ThemeContextProvider(props){ 
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    function changeTheme(){
        if(theme == 'light'){
            setTheme('dark')
        }else if(theme == 'dark'){
            setTheme('light')
        }
    }
localStorage.setItem('theme', theme);
    return <themeContext.Provider value={{theme, changeTheme}} >
        {props.children}
    </themeContext.Provider>

}
