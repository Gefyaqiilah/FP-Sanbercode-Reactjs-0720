import React, {
    createContext,
    useState
} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const currentUser = JSON.parse(localStorage.getItem("login"))
    const iniateUser = currentUser ? currentUser : null
    const [users, setUsers] = useState(iniateUser);

    return (
        <>
            <UserContext.Provider value={[users, setUsers]}>
                {props.children}
            </UserContext.Provider>
        </>
    )
}