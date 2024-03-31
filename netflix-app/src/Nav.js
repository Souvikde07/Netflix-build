import React, { useEffect, useState } from 'react';
import "./Nav.css";

function Nav() {
const {show,handleShow} = useState(false);
const transitionNavBar = () =>{
    if(window.scrollY > 100){
        handleShow(true);
    }else{
        handleShow(false);
    }
}

useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener('scroll',transitionNavBar);
}, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
        <div className='nav__contents'>
            <img className='nav__logo'
                src="https://bi-jingo.com/wp-content/uploads/2009/03/215-2154144_transparent-background-netflix-logo.jpg"
                alt=""
            />
            <img className='nav__avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt=''
            />
        </div>
    </div>
  )
}

export default Nav;