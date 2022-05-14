import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MenuResponsivo from '../components/MenuResponsivo';
import Homepage from '../pages/Homepage';

function Rotas() {
   return ( 
      <Router>
         <MenuResponsivo />
         <Routes>
            <Route path='/' element={<Homepage />} />
         </Routes>
      </Router>
   );
}

export default Rotas;