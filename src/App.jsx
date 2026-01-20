import { useState, useEffect } from 'react'
import { Header, Footer } from './components'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getUserSession()
    .then((userData)=>{
      if(userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.log("Session check error:", error);
      dispatch(logout());
    })
    .finally(()=> setLoading(false))
  },[])
  
  return !loading ? (
    <ThemeProvider>
      <div className='min-h-screen flex flex-col text-[#111318] dark:text-[#f5f6fb] bg-light-base dark:bg-dark-base'>
        <Header />
        <main className='flex-grow w-full'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  ) : (
    <div className='h-screen w-screen flex items-center justify-center bg-white dark:bg-dark-950 fixed inset-0'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600'></div>
    </div>
  )
}

export default App
