import {List} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {imageSource} from "../../functions";
import {useContext} from "react";
import {UserContext} from "../../context";
import Link from "next/link";

const People = ({people,handleFollow,handleUnfollow}) => {

    const [state] = useContext(UserContext);

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={people}
                renderItem={user => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={imageSource(user)} />}
                            title={
                                <div className="d-flex justify-content-between">
                                    <Link href={`/user/${user.username}`}>
                                        <a>{user.username} {" "}</a>
                                    </Link>

                                    {
                                        state &&
                                        state.user &&
                                        user.followers &&
                                        user.followers.includes(state.user._id) ? (
                                            <span
                                                onClick={() => handleUnfollow(user)}
                                                className="text-primary"
                                                style={{cursor: 'pointer'}}
                                            >
                                            Unfollow</span>
                                        ) : (
                                            <span
                                                onClick={() => handleFollow(user)}
                                                className="text-primary"
                                                style={{cursor: 'pointer'}}
                                            >
                                            Follow</span>
                                        )
                                    }
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </>
    )
}

export default People;