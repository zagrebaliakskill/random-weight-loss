import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../../../redux/reducers/userReducer";
import { useAppDispatch } from "../../../redux/store";

const Login = () => {
    const dispatch = useAppDispatch()

    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(userName, password));
    }
    return (
        <>
        <form action="#" onSubmit={(e) => handleLoginSubmit(e)}>
            <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Login"/>
            <input type="password"onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="submit"/>
        </form>
        </>
    )
}

export default Login