import React, {useState} from 'react'

export const UserContext = React.createContext()

const ContextProvider = (props) => {
    
    const [user, setUser] = useState({username: '', token: ''})

    return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default ContextProvider