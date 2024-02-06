import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {isAuth, logout, login} = useContext(AuthContext);
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:3000';

    useEffect(() => {
        console.log(isAuth)
    }, [isAuth]);

     async function handleSubmit(e) {
        e.preventDefault();
        // login();
         toggleError(false);

         try {
             const result = await axios.post(baseUrl + '/login',{
                 email: email,
                 password: password,
             });
             //log resultaat in console
             console.log(result.data);

             //geef JWT token mee aan de login-functie van de context
             login(result.data.accessToken);
         } catch(e) {
             console.error(e);
             toggleError(true);
         }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email-field">
            Emailadres:
            <input
                type="email"
                id="email-field"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
        </label>
        <label htmlFor="password-field">
            Wachtwoord:
            <input
                type="password"
                id="password-field"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
        </label>
          {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

        <button
            type= "button"
            onClick={() => login(navigate("/profile"))}>
            Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;