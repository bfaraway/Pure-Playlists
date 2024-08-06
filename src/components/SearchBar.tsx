import { useState } from "react";
import Btn from "./Btn";

type SearchBarProps = {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    
    const [search, setSearch] = useState("");

    const handeInputChange = (e: any) => {
        setSearch(e.target.value);
    }

    const handleSearch = (e: any) => {
        onSearch(search);
        e.preventDefault();
    }

    return (
        <div className="w-full">
            <form className=" w-full flex items-center justify-center" onSubmit={handleSearch}>
                <input className=" w-full focus:outline-none focus:ring-1 focus:ring-black rounded-md p-2 mr-2" type="text" alt="Song title" value={search} onChange={handeInputChange}/>
                <Btn text="Search" type="submit" />
            </form>
        </div>
    );
};

export default SearchBar;

