import './App.css';
import Header from './components/header/header';
import MissionsPage from './pages/missionsPage/missionsPage';
import { useAppDispatch } from './redux/store';
import { useEffect } from 'react';
import { checkAuth } from './redux/reducers/userReducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login/login';
import Registration from './components/auth/registration/registration';
import StatsPage from './pages/statsPage/statsPage';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
      dispatch(checkAuth())
  }, [])
  return (
    <>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={''}/>
                <Route path='/auth' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/missions' element={<MissionsPage/>}/>
                <Route path='/stats' element={<StatsPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
