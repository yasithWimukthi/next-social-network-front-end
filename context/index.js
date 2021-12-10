import {useState, createContext, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [state,setState] = useState({
        user :{},
        token : ""
    });

    const router = useRouter();

    const token = state && state.token ? state.token : " ";
    axios.defaults.baseURL = "http://localhost:9001/api";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    useEffect(()=>{
        setState(JSON.parse(window.localStorage.getItem('auth')))
    },[])

    axios.interceptors.request.use(
        function (response){
            return response;
        },
        function(error){
            let res = error.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest){
                setState(null);
                window.localStorage.removeItem('auth');
                router.push('/login')
            }
        }
    )

    return (
        <UserContext.Provider value={[state,setState]}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider}