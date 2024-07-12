import App from '../App.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import RecipeForm from '../pages/RecipeForm.jsx';
import SignupForm from '../pages/SignupForm.jsx';
import SigninForm from '../pages/SigninForm.jsx';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../contexts/Authcontext.jsx';

export default function Index() {

    let {user } = useContext(AuthContext)

    const router = createBrowserRouter([
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "/", //http://5173/
              element: user ? <Home /> : <Navigate to={"/sign-in"} />
            },
            {
              path: "/about", //http://5173/about
              element: <About />
            },
            {
              path: "/contact", //http://5173/contact
              element: <Contact />
            },
      
            {
              path: "/recipe/create", //http://5173/contact
              element: user ? <RecipeForm /> : <Navigate to={"/sign-in"} />
            },
            {
              path: "/recipe/edit/:id", //http://5173/contact
              element: user ? <RecipeForm /> : <Navigate to={"/sign-in"} />
            },
            {
              path: "/sign-up", //http://5173/contact
              element: !user ? <SignupForm/> : <Navigate to={"/"} />
            },
            {
              path: "/sign-in", //http://5173/contact
              element: !user ?<SigninForm/> : <Navigate to={"/"} />
            },
          ]
        },
      ]);


  return (
    <RouterProvider router={router} />
  )
}
