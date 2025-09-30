import Form from "next/form"
import SearchFromReset from "./SearchFromReset";
import {Search} from "lucide-react";

const SearchForm = ({query}: {query?: string }) => {

    return (
        <Form action="/" scroll={false} className="search-form">
            <input 
                name="query"
                defaultValue ={query}
                className="search-input"
                placeholder="Search Ideas "
            />

            <div className="flex gap-2">
                {query && <SearchFromReset />}
                
                <button type='submit' className="search-btn text-white">
                    <Search className="size-50"/>
                </button>

            </div>
        </Form>
    );
}

export default SearchForm;