import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import "./App.css";
import authServices from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setloading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("start")
    authServices.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => console.error(error))
    .finally(() => setloading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          TODOO <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
