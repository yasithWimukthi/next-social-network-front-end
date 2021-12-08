import {useState, useCallback, Fragment, useContext} from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import {useRouter} from "next/router";
import {UserContext} from "../context";

const Login = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const [state,setState] = useContext(UserContext);

    const router = useRouter();

    const handleSubmit =useCallback( async e => {
        e.preventDefault()
        setLoading(true);
        try {
            const {data} = await axios.post('/auth/login',{
                email,
                password,
            });

            if(data.error) {
                toast.error(data.error);
                setLoading(false);
            }else{
                setEmail('');
                setPassword('');
                setLoading(false);
    
                setState({
                    user : data.user,
                    token : data.token
                })
    
                window.localStorage.setItem('auth',JSON.stringify(data));
                router.push('/');
            }
        }

        catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    },[email,password])

    if(state && state.token) router.push('/')

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row py-5 bg-secondary text-light">
                    <div className="col text-center">
                        <h1>Login</h1>
                    </div>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm
                        handleSubmit={handleSubmit}
                        email={email}
                        password={password}
                        loading={loading}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        page="login"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Not yet registered ? {" "}
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        <Link href="/forgot-password">
                            <a className="text-danger">Forgot Password</a>
                        </Link>
                    </p>
                </div>
            </div>

        </Fragment>

    )
}

export default Login