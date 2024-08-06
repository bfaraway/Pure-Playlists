import { useState } from "react";
import Btn from "./Btn";

const SearchBar = () => {
    const [search, setSearch] = useState("");

    const handeInputChange = (e: any) => {
        setSearch(e.target.value);
    }

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
        e.preventDefault();
    }

    return (
        <div className="flex items-center justify-center">
            <input className=" focus:outline-none focus:ring-1 focus:ring-black rounded-md p-2 mr-2 w-80" type="text" alt="Song title" value={search} onChange={handeInputChange}/>
            <Btn text="Song title" onClick={handleSearch} />
        </div>
    );
};

export default SearchBar;

