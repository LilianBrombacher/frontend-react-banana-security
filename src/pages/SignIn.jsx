import React, {useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function SignIn() {
    const {isAuth, logout, login} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isAuth)
    }, [isAuth]);

    function handleSubmit(e) {
        e.preventDefault();
        login();
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
        <p>*invoervelden*</p>
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