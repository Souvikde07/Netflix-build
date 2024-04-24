import React from 'react'
import './LoginScreen.css'

function LoginScreen() {
  return (
    <div className='loginScreen'>
        <div className='loginScreen_background'>
          <img
            className="loginScreen_logo"
            src = "https://www.freepnglogos.com/uploads/netflix-socks-png-18.png"
            alt = ""
          />
          <button className='loginScreen_button'>Sign In</button>
          <div className='loginScreen_gradient'/>
        </div>
        <div className='loginScreen_body'>
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <div className='loginScreen_input'>
              <form>
                <input type='email' placeholder='Email Address'></input>
                <button className='loginScreen_getStarted'>GET STARTED</button>
              </form>
            </div>
          </>
        </div>
    </div>
  )
}

export default LoginScreen