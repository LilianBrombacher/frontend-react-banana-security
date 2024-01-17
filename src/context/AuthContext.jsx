import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

export function AuthContextProvider ({ children } ) {
    const [isAuth, toggleIsAuth] = useState(false);

    const login = () => {
        toggleIsAuth(true);
        console.log('Gebruiker is ingelogd')
    };

    const logout = () => {
        toggleIsAuth(false);
        console.log('Gebruiker is uitgelogd')
    };
    const data = {
        username: 'testuser',
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