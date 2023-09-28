import { useContext } from 'react'
import { MatchContext } from './context/MatchContext';

function SearchBar() {
    const { handleSearch, setSearch, search } = useContext(MatchContext)

    return ( 
        <div className="searchBar">
            <input 
                className='border mr-2 p-2 rounded-lg w-60' 
                onChange={(e) => setSearch(e.target.value)} 
                type="text" 
                value={search} />
            <button 
                onClick={() => handleSearch()}>Search</button>
        </div>
     );
}

export default SearchBar;