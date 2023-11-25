import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// import NavbarProf from "./professeur/NavbarProf";


import Login from "./admin/Login.js";
import G_recette from "./admin/G_recette.js";




// const Layout_P = () => {
//   return (
//     <span>
//       <NavbarProf />
//       <Outlet />
//     </span>
//   );
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    children: [
      {
        path: "/user/recettes",
        element: <G_recette />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
