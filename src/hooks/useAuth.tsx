import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// hook que permite pegar o token e o cargo do contexto
function useAuth() {
   return useContext(AuthContext);
}

export default useAuth;