import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import {useCallback, useContext, useState} from "react";
import {UserContext} from "../../context";
import {useRouter} from "next/router";

const Dashboard = () =>{

    const [state,setState] = useContext(UserContext);
    const [content,setContent] = useState("");

    const router = useRouter();

    const postSubmitHandler = useCallback(event => {
        event.preventDefault();

    },[content])

    return(
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-secondary text-light">
                    <div className="col text-center">
                        <h1>News Feeds</h1>
                    </div>
                </div>
            </div>

            <div className="row py-3">
                    <div className="col-md-8">
                        <CreatePostForm
                            content={content}
                            setContent={setContent}
                            postSubmitHandler={postSubmitHandler}
                        />
                    </div>
                    <div className="col-md-4">
                        
                    </div>
                </div>
        </UserRoute>
    )
}

export default Dashboard;