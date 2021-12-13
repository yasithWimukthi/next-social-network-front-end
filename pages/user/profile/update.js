import {UserContext} from "../../../context";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";
import AuthForm from "../../../components/forms/AuthForm";
import {Avatar, Modal} from "antd";
import Link from "next/link";
import {useCallback, useContext, useState, Fragment, useEffect} from "react";
import {CameraOutlined, LoadingOutlined} from "@ant-design/icons";


const ProfileUpdate = () => {

    const [username,setUsername] = useState("");
    const [about,setAbout] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [secret,setSecret] = useState("");
    const [ok,setOk] = useState(false);
    const [loading,setLoading] = useState(false);
    const [image,setImage] = useState({});
    const [uploading,setUploading] = useState(false);
    const [state,setState] = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
        if(state && state.user){
            setUsername(state.user.username);
            setAbout(state.user.about);
            setName(state.user.name);
            setEmail(state.user.email);
            setImage(state.user.image);
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
                secret,
                image
            });

            if(data.error) {
                toast.error(data.error);
                setLoading(false);
            }else{
                let auth = JSON.parse(localStorage.getItem('auth'));
                auth.user = data;
                localStorage.setItem('auth',JSON.stringify(auth));
                setState({...state,user:data});
                setOk(true);
                setLoading(false);
            }

        }
        catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    },[name,email,password,secret])

    const handleImage = async event => {
        const file = event.target.files[0];
        let formData = new FormData();
        formData.append("image",file);
        setUploading(true);
        try {
            const {data} = await axios.post('/post/upload-image',formData);
            // console.log('uploaded image '+data.url)
            setImage({
                url : data.url,
                public_key: data.public_key
            })
            setUploading(false);
        }catch (e) {
            console.log(e);
            setUploading(false);
        }
    }

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

                    <label className="d-flex justify-content-center h5">
                        {
                            image && image.url ? (
                                <Avatar size={30} src={image.url} className="mt-1"/>
                            ) : uploading ? (
                                <LoadingOutlined className="mt-2"/>
                            ) : (<CameraOutlined className="mt-2"/>)
                        }

                        <input onChange={handleImage} type="file" accept="images/*" hidden/>
                    </label>

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
                        <p>You have successfully updated your profile.</p>
                    </Modal>
                </div>
            </div>

        </Fragment>

    )
}

export default ProfileUpdate