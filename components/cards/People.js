import {List} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {imageSource} from "../../functions";

const People = ({people,handleFollow}) => {

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
                                    {user.username} <span
                                    onClick={() => handleFollow(user)}
                                    className="text-primary"
                                    style={{cursor: 'pointer'}}
                                >
                                    Follow</span>
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