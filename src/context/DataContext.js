import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [drinkVendors, setDrinkVendors] = useState([]);
    const { data:drink_data, fetchError, isLoading } = useAxiosFetch('http://localhost:35000/drinks');
    const { data:drink_vendor_data, fetchError:fetchError_vendors, isLoading:isLoading_vendors } = useAxiosFetch('http://localhost:35000/drink_vendors');

    const [isOnlyAtFair, setIsOnlyAtFair] = useState(false);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        setDrinks(drink_data);
        setDrinkVendors(drink_vendor_data);
      }, [drink_data, drink_vendor_data])

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

            drinkVendors, setDrinkVendors
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
