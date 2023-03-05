import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ErrorPage from './Components/Screens/ErrorScreen/ErrorScreen';
import { LandingPage } from './Components/Screens/Landing/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppLayout } from './Components/Layout/App/AppLayout';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { Principal } from './Components/Screens/App/Principal';

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
        element:<Principal/>,
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
<Provider store={Store}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
</Provider>
);
