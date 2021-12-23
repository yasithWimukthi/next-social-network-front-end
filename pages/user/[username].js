import {Card, List} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context";
import axios from "axios";
import {RollbackOutlined} from "@ant-design/icons";
import Link from "next/link";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import Meta from "antd/es/card/Meta";
import moment from "moment";

const Username = () => {

    const [state,setState] = useContext(UserContext);
    const [user,setUser] = useState({});
    const router = useRouter();

    useEffect(()=>{
        if (state && state.token) fetchUser();
    },[router.query.username])

    const fetchUser = async () =>{
        try {
            const {data} = await axios.get(`/auth/user/${router.query.username}`);
            setUser(data);
            console.log(data)
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
            <div className="pt-5 pb-5">
                <Card hoverable cover={<img src={imageSource(user)} alt={user.username}/>}>
                    <Meta title={user.name} description={user.about}/>
                    <p className="pt-2 text-muted">
                        Joined {moment(user.createdAt).fromNow()}
                    </p>
                    <div className="d-flex justify-content-between">
                        <span className="btn btn-sm">
                            {user.followers && user.followers.length} Followers
                        </span>

                        <span className="btn btn-sm">
                            {user.following && user.following.length} Following
                        </span>
                    </div>
                </Card>
                <Link href='/user/dashboard'>
                    <a className="d-flex justify-content-center pt-5">
                        <RollbackOutlined/>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Username;