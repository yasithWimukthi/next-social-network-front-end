import {UserContext} from "../../../context";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";
import AuthForm from "../../../components/forms/AuthForm";
import {Modal} from "antd";
import Link from "next/link";
import {useCallback, useContext, useState, Fragment, useEffect} from "react";


const ProfileUpdate = () => {

    const [username,setUsername] = useState("");
    const [about,setAbout] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [secret,setSecret] = useState("");
    const [ok,setOk] = useState(false);
    const [loading,setLoading] = useState(false);
    const [state] = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
        if(state && state.user){
            setUsername(state.user.username);
            setAbout(state.user.about);
            setName(state.user.name);
            setEmail(state.user.email);
        }
    },[state && state.user])

    const handleSubmit = useCallback( async e => {
        e.preventDefault()
        setLoading(true);
        try {
            const {data} = await axios.post('/auth/update-profile',{
                username,
                about,
                name,
                email,
                password,
                secret
            });

            if(data.error) {
                toast.error(data.error);
                setLoading(false);
            }else{
                setOk(data.ok);
                setLoading(false);
            }

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
                        <h1>Profile</h1>
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
                        username={username}
                        setUsername={setUsername}
                        about={about}
                        setAbout={setAbout}
                        profileUpdate={true}
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

        </Fragment>

    )
}

export default ProfileUpdate