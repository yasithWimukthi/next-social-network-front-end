import {List} from "antd";

const People = ({people}) => {
    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={people}
                renderItem={user => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <div className="d-flex justify-content-between">
                                    {user.username} <span className="text-primary">Follow</span>
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