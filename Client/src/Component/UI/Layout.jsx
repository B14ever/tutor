import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
const Layout = () => {
  return( <React.Fragment>
             <Header/>
             <Outlet/>
          </React.Fragment>
  )
          
}

export default Layout