import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from "../components/Navigation";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import {UserProvider} from "../context";

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            {/*<head>*/}
            {/*    <link rel="stylesheet" href="css/style.css"/>*/}
            {/*</head>*/}
            <Navigation/>
            <ToastContainer position="top-center"/>
            <Component {...pageProps} />
        </UserProvider>

    )
}

export default MyApp