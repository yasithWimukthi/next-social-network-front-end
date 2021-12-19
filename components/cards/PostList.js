import renderHTML from 'react-render-html';
import moment from "moment";
import {Avatar} from "antd";
import PostImage from "../images/PostImage";
import {CommentOutlined, DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {UserContext} from "../../context";
import {useRouter} from "next/router";
import Link from "next/link";
import {imageSource} from "../../functions";
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