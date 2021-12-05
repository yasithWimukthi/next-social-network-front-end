import {useState,Fragment} from "react";
import axios from "axios";
import {toast} from 'react-toastify';

const Register = () =>{

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [secret,setSecret] = useState("");
    const [ok,setOk] = useState(false);

    const handleSubmit = async e => {
      e.preventDefault()

        try {
            const {data} = await axios.post('http://localhost:8000/api/auth/register',{
                name,
                email,
                password,
                secret
            });

            setOk(data.ok);
        }
        catch (err) {
            toast.error(err.response.data);
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row py-5 bg-secondary text-light">
                    <div className="col text-center">
                        <h1>Register</h1>
                    </div>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Your Name</label>
                            </small>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                            />
                        </div>
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Email</label>
                            </small>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Password</label>
                            </small>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter Password"
                            />
                        </div>
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Pick a question</label>
                            </small>
                            <select className="form-control">
                                <option>What is your favourite color?</option>
                                <option>What is your best friend's name?</option>
                                <option>What city you were born?</option>
                            </select>

                            <small className="form-text text-muted">
                                You can use this to reset your password.
                            </small>

                            <div className="form-group p-2">
                                <input
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="Type your answer here"
                                />
                            </div>

                            <div className="form-group p-2">
                                <button className="btn btn-primary col-12">Submit</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Fragment>

    )
}

export default Register