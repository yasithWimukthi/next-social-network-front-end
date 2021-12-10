import renderHTML from 'react-render-html';
import moment from "moment";
import {Avatar} from "antd";
import PostImage from "../images/PostImage";
import {CommentOutlined, HeartOutlined} from "@ant-design/icons";

export const PostList = ({posts}) => {
    return (
        <>
            {
                posts && posts.map(post => (
                    <div key={post._id} className="card mb-5">
                        <div className="card-header">
                                <Avatar size={40}>
                                    {post.postedBy.name[0]}
                                </Avatar> {" "}
                                <span className="pt-2 ml-3" style={{marginLeft:'10px'}}>{post.postedBy.name}</span>
                                <span className="pt-2 ml-3" style={{marginLeft:'10px'}}>{moment(post.createdAt).fromNow()}</span>
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
                                <HeartOutlined className="text-danger pt-2 h5"/>
                                <div className="pt-2 pl-3" style={{marginRight:'10px', marginLeft: '5px'}}>
                                    3 likes
                                </div>
                                <CommentOutlined className="text-danger pt-2 h5"/>
                                <div className="pt-2 pl-3" style={{marginRight:'10px', marginLeft: '5px'}}>
                                    3 comments
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default PostList;