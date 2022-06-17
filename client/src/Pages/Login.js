import React from 'react';
import '../Assets/Styles/login.css'

const Login = () => {
    return (
        <div className='wrapper'>
            <div className='container'>
                <h1>Login to Continue..</h1>
                <a href='http://localhost:5000/auth/google' className="social-login google-login">Login with Google</a>
                <a href='http://localhost:5000/auth/twitter' className="social-login twitter-login">Login with Twitter</a>
            </div>

        </div>
    )
}

export default Login;