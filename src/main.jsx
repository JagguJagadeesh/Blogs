// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import ProtectedLayout from './components/ProtectedLayout.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element: <Home />
      },
      {
        path:'/login',
        element: (
          <ProtectedLayout authentication={false}>
            <Login />
          </ProtectedLayout>
        )
      },
      {
        path:'/signup',
        element: (
          <ProtectedLayout authentication={false} >
            <Signup />
          </ProtectedLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
            <ProtectedLayout authentication>
                {" "}
                <AllPosts />
            </ProtectedLayout>
        ),
    },
    {
        path: "/add-posts",
        element: (
            <ProtectedLayout authentication>
                {" "}
                <AddPost />
            </ProtectedLayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <ProtectedLayout authentication>
                {" "}
                <EditPost />
            </ProtectedLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])

createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  
)
