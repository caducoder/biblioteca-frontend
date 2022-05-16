import { Outlet } from "react-router-dom";
import MenuResponsivo from "../MenuResponsivo";
import './Layout.scss'

function Layout() {
   return ( 
      <main className="App">
         <MenuResponsivo />
         <Outlet />
      </main>
    );
}

export default Layout;