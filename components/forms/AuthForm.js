import {SyncOutlined} from "@ant-design/icons";

const AuthForm = ({
                      handleSubmit,
                      name,
                      email,
                      password,
                      secret,
                      loading,
                      setPassword,
                      setEmail,
                      setSecret,
                      setName,
                      page,
                      username,
                      setUsername,
                      about,
                      setAbout,
                      profileUpdate
                  }) => {
    return (
        <form onSubmit={handleSubmit}>
            {profileUpdate && (
                <>
                    <div className="form-group p-2">
                        <small>
                            <label className="text-muted">Username</label>
                        </small>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                        />
                    </div>
                    <div className="form-group p-2">
                        <small>
                            <label className="text-muted">About</label>
                        </small>
                        <input
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Write about..."
                        />
                    </div>
                </>
            )}
            {page !== 'login' && (<div className="form-group p-2">
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
            </div>)}

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
                    disabled={profileUpdate}
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
            {page !== 'login' && (
                <>
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
                    </div>
                    <div className="form-group p-2">
                        <input
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Type your answer here"
                        />
                    </div>
                </>
            )}
            <div className="form-group p-2">
                <button
                    className="btn btn-primary col-12"
                    disabled={
                        profileUpdate
                        ? loading
                        :page === 'login' ?
                            !email || !password || loading :
                            !name || !email || !password || !secret || loading}
                >{loading ? <SyncOutlined spin className="py-1"/> : "Submit"}</button>
            </div>
        </form>
    )
}

export default AuthForm;