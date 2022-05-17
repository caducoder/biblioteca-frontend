import { createContext, useState } from "react";

// contexto que permite que o token possa ser acessado de qualquer lugar da aplicação
const AuthContext = createContext({})

// função que fornece o contexto de autenticação
export const AuthProvider = ({ children }: {children: JSX.Element}) => {
   const [auth, setAuth] = useState({});

   return (
      <AuthContext.Provider value={{auth, setAuth}}>
         {/* o componente que for colocado dentro do AuthProvider, vai ter acesso ao token e a role */}
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext;