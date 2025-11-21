import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from './Navbar.module.css'
import { tokenContext } from "../Context/tokenContext";
import { themeContext } from "../Context/themeContext";
export default function Navbar() {
  const {token, setToken, userData} = useContext(tokenContext);
  const navigate = useNavigate()
  const {theme , changeTheme } = useContext(themeContext)

  function logOut(){
    navigate('/Login');
    localStorage.removeItem('token');
    setToken(null)
  }

  return (
    <div className={`${theme} bg-light dark:bg-darkBg  pt-6`}>
      <div className={`${styles.fixed} navbar ${theme} bg-light text-Tlight dark:bg-darkLr dark:text-Tdark shadow-[0_0_15px_rgba(0,0,0,0.3)] w-[90%] mx-auto border-transparent rounded-2xl`}>
        <div className="flex-1">
          <Link to={''} className="btn btn-ghost rounded-2xl text-xl">Platform</Link>
        </div>
        <div className="flex gap-2">
          {/* Dark and Light mood button */}
          <button onClick={ ()=> changeTheme() } className="cursor-pointer bg-darkLr text-Tdark dark:bg-light dark:text-black me-4 w-10 rounded-[50%] ">{theme == 'dark' ? '🌞' : '🌙'}</button>
          <div className="dropdown dropdown-end me-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData?.photo ? userData?.photo : `https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp`}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-light dark:bg-darkLr rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {token ?
               <>
               <li>
                <NavLink to={'Profile'} className="justify-between rounded-xl mb-1 hover:bg-gray-200 dark:hover:bg-[#27282A]">
                  Profile
                  <span className="badge">New</span>
                </NavLink>
              </li>
              <li onClick={()=> logOut()} className="hover:bg-gray-200 dark:hover:bg-[#27282A] rounded-lg"> <Link>Logout</Link>  </li>
               </>:
              <>
              <li>
                <NavLink className="rounded-lg py-2 mb-1 hover:bg-gray-200 dark:hover:bg-[#27282A]" to={'Login'}>Login</NavLink>
              </li>
              <li>
                <NavLink className="rounded-lg py-2 hover:bg-gray-200 dark:hover:bg-[#27282A]" to={'Signup'}>Signup</NavLink>
              </li>
              </>

              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
