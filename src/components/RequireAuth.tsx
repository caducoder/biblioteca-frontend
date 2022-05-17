import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function RequireAuth({ allowedRoles }: {allowedRoles: Array<number>}) {
   const { auth }: any = useAuth()
   const location = useLocation();

   return ( 
      auth?.role?.find((role: number) => allowedRoles?.includes(role))
         ? <Outlet />
         : auth?.role 
            ? <Navigate to='/unauthorized' state={{from : location}} replace />
            : <Navigate to='/login' state={{from : location}} replace />
    );
}

export default RequireAuth;