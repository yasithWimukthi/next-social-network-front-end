import {useContext, useState} from "react";
import {UserContext} from "../context";
import axios from "axios";
import People from "./cards/People";

const Search = () => {
    const [state] = useContext(UserContext);
    const [query,setQuery] = useState("");
    const [result,setResult] = useState([]);

    const searchUser = async e => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`/auth/search-user/${query}`);
            setResult(data);
        }catch (e) {
            console.log(e);
        }
    }

    return(
        <>
            <form className="form-inline row" onSubmit={searchUser}>
                <div className="col-8">
                    <input
                        onChange={e => {
                            setQuery(e.target.value);
                            setResult([])
                        }}
                        value={query}
                        className="form-control"
                        type="search"
                        placeholder="Search"
                    />
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-outline-primary col-12"
                        type="submit"
                    >
                        Search
                    </button>
                </div>
            </form>
            {
                result && result.map(r => <People key={r._id} people={result}/>)
            }
        </>

    )
}

export default Search;