// App.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    async function registerNewUser(){

        const userData = {"username": username, "emailId": email, "password": password};

        try {
            const response = await 
            axios
            .post('http://localhost:8082/api/sign-up',
            userData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            // console.log(response.data);
            
            if (response.status === 200){
                localStorage.setItem("userData", JSON.stringify(userData));        
                // console.log("Here I am ");       
                routeChange("/");
            }
            // console.log(response);  
            // console.log('SignUp API response:', response.data);
        } 
        catch (error) {
            console.error('Error adding user:', error);
        }
    }


    async function loginUser(){

        const userData = {"emailId": email, "password": password};
        // try to get user username also when query is made
        try {
            const response = await 
            axios
            .post('http://localhost:8082/api/sign-in',
            userData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            // logged In Successfully
            if (response.status === 200){
                // store user details in some local Storage
                // console.log(response.data);
                localStorage.setItem("userData", JSON.stringify(response.data));                
                routeChange("/");
            }
        } 
        catch (error) {
            console.error('Error verifying user:', error);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // a new user is trying to register
        if (isRegistering){
            registerNewUser();
        }
        else{
            loginUser();
        }

    };

    return (
        <div className="app-container">
            <div className="auth-container">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>

                    {isRegistering &&

                        <div className="form-group">
                            <label htmlFor="email">Username:</label>
                            <input
                                type="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field"
                            />
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                <p className="toggle-auth" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
                </p>
            </div>
        </div>
    );
};

// export default Login;
