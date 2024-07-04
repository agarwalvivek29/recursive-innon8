import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Service from './components/Service.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Steps from './components/Steps.jsx'
import Ddashboard from './pages/Ddashboard.jsx'
import Pdashboard from './pages/Pdashboard.jsx'
import Pform from './components/Pform.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<NotFoundPage />
  },
  {
    path:'/service/:id',
    element:<Steps/>
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
  path:'/Ddashboard',
  element:<Ddashboard />
  },
  {
    path:'/Pdashboard',
    element:<Pdashboard />
  },
  {
    path:'/form',
    element:<Pform />
  }


 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
