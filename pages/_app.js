import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from "../components/Navigation";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Navigation/>
            <ToastContainer position="top-center"/>
            <Component {...pageProps} />
        </>

    )
}

export default MyApp