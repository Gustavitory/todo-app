import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ErrorPage from './Components/Screens/ErrorScreen/ErrorScreen';
import { LandingPage } from './Components/Screens/Landing/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const router=createBrowserRouter([
  {
    path:"/",
    element:<LandingPage/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/app",
    element:<h1>App Page</h1>,
    errorElement:<ErrorPage/>,
    children:[]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
