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
        auth.signOut();
        dispatch(logout());
      }
    });
    return unsubscibe;
  }, [dispatch]);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        dispatch(logout()); // Dispatch logout action to update Redux state
      })
      .catch(error => {
        console.error("Error signing out:", error);
      });
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: !user ? <LoginScreen /> : <HomeScreen />,
    },
    {
      path:'/profile',
      element: user ? (
        <ProfileScreen onSignOut={handleSignOut} /> // Pass signout function as a prop
      ) : (
        <LoginScreen /> // Redirect to login if not authenticated
      ),
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router= {router}/>
    </div>
  );
}

export default App;