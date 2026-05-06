import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import CourseList from './pages/CourseList'
import Cart from './pages/Cart'
import MyLearning from './pages/MyLearning'
import Profile from './pages/Profile'
import './App.css'
import './index.css'
import AdminDashboard from './pages/AdminDashboard'
const App = () => {
  let MyRouter  = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,  
      children: [
        {
          index: true,     
          element: <CourseList/>
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "signup",  
          element: <SignUp/>
        },
        {
          path: "cart",
          element: <Cart/>
        },
        {
          path: "my-learning",
          element: <MyLearning />
        }
        ,
        {
           path:"profile",
           element:<Profile />
        },
        {
           path:"admin",
           element:<AdminDashboard/>
        }
      ]
    }
  ])

  return <RouterProvider router={MyRouter}/>
}

export default App