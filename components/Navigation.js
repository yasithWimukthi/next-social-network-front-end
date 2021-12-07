import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "../context";
import {useRouter} from "next/router";

const Navigation = () => {

    const [state, setSate] = useContext(UserContext);
    const router = useRouter();

    const logout = () => {
        window.localStorage.removeItem('auth');
        setSate(null);
        router.push('/login')
    }

    return (
        <nav className="nav bg-dark d-flex justify-content-between">
            <Link href="/">
                <a className="nav-link text-light">Home</a>
            </Link>

            {state !== null ? (
                <>
                    <Link href="/user/dashboard">
                        <a className="nav-link text-light">{state && state.user && state.user.name}</a>
                    </Link>
                    <a onClick={logout} className="nav-link text-light">Logout</a>
                </>
            ) : (
                <>
                    <Link href="/login">
                        <a className="nav-link text-light">Login</a>
                    </Link>

                    <Link href="/register">
                        <a className="nav-link text-light">Register</a>
                    </Link>
                </>
            )}
        </nav>
    )
}

export default Navigation;