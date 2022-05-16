import {Routes, Route} from 'react-router-dom'
import Layout from "../components/Layout/Layout";
import AcervoPublico from "../pages/AcervoPublico";
import Dashboard from '../pages/Dashboard';
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Rotas públicas */}
        <Route path='/' element={<Homepage />} />
        <Route path='login' element={<Login />} />
        <Route path='acervo' element={<AcervoPublico />} />

        {/* Rotas privadas */}
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default Rotas;
