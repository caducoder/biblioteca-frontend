import { Outlet } from "react-router-dom";
import MenuResponsivo from "../MenuResponsivo";
import './Layout.scss'

function Layout() {
   return ( 
      <>
         <MenuResponsivo />
         <main className="App">
            <Outlet />
         </main>
      </>
    );
}

export default Layout;