import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import {useCallback, useContext, useState} from "react";
import {UserContext} from "../../context";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";

const Dashboard = () =>{

    const [state,setState] = useContext(UserContext);
    const [content,setContent] = useState("");

    const router = useRouter();

    const postSubmitHandler = useCallback(async event => {
        event.preventDefault();
        try {
            const {data} = axios.post('/post/create-post',{content});
            if(data.error){
                console.log('error')
                toast.error(data.error);
            }else{
                console.log('succes')
                toast.success("post Created successfully")
                setContent("");
            }
        }catch (e) {
            console.log(e)
        }

    },[content])


    const handleImage = async event => {
        const file = event.target.files[0];
        let formData = new FormData();
        formData.append("image",file);
        try {
            const {data} = await axios.post('/post/upload-image',formData);
            console.log('uploaded image '+data.url)
        }catch (e) {
            console.log(e);
        }
    }

    return(
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-secondary text-light">
                    <div className="col text-center">
                        <h1>News Feeds</h1>
                    </div>
                </div>
            </div>

            <div className="row py-3">
                    <div className="col-md-8">
                        <CreatePostForm
                            content={content}
                            setContent={setContent}
                            postSubmitHandler={postSubmitHandler}
                            handleImage={handleImage}
                        />
                    </div>
                    <div className="col-md-4">
                        
                    </div>
                </div>
        </UserRoute>
    )
}

export default Dashboard;