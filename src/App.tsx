import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Login-Register/Register'
import Login from './pages/Login-Register/Login'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/Dashboard",
        element: <DashBoard />
    },
    {
        path: "/register",
        element: <Register />
    },
    { path: "/login" , 
    element: <Login /> }
])

const App = () => {

    return (
        <div>
            <div className={``}>
                <RouterProvider router={router} />
            </div>
        </div>
    )

}

export default App