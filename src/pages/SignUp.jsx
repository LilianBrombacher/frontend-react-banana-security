import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseUrl = 'http://localhost:3000';
    const navigate= useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        console.log(name, email, password);
        signUp()
    }



    async function signUp() {
        console.log('voor post request')
        try {
            const response = await axios.post(baseUrl + '/register',{
                name: name,
                email: email,
                password: password,
            });
            console.log('response', response)
        } catch(e){
            console.error(e)
        } finally {
            navigate('/signIn')
        }
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit}>
          <label htmlFor='username-field'>Username</label>
          <input type='text' id='username-field' value={name} onChange={e => setName(e.target.value)}/>
        <label htmlFor='email-field'>Email</label>
          <input type='email' id='email-field' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor='password-field'>Wachtwoord</label>
          <input type='password' id='password-field' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit'>Registreren</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;