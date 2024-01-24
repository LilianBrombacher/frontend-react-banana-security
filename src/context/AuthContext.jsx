import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

export function AuthContextProvider ({ children } ) {
    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
    });

    const login = () => {
        setIsAuth(true);
        console.log('Gebruiker is ingelogd')
    };

    const logout = () => {
        setIsAuth(false);
        console.log('Gebruiker is uitgelogd')
    };
    const data = {
        user: 'testuser',
        email: 'testuser@gmail.com',
        login: login,
        logout: logout,
        isAuth: isAuth,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}