import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import {useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "../../context";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";
import PostList from "../../components/cards/PostList";

const Dashboard = () =>{

    const [state] = useContext(UserContext);
    const [content,setContent] = useState("");
    const [image,setImage] = useState("");
    const [uploading,setUploading] = useState(false);
    const [posts, setPosts] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (state && state.token) fetchUserPosts();
    },[state && state.token])

    const fetchUserPosts = async () => {
        try {
            const {data} = await axios.get('/post/user-posts');
            setPosts(data);
            console.log(data)
        }catch (e) {
            console.log(e);
        }
    }

    const postSubmitHandler = useCallback(async event => {
        event.preventDefault();
        try {
            const {data} = await axios.post('/post/create-post',{content,image});
            if(data.error){
                console.log('error')
                toast.error(data.error);
            }else{
                toast.success("post Created successfully")
                fetchUserPosts();
                setContent("");
                setImage({});
            }
        }catch (e) {
            console.log(e)
        }

    },[content])


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

    const handleDelete = async post => {
        try {
            const answer = window.confirm('Are you sure you want to delete ?');
            if (!answer) return;
            const {data} = await axios.delete(`/post/delete-post/${post._id}`);
            toast.error('Post deleted successfully');
            fetchUserPosts();
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
                            uploading={uploading}
                            image={image}
                        />

                        <br/>

                        <PostList posts={posts} handleDelete={handleDelete}/>
                    </div>


                    <div className="col-md-4">
                        
                    </div>
                </div>
        </UserRoute>
    )
}

export default Dashboard;