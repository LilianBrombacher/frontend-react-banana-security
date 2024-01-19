import React, {useContext, useEffect} from 'react';
import logo from '../assets/banana-01.png';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
  const navigate = useNavigate();
  const {isAuth, logout, login} = useContext(AuthContext)

  useEffect(() => {
    console.log(isAuth)
  }, [isAuth]);

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>



      <div>
        {isAuth === false &&
        <button
          type="button"
          onClick={() => login(navigate("/profile")) }
        >
          Log in
        </button>
        }
        <button
          type = "button"
            onClick={() => navigate("/signup")}
            >
          registreren
        </button>

        {isAuth === true &&
        <button
          type="button"
          onClick={() => logout(navigate("/"))}
        >
          Log out
        </button>
        }
      </div>
    </nav>
  );
}

export default NavBar;