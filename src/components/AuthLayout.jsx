import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


function AuthLayout({children, authentication = true}) {
  const navigate = useNavigate();
  const authService = useSelector((state)=> state.auth.status);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(authentication && authService !== authentication) navigate("/login");
    if(!authentication && authService !== authentication) navigate("/");
    setLoading(false);
  }, [authService, authentication, navigate]);
   return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout