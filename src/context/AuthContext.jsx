import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

export function AuthContextProvider ({ children } ) {
    const [isAuth, toggleIsAuth] = useState(false);

    const login = () => {
        toggleIsAuth(true);
    };

    const logout = () => {
        toggleIsAuth(false);
    };
    const data = {
        username: 'testuser',
        email: 'testuser@gmail.com',
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}