// import ReactQuill from 'react-quill';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(()=> import('react-quill'),{ssr:false})

const CreatePostForm = ({
                            content,
                            setContent,
                            postSubmitHandler
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
            <div className="card-footer">
                <button
                    disabled={!content}
                    onClick={postSubmitHandler}
                    className="btn btn-primary mt-1">
                    Post</button>
            </div>
        </div>
    )
}

export default CreatePostForm;