
const PostImage = ({url}) => {
    return (
        <div
            style={{
                backgroundImage: `url(${url})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '300px'
            }}
        >
        </div>
    )
}

export default PostImage;