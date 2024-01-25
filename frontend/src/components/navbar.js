import react from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    function logIn(){
        routeChange("/auth");
    }

    function logOut(){
        localStorage.removeItem("userData");
        routeChange("/");
    }

    const userData = localStorage.getItem("userData");

    return (
        <header>
            <h1>AceCoder</h1>
            {!userData ? <a onClick={logIn}>LogIn</a>
            : 
            <div className="profile-button">
                <h4>{JSON.parse(userData).username} </h4> 
                <a onClick={logOut}>LogOut</a>
            </div>
            }              
        </header>
    );
}