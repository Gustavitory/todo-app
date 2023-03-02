import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ErrorPage from './Components/Screens/ErrorScreen/ErrorScreen';
import { LandingPage } from './Components/Screens/Landing/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppLayout } from './Components/Layout/App/AppLayout';

const router=createBrowserRouter([
  {
    path:"/",
    element:<LandingPage/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/app",
    element:<AppLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"",
        element:<h1>Tareas</h1>,
        index:true
      },
      {
        path:'metrics',
        element:<h1>Metricas</h1>
      }
    ]
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
