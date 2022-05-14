import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MenuResponsivo from '../components/MenuResponsivo';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';

function Rotas() {
   return ( 
      <Router>
         <MenuResponsivo />
         <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
         </Routes>
      </Router>
   );
}

export default Rotas;