import './App.css';
import Header from './components/header/header';
import MissionsPage from './pages/missionsPage';
import { useAppDispatch } from './redux/store';
import Login from './components/auth/login/login';
import { useEffect } from 'react';
import { checkAuth } from './redux/reducers/userReducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
                <Route path='/' element={<MissionsPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
