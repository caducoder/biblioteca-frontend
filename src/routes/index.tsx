import {Routes, Route} from 'react-router-dom'
import Layout from "../components/Layout/Layout";
import AcervoPublico from "../pages/AcervoPublico";
import Dashboard from '../pages/Dashboard';
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import AcervoProtegido from '../pages/AcervoProtegido'
import Equipe from '../pages/Equipe';
import Fichario from '../pages/Fichario';
import Financeiro from '../pages/Financeiro';
import RequireAuth from '../components/RequireAuth';
import Unauthorized from '../pages/Unauthorized';
import DetalhesReserva from '../pages/DetalhesReserva';
import Consulta from '../pages/AcervoProtegido/Consulta';
import Cadastro from '../pages/AcervoProtegido/Cadastro';
import Remocao from '../pages/AcervoProtegido/Remocao';
import ImportarNotaFiscal from '../pages/Financeiro/ImportarNotaFiscal';
import FormCadastroCliente from '../pages/Fichario/Cadastro';
import Emprestimo from '../pages/Emprestimo';
import FormCadastroFuncionario from '../pages/Equipe/Cadastro';

/*
2200: Bibliotecario
2205: Administrador
*/

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Rotas públicas */}
        <Route path='/' element={<Homepage />} />
        <Route path='login' element={<Login />} />
        <Route path='acervo' element={<AcervoPublico />} />
        <Route path='acervo/livro/:id' element={<DetalhesReserva />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* Rotas privadas */}
        <Route element={<RequireAuth allowedRoles={[2200, 2205]} />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='acervo-gestao' element={<AcervoProtegido />} >
            <Route path='' element={<h2>Selecione uma opção.</h2>} />
            <Route path='consulta' element={<Consulta />} />
            <Route path='cadastro' element={<Cadastro />} />
            <Route path='remover' element={<Remocao />} />
          </Route>
          <Route path='fichario' element={<Fichario />} />
          <Route path='fichario/cadastro-cliente' element={<FormCadastroCliente />} />
          <Route path='emprestimo' element={<Emprestimo />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[2205]} />}>
          <Route path='equipe' element={<Equipe />} />
          <Route path='equipe/cadastro-funcionario' element={<FormCadastroFuncionario />} />
          <Route path='financeiro' element={<Financeiro />} />
          <Route path='financeiro/importar' element={<ImportarNotaFiscal />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Rotas;
