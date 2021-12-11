import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context";
import {useRouter} from "next/router";

const Navigation = () => {

    const [current,setCurrent] = useState('');
    const [state, setSate] = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
    },[process.browser && window.location.pathname])

    const logout = () => {
        window.localStorage.removeItem('auth');
        setSate(null);
        router.push('/login')
    }

    return (
        <nav className="nav bg-dark d-flex justify-content-between">
            <Link href="/">
                <a className={`nav-link text-light ${current === '/' && 'active'}`}>Home</a>
            </Link>

            {state !== null ? (
                <>
                    <div className="dropdown">
                        <a className="btn  text-light dropdown-toggle" type="button" id="dropdownMenuButton1"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            {state && state.user && state.user.name}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <Link href="/user/dashboard">
                                    <a className={`nav-link dropdown-item  ${current === '/user/dashboard' && 'active'}`}>Dashboard</a>
                                </Link>
                            </li>
                            <li>
                                <a onClick={logout} className="nav-link ">Logout</a>
                            </li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <Link href="/login">
                        <a className={`nav-link text-light ${current === '/login' && 'active'}`}>Login</a>
                    </Link>

                    <Link href="/register">
                        <a className={`nav-link text-light ${current === '/register' && 'active'}`}>Register</a>
                    </Link>
                </>
            )}
        </nav>
    )
}

export default Navigation;