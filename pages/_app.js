import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from "../components/Navigation";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import {UserProvider} from "../context";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Head>
                {/*<link rel="stylesheet" href="css/style.css"/>*/}
                <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"/>
            </Head>
            <Navigation/>
            <ToastContainer position="top-center"/>
            <Component {...pageProps} />
        </UserProvider>

    )
}

export default MyApp