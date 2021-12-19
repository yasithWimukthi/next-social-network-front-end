import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Post from "../../components/cards/Post";

const PostComment = () => {
    const [post,setPost] = useState({});
    const router = useRouter();
    const _id = router.query._id;

    useEffect(() => {
        if(_id) fetchPost();
    },[_id]);

    const fetchPost = async () => {
        try {
            const {data} = await axios.get(`/post/user-posts/${_id}`);
            setPost(data);
        }catch (e) {
            console.log(e);
        }
    }

    const removeComment = async (postId,comment) =>{
        try {
            const {data} = await axios.put('/post/remove-comment',{postId,comment});
            fetchPost();
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="row col-md-8 offset-md-2">
            <Post post={post} removeComment={removeComment}/>
        </div>

    )
}

export default PostComment;