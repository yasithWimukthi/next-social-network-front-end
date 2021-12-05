import {useState,useCallback,Fragment} from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {Modal} from 'antd';
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";

const Register = () =>{

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [secret,setSecret] = useState("");
    const [ok,setOk] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleSubmit =useCallback( async e => {
        e.preventDefault()
        setLoading(true);
        try {
            const {data} = await axios.post('http://localhost:8000/api/auth/register',{
                name,
                email,
                password,
                secret
            });
            setName('');
            setEmail('');
            setPassword('');
            setSecret('');
            setOk(data.ok);
            setLoading(false);
        }
        catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    },[name,email,password,secret])

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row py-5 bg-secondary text-light">
                    <div className="col text-center">
                        <h1>Register</h1>
                    </div>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm
                        handleSubmit={handleSubmit}
                        name={name}
                        email={email}
                        password={password}
                        secret={secret}
                        loading={loading}
                        setName={setName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setSecret={setSecret}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal
                        title="Congratulations!"
                        visible={ok}
                        onCancel={()=>setOk(false)}
                        footer={null}
                    >
                        <p>You have successfully registered.</p>
                        <Link href="/login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Already registered ? {" "}
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </p>
                </div>
            </div>

        </Fragment>

    )
}

export default Register