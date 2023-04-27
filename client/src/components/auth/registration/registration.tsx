import { FormEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { login } from "../../../redux/reducers/userReducer";
import { useAppDispatch } from "../../../redux/store";
import './registration.scss';


const Registration = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {isLoggedIn} = useSelector((store: any) => store.user)

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/missions")
        }
    })

    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [passwordError, setPasswordError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [userNameError, setUserNameError] = useState<string>('');

    

    const sendRegisterRequest = async () => {
        const data = {
            name: userName,
            email,
            password
        };
        const request = (await axiosInstance.post('auth/register', data)).data
        if (request == "username already exists") {
            setUserNameError("Такой логин уже занят.");
        }
        if (request == "email already exists") {
            setEmailError("Эта почта уже занята.");
        }

        if (request) {
            dispatch(login(userName, password));
        }
    }

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let fieldsValidated = true;

        if (password !== repeatPassword && password.length > 5) {
            fieldsValidated = false;
            setPasswordError("Пароли не совпадают.")
        } else if (password.length < 6) {
            fieldsValidated = false;
            setPasswordError("Минимальная длина пароля - 6 символов.")
        } else {
            setPasswordError('')
        }


        if (userName.length < 3) {
            fieldsValidated = false;
            setUserNameError("Минимальная длина логина - 3 символа.")
        } else {
            setUserNameError('')
        }

        if (!email.includes("@")) {
            fieldsValidated = false;
            setEmailError("Некорректный email адрес")
        } else {
            setEmailError('')
        }

        if (fieldsValidated) {
            sendRegisterRequest() 
        }
    }

    return (
        <>
        <form className="auth__form" action="#" onSubmit={(e) => handleLoginSubmit(e)}>
            <h1>Регистрация</h1>
            <div>
                {userNameError && <p className="auth__form-error">{userNameError}</p>}
                <input className="auth__form-input auth__login-input--validated" type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Логин"/>
            </div>
            <div>
                {passwordError && <p className="auth__form-error">{passwordError}</p>}
                <input className="auth__form-input" type="password"onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
            </div>
            <div>
                <input className="auth__form-input" type="password"onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Повторите пароль" />
            </div>
            <div>
                {emailError && <p className="auth__form-error">{emailError}</p>}
                <input className="auth__form-input" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            </div>
            <div>
                <input className="auth__form-submit" type="submit" value="Зарегистрироваться"/>
            </div>
            <p className="auth__form-error"></p>
        </form>
        </>
    )
}

export default Registration