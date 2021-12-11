import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import UserRoute from "../../../components/routes/UserRoute";
import CreatePostForm from "../../../components/forms/CreatePostForm";
import {toast} from "react-toastify";

const EditPost = () => {
    const [post,setPost] = useState([]);
    const [content,setContent] = useState("");
    const [image,setImage] = useState("");
    const [uploading,setUploading] = useState(false);
    const router = useRouter();
    const _id = router.query._id;

    useEffect(()=>{
        if(_id) fetchPost();
    },[_id])

    const postSubmitHandler = async e => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`/post/update-post/${_id}`,{content,image});
            if(data.error){
                toast.error(data.error);
            }else{
                toast.success('post updated');
                router.push('/user/dashboard');
            }
        }catch (e) {
            console.log(e);
        }
    }

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

    const fetchPost = async () => {
        try {
            const {data} = await axios.get(`/post/user-posts/${_id}`);
            setPost(data);
            setContent(data.content);
            setImage(data.image);
            console.log(data)
        }catch (e){
            console.log(e);
        }
    }

    return (
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-secondary text-light">
                    <div className="col text-center">
                        <h1>News Feeds</h1>
                    </div>
                </div>
            </div>

            <div className="row py-3">
                <div className="col-md-8 offset-md-2">
                    <CreatePostForm
                        content={content}
                        setContent={setContent}
                        postSubmitHandler={postSubmitHandler}
                        handleImage={handleImage}
                        uploading={uploading}
                        image={image}
                    />

                    <br/>

                </div>
            </div>
        </UserRoute>
    )
}

export default EditPost;