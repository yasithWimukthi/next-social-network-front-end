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

export const PostList = ({posts, handleDelete, handleLike, handleUnlike, handleComment}) => {

    const [state] = useContext(UserContext);
    const router = useRouter();

    return (
        <>
            {
                posts && posts.map(post => (
                    <div key={post._id} className="card mb-5">
                        <div className="card-header">
                            <Avatar size={40}>
                                {post.postedBy.name[0]}
                            </Avatar> {" "}
                            <span className="pt-2 ml-3" style={{marginLeft: '10px'}}>{post.postedBy.name}</span>
                            <span className="pt-2 ml-3"
                                  style={{marginLeft: '10px'}}>{moment(post.createdAt).fromNow()}</span>
                        </div>
                        <div className="card-body">
                            {renderHTML(post.content)}
                        </div>
                        <div className="card-footer">
                            {
                                post.image && (
                                    <PostImage url={post.image.url}/>
                                )
                            }
                            <div className="d-flex pt-2">

                                {
                                    state && state.user && post.likes && post.likes.includes(state.user._id) ? (
                                        <HeartFilled
                                            onClick={() => handleUnlike(post._id)}
                                            className="text-danger pt-2 h5"
                                        />
                                    ) : (
                                        <HeartOutlined
                                            onClick={() => handleLike(post._id)}
                                            className="text-danger pt-2 h5"
                                        />
                                    )
                                }

                                <div className="pt-2 pl-3" style={{marginRight: '10px', marginLeft: '5px'}}>
                                    {post.likes.length} likes
                                </div>
                                <CommentOutlined
                                    onClick={() => handleComment(post)}
                                    className="text-danger pt-2 h5"
                                />
                                <div className="pt-2 pl-3" style={{marginRight: '10px', marginLeft: '5px'}}>
                                    <Link href={`/post/${post._id}`}>
                                        <a>{post.comments.length} comments</a>
                                    </Link>
                                </div>

                                {
                                    state && state.user && state.user._id === post.postedBy._id && (
                                        <>
                                            <EditOutlined
                                                onClick={() => router.push(`/user/posts/${post._id}`)}
                                                className="text-danger pt-2 h5 px-2 mx-auto"/>
                                            <DeleteOutlined onClick={() => handleDelete(post)}
                                                            className="text-danger pt-2 h5 px-2 "/>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                        {
                            post.comments && post.comments.length > 0 && (
                                <ol className="list-group">
                                    {
                                        post.comments.map(comment => (
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                    <div>
                                                        <Avatar
                                                            size={20}
                                                            className="mb-1 mr-3"
                                                            src={imageSource(comment.postedBy)}
                                                        />
                                                        {comment.postedBy.name}
                                                    </div>
                                                    <div>{comment.text}</div>
                                                </div>
                                                <span className="badge rounded-pill text-muted">
                                                    {moment(comment.created).fromNow()}
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ol>
                            )
                        }
                    </div>
                ))
            }
        </>
    )
}

export default PostList;