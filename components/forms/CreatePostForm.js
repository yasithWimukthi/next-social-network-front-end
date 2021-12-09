
const CreatePostForm = ({
                            content,
                            setContent,
                            postSubmitHandler
                        }) => {
    return(
        <div className="card">
            <div className="card-body pb-1">
                <form className="form-group" onSubmit={postSubmitHandler}>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="form-control"
                        placeholder="Write something...">

                    </textarea>
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