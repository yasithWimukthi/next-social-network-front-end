import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {SyncOutlined} from "@ant-design/icons";
import {UserContext} from "../../context";


const UserRoute = ({children}) => {

    const [state] = useContext(UserContext);
    const [ok, setOk] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (state && state.token) getCurrentUser();
    }, [state && state.token]);

    const getCurrentUser = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get("/auth/current-user");
            if (data.ok) setOk(true)
            setLoading(false);
        } catch (e) {
            router.push('/login');
        }
    }

    process.browser && state === null && setTimeout(()=>{
        getCurrentUser()
    },1000)

    return (
        !ok ? <SyncOutlined
            spin
            className="d-flex justify-content-center display-1 text-primary p-5"
        /> : (
            <>
                {children}
            </>
        )
    )
}

export default UserRoute;