import {useState, useCallback, Fragment, useContext} from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {Modal} from 'antd';
import Link from "next/link";
import {UserContext} from "../context";
import {useRouter} from "next/router";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

const ForgotPassword = () =>{

    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [secret,setSecret] = useState("");
    const [ok,setOk] = useState(false);
    const [loading,setLoading] = useState(false);
    const [state] = useContext(UserContext);

    const router = useRouter();

    const handleSubmit =useCallback( async e => {
        e.preventDefault()
        setLoading(true);
        try {
            const {data} = await axios.post('/auth/forgot-password',{
                email,
                newPassword,
                secret
            });
            setEmail('');
            setNewPassword('');
            setSecret('');
            setOk(data.ok);
            setLoading(false);
        }
        catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    },[email,newPassword,secret])

    if(state && state.token) router.push('/')

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row py-5 bg-secondary text-light">
                    <div className="col text-center">
                        <h1>Forgot Password</h1>
                    </div>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <ForgotPasswordForm
                        handleSubmit={handleSubmit}
                        email={email}
                        newPassword={newPassword}
                        secret={secret}
                        loading={loading}
                        setEmail={setEmail}
                        setNewPassword={setNewPassword}
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
                        <p>Password was changed !</p>
                        <Link href="/login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>

        </Fragment>

    )
}

export default ForgotPassword