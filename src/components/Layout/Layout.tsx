import { Outlet } from "react-router-dom";
import MenuResponsivo from "../MenuResponsivo";
import './Layout.scss'

function Layout() {
   return ( 
      <>
         <MenuResponsivo />
         <main className="App">
            {/* as rotas que estiverem dentro da rota q tem o layout, vão ser renderizadas nesse outlet */}
            <Outlet />
         </main>
      </>
    );
}

export default Layout;