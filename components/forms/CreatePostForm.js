// import ReactQuill from 'react-quill';
import dynamic from "next/dynamic";
import {CameraOutlined, LoadingOutlined} from "@ant-design/icons";
import {Avatar} from "antd";

const ReactQuill = dynamic(()=> import('react-quill'),{ssr:false})

const CreatePostForm = ({
                            content,
                            setContent,
                            postSubmitHandler,
                            handleImage,
                            uploading,
                            image
                        }) => {
    return(
        <div className="card">
            <div className="card-body pb-1">
                <form className="form-group" onSubmit={postSubmitHandler}>
                    <ReactQuill
                        theme={'snow'}
                        value={content}
                        onChange={value => setContent(value)}
                        className="form-control"
                        placeholder="Write something..."/>
                </form>
            </div>
            <div className="card-footer d-flex justify-content-between text-muted">
                <button
                    disabled={!content}
                    onClick={postSubmitHandler}
                    className="btn btn-primary mt-1">
                    Post</button>

                <label>
                    {
                        image && image.url ? (
                            <Avatar size={30} src={image.url} className="mt-1"/>
                        ) : uploading ? (
                            <LoadingOutlined className="mt-2"/>
                        ) : (<CameraOutlined className="mt-2"/>)
                    }

                    <input onChange={handleImage} type="file" accept="images/*" hidden/>
                </label>
            </div>
        </div>
    )
}

export default CreatePostForm;