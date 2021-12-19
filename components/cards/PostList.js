import {useContext} from "react";
import {UserContext} from "../../context";
import {useRouter} from "next/router";
import Post from "./Post";

export const PostList = ({posts, handleDelete, handleLike, handleUnlike, handleComment}) => {

    const [state] = useContext(UserContext);
    const router = useRouter();

    return (
        <>
            {
                posts && posts.map(post => (
                    <Post
                        post={post}
                        handleDelete={handleDelete}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                        handleComment={handleComment}
                    />
                ))
            }
        </>
    )
}

export default PostList;