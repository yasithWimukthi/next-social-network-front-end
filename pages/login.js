import {useState,useCallback,Fragment} from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import {useRouter} from "next/router";

const Login = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit =useCallback( async e => {
        e.preventDefault()
        setLoading(true);
        try {
            const {data} = await axios.post('http://localhost:8000/api/auth/login',{
                email,
                password,
            });
            setEmail('');
            setPassword('');
            setLoading(false);
            router.push('/');
        }

        catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    },[email,password])

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

        </Fragment>

    )
}

export default Login