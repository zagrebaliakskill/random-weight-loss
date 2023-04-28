import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './login.scss';
import { login } from "../../../redux/reducers/userReducer";
import { useAppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {isLoggedIn, isAuthLoading} = useSelector((store: any) => store.user)

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/missions')
        }
    }, [isLoggedIn])

    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(userName, password));
    }

    

    const authErrorMsg  = useSelector((state: any) => state.user.authErrorMsg)
    return (
        <>
        <form className="auth__form" action="#" onSubmit={(e) => handleLoginSubmit(e)}>
            <h1>Вход</h1>
            <input className="auth__form-input" type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Логин"/>
            <input className="auth__form-input" type="password"onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
            <input className="auth__form-submit" type="submit"/>
            {authErrorMsg && <p className="auth__form-error">{authErrorMsg}</p>}
            {isAuthLoading && 
                <div className="auth__form-loader">
                <span className="auth__form-loader-spinner"></span>
                </div>
            }
        </form>
        </>
    )
}

export default Login