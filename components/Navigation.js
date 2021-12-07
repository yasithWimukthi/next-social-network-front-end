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
                    <Link href="/user/dashboard">
                        <a className={`nav-link text-light ${current === '/user/dashboard' && 'active'}`}>{state && state.user && state.user.name}</a>
                    </Link>
                    <a onClick={logout} className="nav-link text-light">Logout</a>
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