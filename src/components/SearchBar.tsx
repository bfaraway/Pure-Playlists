import { useState } from "react";

const SearchBar = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="flex items-center justify-center">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    );
};

export default SearchBar;