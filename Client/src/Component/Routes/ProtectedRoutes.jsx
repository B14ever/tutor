import { Outlet,Navigate} from 'react-router-dom'
import jwtDecode from "jwt-decode";
const ProtectedRoutes = () => {
  const user =  localStorage.getItem('TOKEN')
    if(user){
       return  <Outlet/>
    }
    else{
      return <Navigate to="/"/> 
    }
}

export default ProtectedRoutes
