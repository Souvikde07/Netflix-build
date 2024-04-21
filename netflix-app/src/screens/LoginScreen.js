import React from 'react'
import './LoginScreen.css'

function LoginScreen() {
  return (
    <div className='loginScreen'>
        <div className='loginScreen_background'>
          <img
            className="loginScreen_logo"
            src = "https://bi-jingo.com/wp-content/uploads/2009/03/215-2154144_transparent-background-netflix-logo.jpg"
            alt = ""
          />
          <button className='loginScreen_button'>Sign In</button>
        </div>
    </div>
  )
}

export default LoginScreen