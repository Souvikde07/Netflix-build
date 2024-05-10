import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import{ createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from './features/counter/userSlice';
import ProfileScreen from './screens/ProfileScreen';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscibe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
        })
      );
      } else{
        //Logged out
        dispatch(logout());
      }
    });
    return unsubscibe;
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: !user ? <LoginScreen /> : <HomeScreen />,
    },
    {
      path:'/profile',
      element: <ProfileScreen />
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router= {router}/>
    </div>
  );
}

export default App;
