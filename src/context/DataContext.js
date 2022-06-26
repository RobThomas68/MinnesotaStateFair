import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [vendors, setVendors] = useState([]);
    const { data:drinkData, fetchError, isLoading } = useAxiosFetch('http://localhost:35000/drinks');
    const { data:vendorData, fetchError:fetchErrorVendors, isLoading:isLoadingVendors } = useAxiosFetch('http://localhost:35000/vendors');

    const [isOnlyAtFair, setIsOnlyAtFair] = useState(false);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        setDrinks(drinkData);
        setVendors(vendorData);
      }, [drinkData, vendorData])

    useEffect(() => {
        const filteredResults = drinks.filter((drink) =>
            (
                (drink.drinkName).toLowerCase().includes(search.toLowerCase()) &&
                drink.isOnlyAtFair === isOnlyAtFair &&
                drink.isNew === isNew
            )
        );
        setSearchResults(filteredResults.sort((lhs,rhs)=>lhs.drinkName.localeCompare(rhs.drinkName)));
    }, [drinks, search, isOnlyAtFair, isNew])

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults,

            drinks, setDrinks,
            isOnlyAtFair, setIsOnlyAtFair,
            isNew, setIsNew,
            fetchError, isLoading,

            vendors, setVendors
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
