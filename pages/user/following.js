import {List} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context";
import axios from "axios";
import {RollbackOutlined} from "@ant-design/icons";
import Link from "next/link";
import {toast} from "react-toastify";

const Following = () => {

    const [state,setState] = useContext(UserContext);
    const [people,setPeople] = useState([]);

    useEffect(()=>{
        if (state && state.token) fetchFollowing();
    },[state && state.token])

    const fetchFollowing = async () =>{
        try {
            const {data} = await axios.get('/auth/user-following');
            setPeople(data);
            console.log(data)
        }catch (e) {
            console.log(e);
        }
    }

    const handleUnfollow = async user => {
        try {
            const {data} = await axios.put('/auth/user-unfollow',{_id:user._id,})
            let auth = JSON.parse(localStorage.getItem('auth'));
            auth.user = data;
            localStorage.setItem('auth', JSON.stringify(auth));
            // update context
            setState({...state,user:data});
            //update people state
            let filtered = people.filter(person => person._id !== user._id);
            setPeople(filtered);
            toast.error(`Unfollowed ${user.name}`);
        }catch (e) {
            console.log(e);
        }
    }

    const imageSource = user => {
        if (user.image){
            return user.image.url;
        }else{
            return 'images/user.jpg';
        }
    }

    return (
        <div className="row col-md-6 offset-md-3">
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
                                    onClick={() => handleUnfollow(user)}
                                    className="text-primary"
                                    style={{cursor: 'pointer'}}
                                >
                                    Unfollow</span>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            <Link href='/user/dashboard'>
                <a className="d-flex justify-content-center pt-5">
                    <RollbackOutlined/>
                </a>
            </Link>
        </div>
    )
}

export default Following;