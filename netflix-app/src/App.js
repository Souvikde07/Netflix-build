import React from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import{ createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';

function App() {
  const user = null;
  const router = createBrowserRouter([
    {
      path: '/',
      element: !user ? <LoginScreen /> : <HomeScreen/>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router= {router}/>
    </div>
  );
}

export default App;
