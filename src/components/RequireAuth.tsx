import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

/* 
   função que verifica se o usuário esta logado, e verifica tbm o cargo para decidir se 
   permite acesso as páginas (equipe e financeiro) ou não.
*/
function RequireAuth({ allowedRoles }: { allowedRoles: Array<number> }) {
   const { auth }: any = useAuth()
   const location = useLocation();

   return (
      //<Outlet />
      auth?.role?.find((role: number) => allowedRoles?.includes(role))
         ? <Outlet />
         : auth?.role
            ? <Navigate to='/unauthorized' state={{ from: location }} replace />
            : <Navigate to='/login' state={{ from: location }} replace />
   );
}

export default RequireAuth;