import { createContext, useState } from 'react'

// On crée notre contexte dans un premier temps.
// Entre () les valeurs initiales
export const MatchContext = createContext()


export const MatchContextProvider = (props) => {
    const [matchs, setMatchs] = useState([])
    const [search, setSearch] = useState("")
    const [matchFavoris, setMatchFavoris] = useState([])


    const addToFav = (match) => {
        const itemInCart = matchFavoris.find(elem => elem.id === match.id)
    
        if (itemInCart) {
            setMatchFavoris(matchFavoris => matchFavoris.map(elem => elem.id === match.id ? { ...elem, quantity: elem.quantity + 1 } : elem))
        } else {
            setMatchFavoris(matchFavoris => [...matchFavoris, { ...match, quantity: 1 }])
        }
    }

    // SEARCHBAR LOGIC
    const handleSearch = () => {
        const newMatchs = matchs.filter(matchs => 
            matchs.title.toLowerCase().includes(search.toLowerCase()))

        setMatchs(newMatchs)
    }

    // GROUP VALUES TO SHARE
    const contextValues =
        {  
          handleSearch, search, setSearch, addToFav
        }

    return <MatchContext.Provider value={contextValues}>{props.children}</MatchContext.Provider>
}