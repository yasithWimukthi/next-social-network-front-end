import {SyncOutlined} from "@ant-design/icons";

const ForgotPasswordForm = ({
                                handleSubmit,
                                email,
                                newPassword,
                                secret,
                                loading,
                                setNewPassword,
                                setEmail,
                                setSecret,
                            }) => {
    return (
        <form onSubmit={handleSubmit}>
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
                    <label className="text-muted">New Password</label>
                </small>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter New  Password"
                />
            </div>
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
            <div className="form-group p-2">
                <button
                    className="btn btn-primary col-12"
                    disabled={!email || !newPassword || !secret || loading}
                >{loading ? <SyncOutlined spin className="py-1"/> : "Submit"}</button>
            </div>
        </form>
    )
}

export default ForgotPasswordForm;