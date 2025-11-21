import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import TokenContextProvider from "./components/Context/tokenContext.jsx";
import ThemeContextProvider from "./components/Context/themeContext.jsx";
import ProtectedRoutes from "./components/Protectedroutes/ProtectedRoutes.jsx";
import ProtectedAuth from "./components/Protectedroutes/ProtectedAuth.jsx";
import PostDetails from "./components/postDetails/postDetails.jsx";

const queryClient = new QueryClient();

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "post/:id",
          element: (
            <ProtectedRoutes>
              <PostDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "Login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "Signup",
          element: (
            <ProtectedAuth>
              <Signup />
            </ProtectedAuth>
          ),
        },
        {
          path: "Profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <ThemeContextProvider>
          <Toaster
            position="top-right"
            theme="system" // or "light" or "dark" based on your theme
            richColors
            closeButton
          />
          <RouterProvider router={routes} />
        </ThemeContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>
  );
}

export default App;
