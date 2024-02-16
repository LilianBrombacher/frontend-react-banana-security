import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import isTokenValid from "../components/helpers/isTokenValid";


export const AuthContext = createContext({});

export function AuthContextProvider ({ children } ) {
    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });


    //mounting effect
    useEffect(() => {
        //haal de JWT op uit de local storage
        const token = localStorage.getItem('token');
        console.log(token)
        //als er wel een token is, haal dan opnieuw de gebruikersdata op
        if (token && isTokenValid(token)) {
            void login (token);
        } else {
            localStorage.clear()
            //als er geen token is doen we niks en zetten we de status op 'done'
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);
    const navigate = useNavigate();

    async function login(token) {
        // Token moet in de local storage opgeslagen worden, want die hebben we vanaf nu vaker nodig!
        localStorage.setItem('token', token);
        // Om erachter te komen van wie deze token is, zodat we informatie op kunnen halen, decoderen we deze token
        const decodedToken = jwtDecode(token);
        // Op de gedecodeerde token vinden we de id van de gebruiker, die we kunnen gebruiken voor het request
        console.log(decodedToken.sub);

        try {
            // probeer de informatie over deze gebruiker op te halen
            const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            // Wat voor informatie krijgen we terug?
            console.log(response.data);

            // als we die info hebben, sla het dan op in de state zodat iedereen er gebruik van kan maken:
            setIsAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: 'done',
            });
        } catch (e) {
            // Mislukt? Bah. Log de gebruiker dan maar weer uit!
            logout();
        }
        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        setIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate('/');
    }

    const contextData = {
        ...isAuth,
        login,
        logout
    };

        // const login = () => {
    //     setIsAuth(true);
    //     console.log('Gebruiker is ingelogd')
    // };
    //
    // const logout = () => {
    //     setIsAuth(false);
    //     console.log('Gebruiker is uitgelogd')
    // };
    // const data = {
    //     user: 'testuser',
    //     email: 'testuser@gmail.com',
    //     login: login,
    //     logout: logout,
    //     isAuth: isAuth,
    // };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading..</p>}
        </AuthContext.Provider>
    );
}